from rest_framework import serializers
from .models import User, Ticket, Concert, TicketType
from django.contrib.auth.hashers import make_password
import re


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "isOrganizer",
            "birthdate",
            "birthplace",
        ]


class UserPwSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password"]


class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = "__all__"
        extra_kwargs = {
            "name": {"required": True},
            "description": {"required": True},
            "price": {"required": True},
            "concertEvent": {"required": True},
            "dateValidRange1": {"required": True},
            "dateValidRange2": {"required": True},
        }


class PublicTicketTypeSerializer(serializers.ModelSerializer):
    isAvailable = serializers.SerializerMethodField()
    class Meta:
        model = TicketType
        fields = ["id", "name","description", "price", "dateValidRange1", "dateValidRange2", "isAvailable"]
    def get_isAvailable(self, obj):
        return Ticket.objects.filter(ticketType=obj).filter(boughtBy=None).exists()


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"
        extra_kwargs = {
            "ticketType": {"required": True},
            "boughtBy": {"required": True},
            "createdBy": {"required": True},
        }

class PublicTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"
        extra_kwargs = {
            "boughtBy": {"required": True}
        }

class ConcertSerializer(serializers.ModelSerializer):
    organizerName = serializers.SerializerMethodField()
    organizerId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    bannerImg = serializers.ImageField(use_url=False, required=False)

    class Meta:
        model = Concert
        depth = 1

        fields = [
            "id",
            "name",
            "address",
            "city",
            "province",
            "postal",
            "bannerImg",
            "paragraph",
            "dateValidRange1",
            "dateValidRange2",
            "createdAt",
            "organizerName",
            'organizerId'
        ]

    def get_organizerName(self, obj):
        organizer = obj.organizerName
        if organizer:
            dictionaryResponse = {
                "name": f"{organizer.first_name} {organizer.last_name}"
            }
            return dictionaryResponse["name"]
        return None

    def create(self, validated_data):
        organizer_id = validated_data.pop('organizerId').id
        organizer = User.objects.get(id=organizer_id)
        concert = Concert.objects.create(organizerName=organizer, **validated_data)
        return concert


class PublicConcertSerializer(serializers.ModelSerializer):
    bannerImg = serializers.ImageField(use_url=False, required=False)

    class Meta:
        model = Concert
        fields = [
            "id",
            "name",
            "address",
            "city",
            "province",
            "postal",
            "bannerImg",
            "paragraph",
            "dateValidRange1",
            "dateValidRange2",
            "createdAt",
        ]


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {"username": {"required": True}}

    def validate_email(self, value):
        result = re.search("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}", value)
        print(result)
        if result == None:
            raise serializers.ValidationError("Please enter a valid email")
        return value

    def validate_username(self, value):
        minimum_length = 8
        if len(value) < minimum_length:
            raise serializers.ValidationError(
                f"Username is less than {minimum_length} character"
            )
        return value

    def validate_password(self, value):
        minimum_length = 8
        if len(value) < minimum_length:
            raise serializers.ValidationError(
                f"Password is less than {minimum_length} characters"
            )
        return make_password(value)
