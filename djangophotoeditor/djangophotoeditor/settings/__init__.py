import os

if os.getenv('HEROKU') is not None:
    from .production import *
else:
    from django_envie.workroom import convertfiletovars
    convertfiletovars()
    from .development import *
