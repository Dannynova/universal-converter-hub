# Universal Converter Hub - Backend Server

This is the Flask backend server for the Universal Converter Hub. It handles file conversions for various document formats.

## Features

- **Word to PDF Conversion**: Convert .doc and .docx files to PDF using LibreOffice for accurate formatting preservation
- **PDF to Word Conversion**: Convert PDF files to .docx format
- **CORS Support**: Enables cross-origin requests from the frontend
- **File Size Limits**: Maximum 50MB file uploads
- **Temporary File Cleanup**: Automatic cleanup of temporary files after conversion

## Installation

### Prerequisites

- Python 3.8 or higher
- LibreOffice (required for accurate Word to PDF conversion)
- pip (Python package manager)

### Install LibreOffice

#### Windows
1. Download LibreOffice from [https://www.libreoffice.org/download/](https://www.libreoffice.org/download/)
2. Run the installer and follow the setup wizard
3. Default installation path: `C:\Program Files\LibreOffice`

#### macOS
```bash
# Using Homebrew
brew install libreoffice
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install libreoffice
```

#### Linux (Fedora/CentOS)
```bash
sudo dnf install libreoffice
```

### Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Verify LibreOffice Installation

Before starting the backend, confirm LibreOffice is installed and available on PATH:

```bash
curl http://localhost:5000/check-libreoffice
```

If the endpoint reports LibreOffice is not installed, install it and restart the server.

## Running the Server

### Development Mode
```bash
python app.py
```

The server will run on `http://localhost:5000`

### Production Mode (using Gunicorn)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Endpoints

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**: `{"status": "healthy"}`

### Word to PDF Conversion
- **URL**: `/convert/word-to-pdf`
- **Method**: `POST`
- **Body**: FormData with `file` field containing .doc or .docx file
- **Response**: PDF file (application/pdf)

> This endpoint requires LibreOffice on the server for the best quality conversion.

**Example using curl:**
```bash
curl -X POST -F "file=@document.docx" http://localhost:5000/convert/word-to-pdf --output output.pdf
```

### PDF to Word Conversion
- **URL**: `/convert/pdf-to-word`
- **Method**: `POST`
- **Body**: FormData with `file` field containing PDF file
- **Response**: Word file (.docx)

**Example using curl:**
```bash
curl -X POST -F "file=@document.pdf" http://localhost:5000/convert/pdf-to-word --output output.docx
```

### Image Compression
- **URL**: `/compress/image`
- **Method**: `POST`
- **Body**: FormData with one or more `file` fields containing JPG, PNG, WebP, or GIF files and optional `quality` field (1-100)
- **Response**: Compressed image file or ZIP archive for multiple files

**Example using curl:**
```bash
curl -X POST -F "files=@image1.jpg" -F "files=@image2.png" -F "quality=75" http://localhost:5000/compress/image --output compressed_images.zip
```

### ZIP Creation
- **URL**: `/compress/zip`
- **Method**: `POST`
- **Body**: FormData with one or more `file` fields containing any file types
- **Response**: ZIP archive containing the uploaded files

**Example using curl:**
```bash
curl -X POST -F "files=@document.pdf" -F "files=@photo.jpg" http://localhost:5000/compress/zip --output archive.zip
```

## Configuration

### File Size Limit
To change the maximum file size, modify this line in `app.py`:
```python
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB
```

### Port Configuration
To change the server port, modify this line in `app.py`:
```python
app.run(host='0.0.0.0', port=5000, debug=False)
```

## Troubleshooting

### LibreOffice Not Found
If you see an error about LibreOffice not being installed:
1. Verify LibreOffice is installed: 
   - Windows: Check `C:\Program Files\LibreOffice`
   - macOS: Run `which soffice`
   - Linux: Run `which soffice`
2. If not installed, follow the installation steps above
3. Confirm `soffice` is available on the server PATH or use the default LibreOffice installation path

You can also verify availability by requesting:
- `GET /check-libreoffice`
### Conversion Failures
- Ensure the input file is a valid document
- Check that the file is not corrupted
- Verify the server has write permissions to the temp directory
- Check server logs for detailed error messages

### Port Already in Use
If port 5000 is already in use, either:
1. Change the port in the configuration
2. Kill the process using the port:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Linux/macOS: `lsof -ti :5000 | xargs kill`

## Development

### Required Packages
- Flask: Web framework
- Flask-CORS: Cross-origin resource sharing support
- pdf2docx: PDF to Word conversion
- PyMuPDF: PDF processing
- gunicorn: Production WSGI server

### Code Structure
- `app.py`: Main application file with all routes
- `requirements.txt`: Python dependencies

## Notes

- All uploaded files are processed on the server and deleted after conversion
- Conversions maintain document formatting, images, tables, and layout
- The server is designed for server-side processing with high accuracy
- For production deployments, consider using a production WSGI server like Gunicorn

## License

Part of Universal Converter Hub project.
