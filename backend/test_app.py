import io
import uuid
import unittest
import fitz
from app import app


def create_sample_pdf():
    pdf = fitz.open()
    page = pdf.new_page()
    page.insert_text((72, 72), 'PDF compressor unit test sample')
    data = pdf.write()
    pdf.close()
    return data


class BackendCompressionTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health_endpoint(self):
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'status': 'healthy'})

    def test_compress_pdf_endpoint(self):
        pdf_data = create_sample_pdf()
        data = io.BytesIO(pdf_data)
        response = self.client.post(
            '/compress/pdf',
            data={'file': (data, 'sample.pdf')},
            content_type='multipart/form-data'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('Content-Type'), 'application/pdf')
        self.assertTrue(response.data.startswith(b'%PDF-'))
        self.assertGreater(len(response.data), 0)


if __name__ == '__main__':
    unittest.main()
