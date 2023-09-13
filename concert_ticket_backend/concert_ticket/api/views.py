from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password 
from . import models
from . import serializers

from rest_framework import permissions
from rest_framework.decorators import permission_classes
import re

from rest_framework.views import APIView


class ListSomething(APIView):
    def get(self, req, number):
        return Response("Some sort of data: " + str(number))
    
    def post(self, req):
        return Response(req.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['username'] = user.username
        token['isOrganizer'] = user.isOrganizer
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GetUserAll(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, req):
        try:
            persons = serializers.UserSerializer(models.User.objects.all(), many=True)
            if not persons:
                return Response(data="No User found", status=404)
            return Response(persons.data)
        except Exception as err:
            return Response(data="Something went wrong", status=500)


# User detail endpoints 
class GetUserDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, req):
        try:
            person = models.User.objects.filter(id=req.user.id).first()
            if (person is None):
                return Response(data="User doesn't exist", status=403)

            return Response(data=serializers.UserSerializer(person).data)
        except:
            return Response(data="Something went wronfg", status=500)
        
    def patch(self, req):
        try:
            dataFromFront = req.data
            dataFromDB = models.User.objects.filter(id=req.user.id).first()
            if dataFromDB is None:
                return Response(data="User doesn't exist", status=403)
            getUser = serializers.UserSerializer(dataFromDB, data=dataFromFront)
            if getUser.is_valid():
                getUser.save()
                return Response("User updated", status=200)
        except:
            return Response("Something went wrong", status=500)

class GetConcertAll(APIView):
    def get(self, req):
        try:
            concerts = serializers.ConcertSerializer(models.Concert.objects.all(), many=True)
            if not concerts:
                return Response(data="No Concerts found", status=404)
            return Response(concerts.data)
        except:
            return Response(data="Something went wrong", status=500)

class GetConcert(APIView):
    def get(self, req, concert_id):
        try:
            concerts = models.Concert.objects.filter(id=concert_id).first()
            if (concerts is None):
                return Response(data="Concert not found", status=404)
            
            return Response(data=serializers.ConcertSerializer(concerts).data)
        except Exception as err:
            return Response(data="Something went wrong: " + str(err), status=500)

class OrganizerConcertModification(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, req):
        try:
            concert = models.Concert.objects.filter(name=req.data['concert_name']).first()
            if concert is None:
                return Response(data="Concert not found", status=404)
            
            serializedConcert = serializers.ConcertSerializer(concert).data
            if (int(req.data['organizer_id']) != int(req.user.id)):
                return Response(data="Unauthorized access", status=403)
            return Response(data=serializedConcert, status=200)

        except Exception as err:
            print(str(err))
            return Response(data="Something went wrong: " + str(err), status=500)
        
    def patch(self, req):
        try:
            concert = models.Concert.objects.filter(id=req.data['id']).first()
            if concert is None:
                return Response(data="Concert was not found", status=404)
            getConcert = serializers.ConcertSerializer(concert, req.data)
            
            if getConcert.is_valid():
                getConcert.save()
                return Response(data="Saved", status=200)
            return Response(data="Not valid", status=301)
        except Exception as err:
            print(f"Error: {err}")
            return Response(data="Something went wrong: " + str(err), status=500)

class GetTicketAll(APIView):
    def get(self, req):
        try:
            tickets = serializers.TicketSerializer(models.Ticket.objects.all(), many=True)
            if not tickets:
                return Response(data="No ticket was found", status=404)
            return Response(tickets.data)
        except:
            return Response(data="No ticket found", status=404)

class GetTicketOfOrganizer(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, req):
        try:
            concerts = serializers.ConcertSerializer(models.Concert.objects.filter(organizerName=req.user.id), many=True)
            if not concerts:
                return Response(data="No ticket was found in regards to this organizer", status=404)

            return Response(concerts.data)
        except:
            return Response(data="Ticket didn't exist", status=404)


class UserPassword(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, req):
        try:
            person = models.User.objects.filter(id=req.user.id).first()
            if person is None:
                return Response(data="User was not found", status=404)
            regex = "(?:bcrypt\$)"
            serializedPerson = serializers.UserPwSerializer(person)
            resultPw = re.split(regex, serializedPerson.data['password'])
            return Response(data={'password': resultPw[1]}, status=200)
        except:
            return Response(data="User does not exist", status=403)
    
    def patch(self, req):
        try:
        
            
            person = models.User.objects.filter(id=req.user.id).first()
            if person is None:
                return Response(data="User was not found", status=404)
            
            hashedPassword = {
                'password': make_password(req.data['password'])
            }

            getUser = serializers.UserPwSerializer(person, hashedPassword)

            if getUser.is_valid():
                getUser.save()
                return Response(data="Successfully changed the password", status=200)

            return Response(data="Not valid", status=301)

        
        except Exception as err:
            return Response(data="Something went wrong: " + str(err), status=500)


class RegisterUser(APIView):
    def post(self, req):
        try:
            userSerialized = serializers.UserRegisterSerializer(data=req.data)
            if userSerialized.is_valid():
                userSerialized.save()
                return Response({"Response" : f"{userSerialized.data.get('username')} is successfully registered"})
            return Response(data=userSerialized.errors, status=403)
        except:
            return Response(data="Something went wrong", status=500)


