# FROM python:3.8.10
# ADD . /code
# WORKDIR /code
# RUN pip install -r requirements.txt
# CMD python app.py

# consumer/Dockerfile
FROM python:3.10-slim

# Evita interações durante instalação
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza pacotes e instala ffmpeg e dependências do whisper
RUN apt-get update && \
    apt-get install -y ffmpeg git && \
    apt-get clean

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]