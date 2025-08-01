import whisper
from config import WHISPER_MODEL

model = whisper.load_model(WHISPER_MODEL)

def transcribe_audio(audio_path: str, model_name='base'):
    result = model.transcribe(audio_path)
    return result['text']
