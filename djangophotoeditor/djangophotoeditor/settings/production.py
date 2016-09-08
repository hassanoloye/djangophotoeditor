# Production specific settings
# Parse database configuration from $DATABASE_URL
import dj_database_url

from .base import *

DEBUG = False

DATABASES = {
    'default': dj_database_url.config()
}
BOWER_PATH = '/app/node_modules/bower'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = ['*']
