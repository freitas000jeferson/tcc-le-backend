import threading
import sys
from services.rabbitmq import RabbitMQ
from consumer.audio_consumer import similarity_consumer, transcribe_audio_consumer

# def convert_mp3_to_wav(mp3_path: str):
#     try:
#         wav_path = mp3_path.replace(".mp3", ".wav")
#         audio = AudioSegment.from_mp3(mp3_path)
#         audio.export(wav_path, format="wav")
#         return wav_path
#     except Exception as e:
#         print("❌ ERROR convert_mp3_to_wav", str(e))
#         raise

# def save_base64_to_mp3(base64_str, filename):
#     try:
#         mp3_path = os.path.join(TEMP_DIR, filename + ".mp3")
#         with open(mp3_path, "wb") as f:
#             f.write(base64.b64decode(base64_str))
#         return mp3_path
#     except Exception as e:
#         print("❌ ERROR save_base64_to_mp3", str(e))

# def converter_para_wav(arquivo_audio):
#     if not arquivo_audio.endswith(".wav"):
#         audio = AudioSegment.from_file(arquivo_audio)
#         novo_arquivo = arquivo_audio.split(".")[0] + ".wav"
#         audio.export(novo_arquivo, format="wav")
#         return novo_arquivo
#     return arquivo_audio


def main():
    rabbitmq = RabbitMQ()
    try:
        print("🟢 Connection to RabbitMQ established successfully.")
        similarity_thread = threading.Thread(
            target=rabbitmq.consume,
            args=('calculate_similarity_queue', similarity_consumer),
            daemon=True  # Daemon para encerrar com o processo principal
        )
        transcribe_thread = threading.Thread(
            target=rabbitmq.consume,
            args=('transcribe_audio_queue', transcribe_audio_consumer),
            daemon=True  # Daemon para encerrar com o processo principal
        )
        # rabbitmq.consume(queue_name='calculate_similarity_queue', callback=similarity_callback)
        # rabbitmq.consume(queue_name='transcribe_audio_queue', callback=transcribe_audio_callback)
        # Inicia as threads
        similarity_thread.start()
        transcribe_thread.start()

        # Mantém o programa principal rodando para que as threads funcionem
        print("🟡 Aguardando mensagens... Pressione Ctrl+C para sair.")
        similarity_thread.join()
        transcribe_thread.join()

    except KeyboardInterrupt:
        print("\n🔴 Interrompido pelo usuário.")
    except Exception as e:
        print(f"🔴 Failed to establish connection to RabbitMQ: {e}")
        sys.exit(1)
    finally:
        rabbitmq.close()

if __name__ == "__main__":
    main()