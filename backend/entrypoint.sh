#!/bin/sh

python manage.py migrade --no-input

python manage.py collectstatic --no-input

gunicorn concert_ticket.wsgi:application --bind 0.0.0.0:8000
