from django.db import models
from django.contrib.auth.models import AbstractUser

# Remove the null=True


class User(AbstractUser):
    isOrganizer = models.BooleanField(default=False)
    birthdate = models.DateField(null=True, blank=True)
    birthplace = models.TextField(null=True, max_length=150, blank=True)
    email = models.CharField(unique=True, max_length=100)
    username = models.CharField(max_length=100, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class Concert(models.Model):
    name = models.CharField(max_length=100)
    limit = models.IntegerField(null=True)
    organizerName = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bannerImg = models.ImageField(
        upload_to="concert_banners", default="concert_banners/default.jpg"
    )
    paragraph = models.TextField(null=True)
    createdAt = models.DateTimeField(null=True, auto_now_add=True)
    dateValidRange1 = models.DateField(null=True)
    dateValidRange2 = models.DateField(null=True)

    def __str__(self):
        return self.name


class TicketType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=255)
    price = models.IntegerField(null=True)
    concertEvent = models.ForeignKey(
        Concert, on_delete=models.CASCADE, null=True
    )  # REMOVE THE null=True in production
    dateValidRange1 = models.DateField(null=True)
    dateValidRange2 = models.DateField(null=True)
    date_created = models.DateField(auto_now=True)
    organizerName = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.name} | {self.concertEvent}"


class Ticket(models.Model):
    ticketType = models.ForeignKey(TicketType, on_delete=models.CASCADE, null=True)
    boughtBy = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="boughtBy"
    )
    createdBy = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="createdBy"
    )

    date_created = models.DateField(auto_now=True)
    isUsed = models.BooleanField(default=False)


class ResetPassword(models.Model):
    email = models.CharField(max_length=255)
    token = models.CharField(max_length=255, unique=True)
    expiration = models.TimeField(null=True)
