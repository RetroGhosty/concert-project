from django.contrib import admin
from .models import User, Ticket, Concert, ResetPassword
# Register your models here.

admin.site.register([User, Ticket, Concert, ResetPassword])