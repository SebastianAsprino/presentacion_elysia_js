FROM python:3.11-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY manage.py ./
COPY benchsite ./benchsite
EXPOSE 3000
# 4 workers: gunicorn es multi-proceso (no event-loop), necesita varios
# procesos para no serializar las peticiones concurrentes del runner.
CMD ["gunicorn", "benchsite.wsgi:application", "--bind", "0.0.0.0:3000", "--workers", "4"]
