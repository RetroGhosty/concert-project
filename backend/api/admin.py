from django.contrib import admin
from .models import User, Ticket, Concert
# Register your models here.

admin.site.register([User, Ticket, Concert])