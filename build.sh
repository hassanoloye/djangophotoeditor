python djangophotoeditor/manage.py makemigrations
python djangophotoeditor/manage.py migrate
gunicorn djangophotoeditor.wsgi --pythonpath=djangophotoeditor --log-file=-
