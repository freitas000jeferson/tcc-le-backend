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

# instalar outros
!pip install librosa pyaudio soundfile
- https://www.youtube.com/watch?v=D8SL3WKj2No

# Metodo 1
Aqui está um código completo em Python que recebe um áudio do usuário, transcreve o que foi falado e compara com um texto de referência para avaliar a pronúncia.
## 📌 Como Funciona?
1️⃣ Recebe um áudio do usuário.
2️⃣ Transcreve o áudio para texto usando Google Speech-to-Text.
3️⃣ Compara com o texto de referência usando NLTK e difflib.
4️⃣ Calcula uma pontuação de similaridade para avaliar a pronúncia.

## 🛠 Tecnologias usadas:
- SpeechRecognition → Para transcrever o áudio para texto.
- difflib → Para comparar a transcrição com o texto de referência.
- pydub → Para converter o áudio, se necessário.
- nltk → Para análise textual.
## 📜 Código Completo
```python
import speech_recognition as sr
import difflib
import nltk
from nltk.tokenize import word_tokenize
from pydub import AudioSegment

# Certifique-se de baixar os recursos necessários do NLTK
nltk.download('punkt')

# Função para converter áudio para WAV (caso necessário)
def converter_para_wav(arquivo_audio):
    if not arquivo_audio.endswith(".wav"):
        audio = AudioSegment.from_file(arquivo_audio)
        novo_arquivo = arquivo_audio.split(".")[0] + ".wav"
        audio.export(novo_arquivo, format="wav")
        return novo_arquivo
    return arquivo_audio

# Função para transcrever áudio para texto
def transcrever_audio(arquivo_audio):
    reconhecedor = sr.Recognizer()
    arquivo_wav = converter_para_wav(arquivo_audio)  # Garante que o formato seja WAV
    
    with sr.AudioFile(arquivo_wav) as source:
        audio = reconhecedor.record(source)  # Lê o áudio
    
    try:
        texto_transcrito = reconhecedor.recognize_google(audio, language="en-US")  # Suporte para inglês
        return texto_transcrito.lower()
    except sr.UnknownValueError:
        return "Erro: Não foi possível entender o áudio."
    except sr.RequestError:
        return "Erro: Problema na conexão com o serviço de reconhecimento."

# Função para calcular a similaridade entre dois textos
def calcular_similaridade(texto_usuario, texto_referencia):
    tokens_usuario = word_tokenize(texto_usuario)  # Tokeniza as palavras do usuário
    tokens_referencia = word_tokenize(texto_referencia.lower())  # Tokeniza o texto de referência
    
    sequencia = difflib.SequenceMatcher(None, tokens_usuario, tokens_referencia)
    return sequencia.ratio() * 100  # Retorna a similaridade em percentual

# Texto de referência correto
texto_referencia = "The quick brown fox jumps over the lazy dog."

# Caminho do áudio do usuário
arquivo_audio = "usuario.wav"

# Transcreve o áudio e compara com o texto de referência
texto_usuario = transcrever_audio(arquivo_audio)
print(f"Texto transcrito: {texto_usuario}")

# Calcula a similaridade com o texto de referência
if "Erro" not in texto_usuario:
    pontuacao = calcular_similaridade(texto_usuario, texto_referencia)
    print(f"Pontuação de pronúncia: {pontuacao:.2f}/100")
else:
    print(texto_usuario)  # Exibe erro caso não consiga transcrever o áudio

```
## 🔥 Como Usar
1️⃣ Instale as dependências necessárias:
```cmd
pip install SpeechRecognition pydub nltk
```
2️⃣ Substitua "usuario.wav" pelo caminho do áudio do usuário.
3️⃣ Altere o texto de referência para a frase esperada.
4️⃣ Execute o script e veja a pontuação de pronúncia!

## 🧠 Como Funciona?
- O usuário grava um áudio com uma frase específica.
- O script transcreve o áudio e o converte em texto.
- O texto é comparado com o texto de referência.
- A similaridade é calculada usando difflib.
- Quanto maior a similaridade, melhor a pronúncia!

# Metodo 2
Aqui está um código completo e otimizado em Python que recebe um áudio do usuário e analisa a pronúncia comparando-o com um texto de referência usando as bibliotecas:

✅ Whisper (OpenAI) → Para transcrição precisa do áudio.
✅ difflib → Para comparar a transcrição com o texto de referência.
✅ pydub → Para conversão de áudio caso necessário.
✅ nltk → Para análise e tokenização do texto

## 📜 Código Completo
```python
import whisper
import difflib
import nltk
from nltk.tokenize import word_tokenize
from pydub import AudioSegment
import os

# Certifique-se de baixar os recursos necessários do NLTK
nltk.download('punkt')

# Função para converter áudio para WAV (caso necessário)
def converter_para_wav(arquivo_audio):
    if not arquivo_audio.endswith(".wav"):
        audio = AudioSegment.from_file(arquivo_audio)
        novo_arquivo = arquivo_audio.split(".")[0] + ".wav"
        audio.export(novo_arquivo, format="wav")
        return novo_arquivo
    return arquivo_audio

# Função para transcrever áudio para texto usando Whisper
def transcrever_audio(arquivo_audio):
    modelo = whisper.load_model("base")  # Escolhe o modelo base do Whisper (pode ser tiny, small, medium, large)
    
    arquivo_wav = converter_para_wav(arquivo_audio)  # Converte para WAV se necessário
    
    resultado = modelo.transcribe(arquivo_wav)  # Transcreve o áudio
    return resultado["text"].strip().lower()  # Retorna o texto em caixa baixa

# Função para calcular a similaridade entre dois textos
def calcular_similaridade(texto_usuario, texto_referencia):
    tokens_usuario = word_tokenize(texto_usuario)  # Tokeniza as palavras do usuário
    tokens_referencia = word_tokenize(texto_referencia.lower())  # Tokeniza o texto de referência
    
    sequencia = difflib.SequenceMatcher(None, tokens_usuario, tokens_referencia)
    return sequencia.ratio() * 100  # Retorna a similaridade em percentual

# Texto de referência correto
texto_referencia = "The quick brown fox jumps over the lazy dog."

# Caminho do áudio do usuário
arquivo_audio = "usuario.mp3"  # Pode ser qualquer formato suportado pelo pydub (mp3, wav, ogg, etc.)

# Transcreve o áudio e compara com o texto de referência
texto_usuario = transcrever_audio(arquivo_audio)
print(f"Texto transcrito: {texto_usuario}")

# Calcula a similaridade com o texto de referência
pontuacao = calcular_similaridade(texto_usuario, texto_referencia)
print(f"Pontuação de pronúncia: {pontuacao:.2f}/100")

```
## 🔥 Como Usar
1️⃣ Instale as dependências necessárias:
```cmd
pip install openai-whisper pydub nltk ffmpeg-python
```
2️⃣ Baixe o FFmpeg (necessário para conversão de áudio com pydub):
3️⃣ Substitua "usuario.mp3" pelo caminho do áudio do usuário.
4️⃣ Modifique o texto de referência conforme a frase esperada.
5️⃣ Execute o script e veja a pontuação da pronúncia!

## 🧠 Como Funciona?
- O usuário grava um áudio com uma frase específica.
- O Whisper transcreve o áudio com alta precisão.
- O texto é comparado com o texto de referência.
- A similaridade é calculada usando difflib.
- Quanto maior a similaridade, melhor a pronúncia!

# rabbitmq
instalação e execucao do serviço
- exemplo: https://github.com/deepshig/rabbitmq-docker/blob/master/docker-compose.yml