SECRET_KEY = 'bench-only-not-for-production'
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
