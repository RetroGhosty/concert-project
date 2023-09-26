from django.contrib import admin
from .models import User, TicketType, Ticket, Concert, ResetPassword

# Register your models here.

admin.site.register([User, TicketType, Ticket, Concert, ResetPassword])
