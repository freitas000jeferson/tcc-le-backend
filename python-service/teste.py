import whisper

print('init...')
model = whisper.load_model("base")

result = model.transcribe("./audio.mp3")
print("resp:", result["text"])