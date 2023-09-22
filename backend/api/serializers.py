from rest_framework import serializers
from .models import User, Ticket, Concert
from django.contrib.auth.hashers import make_password 
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "first_name", "last_name", "isOrganizer", "birthdate", "birthplace"]
        
    

class UserPwSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password"]

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"

class ConcertSerializer(serializers.ModelSerializer):
    organizerName = serializers.SerializerMethodField()
    bannerImg = serializers.ImageField(use_url=False, required=False)
    class Meta:
        model = Concert
        depth = 1

        fields = ['id', 'name', 'limit', 'bannerImg', 'paragraph', 'dateValidRange1', 'dateValidRange2', 'createdAt', 'organizerName', 'ticket']

    def get_organizerName(self, obj):
        organizer = obj.organizerName
        if organizer:
            dictionaryResponse = {
                'name': f"{organizer.first_name} {organizer.last_name}"
            }
            return dictionaryResponse['name']
        return None

class PublicConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        depth = 1
        fields = ["name", "ticket", "limit", "bannerImg", "paragraph"]


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'username': {'required':True}}

    def validate_email(self, value):
        result = re.search("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}", value)
        print(result)
        if result == None:
            raise serializers.ValidationError("Please enter a valid email")
        return value
    def validate_username(self, value):
        minimum_length = 8
        if len(value) < minimum_length:
            raise serializers.ValidationError(f"Username is less than {minimum_length} character")
        return value
    
    def validate_password(self, value):
        minimum_length = 8
        if len(value) < minimum_length:
            raise serializers.ValidationError(f"Password is less than {minimum_length} characters")
        return make_password(value)
        
        