from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class User(AbstractUser):
    isOrganizer = models.BooleanField(default=False)
    birthdate = models.DateField(null=True, blank=True)
    birthplace = models.TextField(null=True, max_length=150, blank=True)
    email = models.CharField(unique=True, max_length=100)
    username = models.CharField(max_length=100, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Ticket(models.Model):
    class TicketTypeChoice(models.TextChoices):
        standard = "standard",
        vip = "vip"
    boughtBy = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    ticketType = models.CharField(choices=TicketTypeChoice.choices, max_length=100, null=True)
    price = models.IntegerField(null=True)
    date_created = models.DateTimeField(auto_now=True)
    expiration = models.DateField(null=True)
    isUsed = models.BooleanField(default=False)
    def __str__(self):
        return (f"{self.ticketType} | {self.price}")
    

class Concert(models.Model):
    name = models.CharField(max_length=100)
    ticket = models.ManyToManyField(Ticket)
    limit = models.IntegerField(null=True)
    organizerName = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    bannerImg = models.ImageField(upload_to="concert_banners", default="concert_banners/default.jpg")
    paragraph = models.TextField(null=True)
    createdAt = models.DateTimeField(null=True, auto_now_add=True)
    eventDue = models.DateTimeField(null=True)
    def __str__(self):
        return self.name