
import json
import uuid
from services.audio_utils import save_base64, convert_to_wav, delete_audio
from services.whisper_service import transcribe_audio
from services.similarity_metrics import difflib_similarity
from callback.services_callback import send_similarity_callback, send_transcribe_audio_callback

def similarity_consumer(ch, method, properties, body):
    data = json.loads(body)
    print(f"🟢 Received message: {data}")
    try:
        audio_name = data["name"]
        audio_b64 = data["file"]
        texto_base = data["baseText"]
        user_id = data["userId"]
        order_id = data["orderId"]

        unique_id = str(uuid.uuid4())
        audio_path = save_base64(audio_b64, unique_id)
        wav_path = convert_to_wav(audio_path)

        transcription = transcribe_audio(wav_path)
        similarity = difflib_similarity(texto_base, transcription)
        print(f"🟢 response: {transcription} \nsimilarity: {similarity}%")

        send_similarity_callback(user_id, order_id, similarity, transcription)

        delete_audio(audio_path)
        delete_audio(wav_path)      

    except Exception as e:
        print(f"❌ Erro ao processar mensagem: {e}")


def transcribe_audio_consumer(ch, method, properties, body):
    data = json.loads(body)
    print(f"🟢 Received message: {data}")
    try:
        audio_name = data["name"]
        audio_b64 = data["file"]
        user_id = data["userId"]
        message_id = data["messageId"]

        unique_id = str(uuid.uuid4())
        audio_path = save_base64(audio_b64, unique_id)
        wav_path = convert_to_wav(audio_path)

        transcription = transcribe_audio(wav_path)
        
        print(f"🟢 response: {transcription}")

        send_transcribe_audio_callback(user_id, message_id, transcription)

        delete_audio(audio_path)
        delete_audio(wav_path)      

    except Exception as e:
        print(f"❌ Erro ao processar mensagem: {e}")
