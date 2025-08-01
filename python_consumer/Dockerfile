# consumer/Dockerfile
FROM python:3.10-slim

# Evita interações durante instalação
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza pacotes e instala ffmpeg e dependências do whisper
RUN apt-get update && \
    apt-get install -y ffmpeg git libmagic1 file && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]