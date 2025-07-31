from rabbitmq import RabbitMQ
import io
import os
import sys
import json
import uuid
import base64
import whisper
import difflib
import nltk
# from nltk.tokenize import word_tokenize
from pydub import AudioSegment
# from fuzzywuzzy import fuzz

# 📌 Configurações
WHISPER_MODEL = "base"
TEMP_DIR = "./temp_audio"

BASE_URL = "http://192.168.3.4:3000/api/v1"
BASIC_AUTH = ("chatbotrasa","minhasenha1234")


model = whisper.load_model(WHISPER_MODEL)
os.makedirs(TEMP_DIR, exist_ok=True)

def convert_mp3_to_wav(mp3_path: str, ):
    try:
        wav_path = mp3_path.replace(".mp3", ".wav")
        audio = AudioSegment.from_mp3(mp3_path)
        audio.export(wav_path, format="wav")
        return wav_path
    except Exception as e:
        print("❌ ERROR convert_mp3_to_wav", str(e))

def save_base64_to_mp3(base64_str, filename):
    try:
        mp3_path = os.path.join(TEMP_DIR, filename + ".mp3")
        with open(mp3_path, "wb") as f:
            f.write(base64.b64decode(base64_str))
        return mp3_path
    except Exception as e:
        print("❌ ERROR save_base64_to_mp3", str(e))

def transcribe_audio(audio_path: str, model_name='base'):
    result = model.transcribe(audio_path)
    return result['text']

def difflib_similarity(reference: str, transcription: str):
    ratio = difflib.SequenceMatcher(None, reference.lower(), transcription.lower()).ratio()
    return ratio * 100  # percentage

#metrica de similaridade com fuzzywuzzy
# def fuzzy_similarity(ref, trans):
#     return fuzz.ratio(ref, trans)

# transformers (com embeddings semânticos)
# requer mais memoria e internet
# from sentence_transformers import SentenceTransformer, util

# def semantic_similarity(ref, trans):
#     model = SentenceTransformer('all-MiniLM-L6-v2')
#     emb1 = model.encode(ref, convert_to_tensor=True)
#     emb2 = model.encode(trans, convert_to_tensor=True)
#     score = util.pytorch_cos_sim(emb1, emb2)
#     return float(score) * 100

# def converter_para_wav(arquivo_audio):
#     if not arquivo_audio.endswith(".wav"):
#         audio = AudioSegment.from_file(arquivo_audio)
#         novo_arquivo = arquivo_audio.split(".")[0] + ".wav"
#         audio.export(novo_arquivo, format="wav")
#         return novo_arquivo
#     return arquivo_audio

def delete_audio(audio_path):
    try:
        if os.path.exists(audio_path):
            os.remove(audio_path)
            print("=> The file DELETED with SUCCESS")
        else:
            print("=> The file does not exist")
    except Exception as e:
        print("❌ ERROR delete_audio", str(e))

# transcricao e analise do audio
def send_similarity_callback(user_id, pedido_id, similarity, transcription):
    payload = {
        "userId": user_id,
        "orderId": pedido_id,
        "similarity": round(similarity, 2),
        "transcription": transcription
    }
    try:
        url = BASE_URL+'/messages/analysis-audio/callback'
        response = requests.post(url, data=payload, auth = BASIC_AUTH)
        response.raise_for_status()
        print(f"✅ Enviado callback: {payload}")
    except Exception as e:
        print(f"❌ Erro no callback: {e}")

def similarity_callback(ch, method, properties, body):
    data = json.loads(body)
    print(f"🟢 Received message: {data}")
    try:
        audio_name = data["name"]
        audio_b64 = data["file"]
        texto_base = data["baseText"]
        user_id = data["userId"]
        pedido_id = data["orderId"]

        unique_id = str(uuid.uuid4())
        mp3_path = save_base64_to_mp3(audio_b64, unique_id)
        wav_path = convert_mp3_to_wav(mp3_path)

        transcription = transcribe_audio(wav_path)
        similarity = difflib_similarity(texto_base, transcription)
        print(f"🟢 response: {transcription} \nsimilarity: {similarity}%")

        send_similarity_callback(user_id, pedido_id, similarity, transcription)

        delete_audio(mp3_path)
        delete_audio(wav_path)      

    except Exception as e:
        print(f"❌ Erro ao processar mensagem: {e}")

# transcricao do audio
def send_transcribe_audio_callback(user_id, message_id, transcription):
    payload = {
        "userId": user_id,
        "orderId": pedido_id,
        "transcription": transcription
    }
    try:
        url = BASE_URL
        response = requests.post(url, data=payload, auth = BASIC_AUTH)
        response.raise_for_status()
        print(f"✅ Enviado callback: {payload}")
    except Exception as e:
        print(f"❌ Erro no callback: {e}")

def transcribe_audio_callback(ch, method, properties, body):
     data = json.loads(body)
    print(f"🟢 Received message: {data}")
    try:
        audio_name = data["name"]
        audio_b64 = data["file"]
        user_id = data["userId"]
        message_id = data["messageId"]

        unique_id = str(uuid.uuid4())
        mp3_path = save_base64_to_mp3(audio_b64, unique_id)
        wav_path = convert_mp3_to_wav(mp3_path)

        transcription = transcribe_audio(wav_path)
        
        print(f"🟢 response: {transcription}")

        send_similarity_callback(user_id, message_id, transcription)

        delete_audio(mp3_path)
        delete_audio(wav_path)      

    except Exception as e:
        print(f"❌ Erro ao processar mensagem: {e}")

def main():
    rabbitmq = RabbitMQ()
    try:
        print("🟢 Connection to RabbitMQ established successfully.")
        rabbitmq.consume(queue_name='calculate_similarity_queue', callback=similarity_callback)
        rabbitmq.consume(queue_name='transcribe_audio_queue', callback=transcribe_audio_callback)
    except Exception as e:
        print(f"🔴 Failed to establish connection to RabbitMQ: {e}")
        sys.exit(1)
    finally:
        rabbitmq.close()

if __name__ == "__main__":
    main()