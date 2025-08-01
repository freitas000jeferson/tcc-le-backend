
import requests
from config import BASE_URL, BASIC_AUTH

# transcricao e analise do audio
def send_similarity_callback(user_id, order_id, similarity, transcription):
    payload = {
        "userId": user_id,
        "orderId": order_id,
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

# transcricao do audio
def send_transcribe_audio_callback(user_id, order_id, transcription):
    payload = {
        "userId": user_id,
        "orderId": order_id,
        "transcription": transcription
    }
    try:
        url = BASE_URL + '/messages/transcribe-audio/callback'
        response = requests.post(url, data=payload, auth = BASIC_AUTH)
        response.raise_for_status()
        print(f"✅ Enviado callback: {payload}")
    except Exception as e:
        print(f"❌ Erro no callback: {e}")
