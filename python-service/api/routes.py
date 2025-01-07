from flask import Flask, jsonify, request, abort, make_response, render_template
from api import app
from datetime import datetime
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
# import whisper

# MODEL = whisper.load_model("turbo")

ALLOWED_EXTENSIONS = set(['mp3', 'wma', 'wav', 'aac', 'flac'])

def allowedFile(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.errorhandler(404)
def not_found():
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/hc')
@app.route('/')
def health_check():
    print("ENRTROU AQUI")
    dateNow = datetime.now()
    return jsonify({ "status": 200, "date": dateNow })

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.getlist('file')[0]
    filename = ""
    transcription= ""
    print("Files: ", request.files)
    print("Nome: ", file.filename)

    filename = secure_filename(file.filename)
    print("Outros:", allowedFile(filename), app.config['UPLOAD_FOLDER'])

    # if allowedFile(filename):
    #     result = MODEL.transcribe(f)
    #     transcription = result["text"] 
    #     print(result["text"])
    #     # f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    # else:
    #     return jsonify({'message': 'File type not allowed'}), 400
    
    return jsonify({"name": filename, "transcription": transcription, "status": "success"})
    