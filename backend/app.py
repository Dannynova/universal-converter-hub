import os
import uuid
import tempfile
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from pdf2docx import Converter

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

# Limit file size to 50 MB
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/convert/pdf-to-word', methods=['POST'])
def convert_pdf_to_word():
    # Check if file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    # Generate temporary file paths
    temp_id = str(uuid.uuid4())
    pdf_path = os.path.join(tempfile.gettempdir(), f'{temp_id}_input.pdf')
    docx_path = os.path.join(tempfile.gettempdir(), f'{temp_id}_output.docx')

    try:
        file.save(pdf_path)

        # Convert using pdf2docx
        cv = Converter(pdf_path)
        cv.convert(docx_path, start=0, end=None)  # All pages
        cv.close()

        if not os.path.exists(docx_path):
            return jsonify({'error': 'Conversion failed – no output file'}), 500

        # Send the Word file back
        return send_file(
            docx_path,
            as_attachment=True,
            download_name=file.filename.replace('.pdf', '.docx'),
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
    except Exception as e:
        return jsonify({'error': f'Conversion error: {str(e)}'}), 500
    finally:
        # Clean up temporary files
        for path in [pdf_path, docx_path]:
            if os.path.exists(path):
                try:
                    os.remove(path)
                except:
                    pass

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)  # Set debug=False for production