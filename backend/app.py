import os
import sys
import uuid
import tempfile
import subprocess
import shutil
import zipfile
from io import BytesIO
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from pdf2docx import Converter
from PIL import Image, ImageFile
import fitz
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

# Limit file size to 50 MB
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

ALLOWED_EXTENSIONS_PDF = {'pdf'}
ALLOWED_EXTENSIONS_DOCX = {'doc', 'docx'}
ALLOWED_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'webp', 'gif'}

ImageFile.LOAD_TRUNCATED_IMAGES = True


def allowed_file(filename, allowed_ext):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_ext


def allowed_image_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS


def get_output_image_format(filename):
    ext = filename.rsplit('.', 1)[1].lower()
    if ext in ['jpg', 'jpeg']:
        return 'JPEG'
    if ext == 'png':
        return 'PNG'
    if ext == 'webp':
        return 'WEBP'
    if ext == 'gif':
        return 'GIF'
    return 'JPEG'


def compress_image_file(file_storage, quality):
    file_storage.stream.seek(0)
    original_bytes = file_storage.stream.read()
    file_storage.stream.seek(0)

    img = Image.open(BytesIO(original_bytes))
    output_format = get_output_image_format(file_storage.filename)
    if output_format in ['JPEG', 'WEBP'] and img.mode in ('RGBA', 'LA', 'P'):
        img = img.convert('RGB')
    buf = BytesIO()
    save_args = {}
    if output_format in ['JPEG', 'WEBP']:
        save_args['quality'] = quality
        save_args['optimize'] = True
    elif output_format == 'PNG':
        save_args['optimize'] = True
        save_args['compress_level'] = 9
    elif output_format == 'GIF':
        save_args['optimize'] = True
    img.save(buf, format=output_format, **save_args)
    buf.seek(0)

    if buf.getbuffer().nbytes >= len(original_bytes):
        return BytesIO(original_bytes)
    return buf


def find_soffice():
    candidates = ['soffice', 'lowriter', 'swriter']
    for name in candidates:
        path = shutil.which(name)
        if path:
            return path

    if os.name == 'nt':
        windows_paths = [
            r'C:\Program Files\LibreOffice\program\soffice.exe',
            r'C:\Program Files (x86)\LibreOffice\program\soffice.exe',
        ]
        for path in windows_paths:
            if os.path.isfile(path):
                return path

    return None


def ensure_libreoffice_installed():
    soffice_path = find_soffice()
    if not soffice_path:
        sys.stderr.write(
            'ERROR: LibreOffice is required for Word to PDF conversion.\n'
            'Install LibreOffice and ensure the `soffice` executable is on PATH.\n'
        )
        sys.exit(1)
    return soffice_path


def convert_docx_to_pdf(docx_path):
    """
    Convert DOCX to PDF using LibreOffice.
    """
    soffice_path = find_soffice()
    if not soffice_path:
        raise Exception(
            'LibreOffice is required for accurate Word to PDF conversion. '
            'Install LibreOffice and ensure the `soffice` executable is available on PATH.'
        )

    output_dir = os.path.dirname(docx_path)
    output_name = os.path.splitext(os.path.basename(docx_path))[0] + '.pdf'
    output_path = os.path.join(output_dir, output_name)
    try:
        subprocess.run(
            [soffice_path, '--headless', '--convert-to', 'pdf', '--outdir', output_dir, docx_path],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        if not os.path.exists(output_path):
            raise Exception('LibreOffice conversion completed but output file is missing.')
        with open(output_path, 'rb') as f:
            pdf_buffer = BytesIO(f.read())
            pdf_buffer.seek(0)
            return pdf_buffer
    except subprocess.CalledProcessError as e:
        raise Exception(f'LibreOffice conversion failed: {e.stderr.strip() or e.stdout.strip()}')
    except Exception as e:
        raise Exception(f'LibreOffice conversion error: {str(e)}')

@app.route('/convert/word-to-pdf', methods=['POST'])
def convert_word_to_pdf():
    # Check if file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename, ALLOWED_EXTENSIONS_DOCX):
        return jsonify({'error': 'Only .doc and .docx files are allowed'}), 400

    # Generate temporary file paths
    temp_id = str(uuid.uuid4())
    input_path = os.path.join(tempfile.gettempdir(), f'{temp_id}_input{os.path.splitext(file.filename)[1]}')

    try:
        # Save uploaded file
        file.save(input_path)
        
        # Convert DOCX to PDF
        pdf_buffer = convert_docx_to_pdf(input_path)
        
        # Return PDF
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name=file.filename.rsplit('.', 1)[0] + '.pdf',
            mimetype='application/pdf'
        )
        
    except Exception as e:
        return jsonify({'error': f'Conversion failed: {str(e)}. Please make sure the file is a valid Word document.'}), 500
    finally:
        # Clean up temporary files
        if os.path.exists(input_path):
            try:
                os.remove(input_path)
            except:
                pass


@app.route('/convert/pdf-to-word', methods=['POST'])
def convert_pdf_to_word():
    # Check if file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename, ALLOWED_EXTENSIONS_PDF):
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

@app.route('/compress/pdf', methods=['POST'])
def compress_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '' or not allowed_file(file.filename, ALLOWED_EXTENSIONS_PDF):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    temp_id = str(uuid.uuid4())
    pdf_path = os.path.join(tempfile.gettempdir(), f'{temp_id}_input.pdf')
    output_path = os.path.join(tempfile.gettempdir(), f'{temp_id}_output.pdf')

    try:
        file.save(pdf_path)
        quality_str = request.form.get('quality', '40')
        try:
            quality = int(quality_str)
        except ValueError:
            quality = 40
        quality = max(1, min(100, quality))

        doc = fitz.open(pdf_path)
        for page in doc:
            images = page.get_images(full=True)
            for image in images:
                xref = image[0]
                try:
                    pix = fitz.Pixmap(doc, xref)
                    if pix.n > 3:
                        pix = fitz.Pixmap(pix, 0)
                    img_bytes = pix.tobytes('jpeg', quality=quality)
                    page.replace_image(xref, stream=img_bytes)
                except Exception:
                    continue

        doc.save(output_path,
                 garbage=4,
                 clean=1,
                 deflate=1,
                 deflate_images=1,
                 deflate_fonts=1,
                 use_objstms=1,
                 compression_effort=9,
                 preserve_metadata=0)
        doc.close()

        if not os.path.exists(output_path):
            raise Exception('Compression failed to create output file.')

        original_size = os.path.getsize(pdf_path)
        compressed_size = os.path.getsize(output_path)
        if compressed_size >= original_size:
            shutil.copyfile(pdf_path, output_path)

        return send_file(
            output_path,
            as_attachment=True,
            download_name=file.filename.replace('.pdf', '_compressed.pdf'),
            mimetype='application/pdf'
        )
    except Exception as e:
        return jsonify({'error': f'Compression failed: {str(e)}'}), 500
    finally:
        for path in [pdf_path, output_path]:
            if os.path.exists(path):
                try:
                    os.remove(path)
                except:
                    pass

@app.route('/compress/image', methods=['POST'])
def compress_image():
    files = request.files.getlist('files') or []
    if not files and 'file' in request.files:
        files = [request.files['file']]

    if not files:
        return jsonify({'error': 'No image files provided'}), 400

    quality_str = request.form.get('quality', '70')
    try:
        quality = int(quality_str)
    except ValueError:
        quality = 70
    quality = max(1, min(100, quality))

    outputs = []
    for file in files:
        if file.filename == '' or not allowed_image_file(file.filename):
            return jsonify({'error': 'Only JPG, PNG, WebP and GIF images are allowed'}), 400
        buf = compress_image_file(file, quality)
        ext = file.filename.rsplit('.', 1)[1].lower()
        output_name = file.filename.rsplit('.', 1)[0] + '_compressed.' + ext
        mimetype = f'image/{"jpeg" if ext == "jpg" else ext}'
        outputs.append({'name': output_name, 'buffer': buf, 'mimetype': mimetype})

    if len(outputs) == 1:
        output = outputs[0]
        return send_file(
            output['buffer'],
            as_attachment=True,
            download_name=output['name'],
            mimetype=output['mimetype']
        )

    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
        for output in outputs:
            zf.writestr(output['name'], output['buffer'].getvalue())
    zip_buffer.seek(0)

    return send_file(
        zip_buffer,
        as_attachment=True,
        download_name='compressed_images.zip',
        mimetype='application/zip'
    )

@app.route('/compress/zip', methods=['POST'])
def create_zip():
    files = request.files.getlist('files') or []
    if not files and 'file' in request.files:
        files = [request.files['file']]

    if not files:
        return jsonify({'error': 'No files provided'}), 400

    zip_buffer = BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
        for file in files:
            if file.filename == '':
                continue
            zf.writestr(file.filename, file.read())
    zip_buffer.seek(0)

    return send_file(
        zip_buffer,
        as_attachment=True,
        download_name='archive.zip',
        mimetype='application/zip'
    )

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/check-libreoffice', methods=['GET'])
def check_libreoffice():
    soffice_path = find_soffice()
    return jsonify({
        'installed': bool(soffice_path),
        'soffice_path': soffice_path,
        'message': 'LibreOffice is available.' if soffice_path else 'LibreOffice is not installed or not found on PATH.'
    }), 200

if __name__ == '__main__':
    ensure_libreoffice_installed()
    app.run(host='0.0.0.0', port=5000, debug=False)  # Set debug=False for production