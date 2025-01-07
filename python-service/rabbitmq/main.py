from rabbitmq import RabbitMQ
import sys
import json
import base64
import whisper
import io
import os

model = whisper.load_model("base")

def callback(ch, method, properties, body):
    data = json.loads(body)
    print(f"Received message: {data['name']}")
    try:
        audio_name = data["name"]
        # transcribe(file_buffer)
        with open(audio_name,"wb") as f:
            f.write(base64.b64decode(data['file']))
        with open(audio_name,"rb") as audio_file:
            result = model.transcribe(audio_name, fp16=False)
            print("resp:", result["text"])
        
        if os.path.exists(audio_name):
            os.remove(audio_name)
            print("The file deleted with SUCCESS")
        else:
            print("The file does not exist")
    except Exception as e:
        print(str(e))

def main():
    rabbitmq = RabbitMQ()
    try:
        print("Connection to RabbitMQ established successfully.")
        rabbitmq.consume(queue_name='test_queue', callback=callback)
    except Exception as e:
        print(f"Failed to establish connection to RabbitMQ: {e}")
        sys.exit(1)
    finally:
        rabbitmq.close()

if __name__ == "__main__":
    main()