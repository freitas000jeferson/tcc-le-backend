import os
import base64
import magic
from pydub import AudioSegment
from config import TEMP_DIR


def convert_to_wav(input_path: str) -> str:
    try:
        ext = os.path.splitext(input_path)[1].lower()
        # Mapeia extensões conhecidas
        format_map = {
            '.aac': 'aac',
            '.mp3': 'mp3',
            '.m4a': 'm4a',
            '.wav': 'wav',
        }
        if ext not in format_map:
            raise ValueError(f"❌ Formato de áudio '{ext}' não suportado para conversão.")

        audio_format = format_map.get(ext)

        base = os.path.splitext(input_path)[0]
        wav_path = f"{base}.wav"

        audio = AudioSegment.from_file(input_path, format=audio_format)
        audio.export(wav_path, format="wav")

        return wav_path
    
    except Exception as e:
        print(f"❌ ERROR convert_to_wav {input_path}: {str(e)}")
        raise

def save_base64(base64_str, filename):
    try:
        file_bytes = base64.b64decode(base64_str)
        mime = magic.from_buffer(file_bytes, mime=True)

        mime_map = {
            "audio/mpeg": ".mp3",
            "audio/x-hx-aac-adts": ".aac",
            "audio/aac": ".aac",
            "audio/mp4": ".m4a",
            "audio/wav": ".wav",
            "audio/x-wav": ".wav",
        }
        ext = mime_map.get(mime)
        if not ext:
            raise ValueError(f"Tipo MIME não suportado: {mime}")
        
        filename_with_ext = f"{filename}{ext}"
        output_path = os.path.join(TEMP_DIR, filename_with_ext )

        with open(output_path, "wb") as f:
            f.write(file_bytes)
        return output_path
    except Exception as e:
        print(f"❌ ERROR save_base64 {filename}: {str(e)}")
        raise

def delete_audio(audio_path):
    try:
        if os.path.exists(audio_path):
            os.remove(audio_path)
            print("=> The file DELETED with SUCCESS")
        else:
            print("=> The file does not exist")
    except Exception as e:
        print("❌ ERROR delete_audio", str(e))

