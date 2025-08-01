import os

# 📌 Configurações

WHISPER_MODEL = "base"
TEMP_DIR = "./temp_audio"
BASE_URL = "http://192.168.3.4:3000/api/v1"
BASIC_AUTH = ("chatbotrasa", "minhasenha1234")

os.makedirs(TEMP_DIR, exist_ok=True)