FROM python:3.11-slim

# Optional: install LibreOffice if you need Word->PDF conversion inside the container.
# This will increase image size significantly. Uncomment the apt lines if required.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
EXPOSE 5000

# Use gunicorn in production. When running on Windows servers use `run_prod.py` (waitress).
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app", "--workers", "3", "--threads", "2"]
