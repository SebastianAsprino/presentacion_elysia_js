import os
import secrets

# El bench no usa sesiones, CSRF ni firmas, pero Django exige una SECRET_KEY.
# Se lee del entorno y, si no está, se genera una aleatoria por proceso en vez
# de dejar una clave fija en el repositorio.
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY') or secrets.token_urlsafe(50)
DEBUG = False
ALLOWED_HOSTS = ['*']

ROOT_URLCONF = 'benchsite.urls'
WSGI_APPLICATION = 'benchsite.wsgi.application'

MIDDLEWARE = [
    'benchsite.middleware.BenchHeadersMiddleware',
]

# Solo lo mínimo: sin apps, sin DB, sin templates — un endpoint de texto plano.
INSTALLED_APPS = []
USE_TZ = True
