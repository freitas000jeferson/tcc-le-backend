# FROM python:3.8.10
# ADD . /code
# WORKDIR /code
# RUN pip install -r requirements.txt
# CMD python app.py

# consumer/Dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]