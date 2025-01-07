# Python version
3.12

# Install 
!pip install -U openai-whisper
!pip install setuptools-rust

# Flask api
!pip install Flask
!sudo apt update && sudo apt install ffmpeg
!pip install Werkzeug flask_cors

# Formatar audio
!ffmpeg -i Conference.wav -ar 16000 Conference_resampled.wav


# Usando o rabbitmq
!pip install pika