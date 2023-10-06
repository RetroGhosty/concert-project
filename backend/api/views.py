from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from . import models
from . import serializers
from django.core.mail import send_mail
import re
from rest_framework import permissions
from django.db import transaction

import random, string

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
        token["email"] = user.email
        token["username"] = user.username
        token["isOrganizer"] = user.isOrganizer
        # ...
        return token


# api/token/
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# api/get/users/
class GetUserAll(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, req):
        try:
            persons = serializers.UserSerializer(models.User.objects.all(), many=True)
            if not persons:
                return Response(data="No User found", status=404)
            return Response(persons.data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# User detail endpoints
# api/user/
class GetUserDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, req):
        try:
            person = models.User.objects.filter(id=req.user.id).first()
            if person is None:
                return Response(data="User doesn't exist", status=403)

            return Response(data=serializers.UserSerializer(person).data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

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
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/get/concerts/
class GetConcertAll(APIView):
    def get(self, req):
        try:
            concerts = serializers.ConcertSerializer(
                models.Concert.objects.all(), many=True
            )
            if not concerts:
                return Response(data="No Concerts found", status=404)
            return Response(concerts.data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            print(str(ex))
            return Response(data=responseDict, status=500)


# api/get/pub/concert/<int:concert_id>/
class GetConcert(APIView):
    def get(self, req, concert_id):
        try:
            concerts = models.Concert.objects.filter(id=concert_id).first()
            if concerts is None:
                return Response(data="Concert not found", status=404)

            return Response(data=serializers.ConcertSerializer(concerts).data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/organizer/concert
class OrganizerConcertModification(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, req):
        try:
            concert = models.Concert.objects.filter(
                name=req.data["concert_name"]
            ).first()
            if concert is None:
                return Response(data="Concert not found", status=404)
            serializedConcert = serializers.ConcertSerializer(concert).data
            if int(req.data["organizer_id"]) != int(req.user.id):
                return Response(data="Unauthorized access", status=403)
            return Response(data=serializedConcert, status=200)

        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def patch(self, req):
        try:
            concert = models.Concert.objects.filter(id=req.data["id"]).first()
            if concert is None:
                return Response(data="Concert was not found", status=404)
            getConcert = serializers.ConcertSerializer(concert, req.data)

            if getConcert.is_valid():
                getConcert.save()
                return Response(data="Saved", status=200)
            print(getConcert.errors)
            return Response(data=getConcert.errors, status=301)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def delete(self, req):
        try:
            concertInfo = models.Concert.objects.filter(id=req.data["id"]).first()
            if concertInfo is None:
                responseDict = {
                    "concertID": req.data["id"],
                    "info": "No concert found",
                }
                return Response(data=responseDict, status=404)

            concertMadeBy = concertInfo.organizerName.id
            currentActiveAccount = req.user.id
            # currentActiveAccount = 2  # Test account
            if concertMadeBy != currentActiveAccount:
                responseDict = {
                    "madeBy": concertInfo.organizerName.id,
                    "sessionUserID": req.user.id,
                    "info": "Unauthorized Access",
                }
                return Response(data=responseDict, status=403)

            concertInfo.delete()
            responseDict = {
                "concertID": req.data["id"],
                "info": "Concert was successfully deleted",
            }

            return Response(data=responseDict, status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/get/tickets/
class GetTicketAll(APIView):
    def get(self, req):
        try:
            tickets = serializers.TicketSerializer(
                models.Ticket.objects.all(), many=True
            )
            if not tickets:
                return Response(data="No ticket was found", status=404)
            return Response(tickets.data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/concert/
class GetTicketOfOrganizer(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, req):
        try:
            concerts = serializers.ConcertSerializer(
                models.Concert.objects.filter(organizerName=req.user.id), many=True
            )
            if not concerts:
                return Response(
                    data="No ticket was found in regards to this organizer", status=404
                )

            return Response(concerts.data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/userpw/
class UserPassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, req):
        try:
            person = models.User.objects.filter(id=req.user.id).first()
            if person is None:
                return Response(data="User was not found", status=404)
            regex = "(?:bcrypt\$)"
            serializedPerson = serializers.UserPwSerializer(person)
            resultPw = re.split(regex, serializedPerson.data["password"])
            return Response(data={"password": resultPw[1]}, status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def patch(self, req):
        try:
            person = models.User.objects.filter(id=req.user.id).first()
            if person is None:
                return Response(data="User was not found", status=404)

            hashedPassword = {"password": make_password(req.data["password"])}

            getUser = serializers.UserPwSerializer(person, hashedPassword)

            if getUser.is_valid():
                getUser.save()
                return Response(data="Successfully changed the password", status=200)

            return Response(data="Not valid", status=301)

        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/register/user
class RegisterUser(APIView):
    def post(self, req):
        try:
            userSerialized = serializers.UserRegisterSerializer(data=req.data)
            if userSerialized.is_valid():
                userSerialized.save()
                return Response(
                    {
                        "Response": f"{userSerialized.data.get('username')} is successfully registered"
                    }
                )
            return Response(data=userSerialized.errors, status=403)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/reset
class ResetPassword(APIView):
    def post(self, req):
        try:
            email = req.data["email"]

            generatedToken = "".join(
                random.choice(string.ascii_uppercase + string.digits) for _ in range(6)
            )
            models.ResetPassword.objects.create(email=email, token=generatedToken)
            dictionary = {"Status": "Success", "info": {"email": email}}
            url = "http://localhost:3000/reset/" + generatedToken
            send_mail(
                subject="Reset password",
                message=f"Click the link below to reset your password:\n\n{url}",
                from_email="no-reply@gmail.com",
                recipient_list=[email],
            )
            return Response(data=dictionary, status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/changepassword
class OTPChangePassword(APIView):
    def get(self, req):
        data = req.data
        token = models.ResetPassword.objects.filter(token=data["otp"]).first()
        if token is None:
            return Response(data="Invalid token", status=401)
        return Response(data="Token is valid", status=200)

    def post(self, req):
        try:
            data = req.data
            if data["password"] != data["password_confirm"]:
                return Response(data="The password doesn't match", status=401)
            token = models.ResetPassword.objects.filter(token=data["otp"]).first()
            if token is None:
                return Response(data="Invalid OTP", status=401)

            user = models.User.objects.filter(email=data["email"]).first()
            if user is None:
                return Response(data="User was not found", status=401)
            user.set_password(data["password"])
            user.save()
            token.delete()
            token = RefreshToken.for_user(user)
            print(str(token))
            return Response(data="Successfully changed the password", status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/typeticket/<int:id>"
class TicketType(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, req, id):
        try:
            ticketType = models.TicketType.objects.filter(concertEvent=id)
            if len(ticketType) == 0:
                return Response(data="No ticket type found", status=404)
            ticketTypeSerialized = serializers.TicketTypeSerializer(
                (ticketType), many=True
            )
            return Response(data=ticketTypeSerialized.data, status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def patch(self, req, id):
        try:
            ticketType = models.TicketType.objects.filter(id=id).first()
            ticketTypeMadeBy = ticketType.organizerName.id
            currentActiveAccount = req.user.id

            if ticketTypeMadeBy != currentActiveAccount:
                return Response(data="Unauthorized request", status=403)

            if ticketType is None:
                return Response(data="Ticket type doesn't exist", status=404)

            ticketTypeSerialized = serializers.TicketTypeSerializer(
                ticketType, data=req.data
            )
            if ticketTypeSerialized.is_valid():
                ticketTypeSerialized.save()
                return Response(data=ticketTypeSerialized.data, status=200)
            return Response(data="Data is invalid", status=300)

        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def post(self, req, id):
        try:
            ticketTypeSerialized = serializers.TicketTypeSerializer(data=req.data)
            concertInfo = models.Concert.objects.get(id=req.data["concertEvent"])
            ticketTypeMadeBy = concertInfo.organizerName.id
            currentActiveAccount = req.user.id
            # currentActiveAccount = 2  # Test account

            if ticketTypeMadeBy != currentActiveAccount:
                return Response(data="Unauthorized request", status=403)

            if ticketTypeSerialized.is_valid():
                ticketTypeSerialized.save()
                return Response(data=req.data, status=200)
            else:
                responseDict = {
                    "message": "Validation Error",
                    "errors": ticketTypeSerialized.errors,
                }
                return Response(data=responseDict, status=300)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def delete(self, req, id):
        try:
            ticketType = models.TicketType.objects.filter(id=id).first()
            concertInfo = models.Concert.objects.get(id=req.data["concertEvent"])
            ticketTypeMadeBy = concertInfo.organizerName.id
            currentActiveAccount = req.user.id
            # currentActiveAccount = 5  # Test account
            if ticketTypeMadeBy != currentActiveAccount:
                return Response(data="Unauthorized request", status=403)
            if ticketType is None:
                return Response(data="Ticket type doesn't exist", status=404)

            ticketType.delete()
            responseDict = {"info": f"Ticket type id {id} is successfully deleted"}
            return Response(data=responseDict, status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


class TicketTypeAll(APIView):
    def get(self, req):
        try:
            ticketTypes = serializers.TicketTypeSerializer(
                models.TicketType.objects.all(), many=True
            )
            if not ticketTypes:
                return Response(data="No ticket type was found", status=404)
            return Response(ticketTypes.data)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)


# api/ticket/<int:id>
class Ticket(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, req, id):
        try:
            ticket = models.Ticket.objects.filter(ticketType=id)
            if len(ticket) == 0:
                return Response(data="No ticket type found", status=404)
            ticketSerialized = serializers.TicketSerializer((ticket), many=True)
            return Response(data=ticketSerialized.data, status=200)
        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    def post(self, req, id):
        try:
            ticketTypeInfo = models.TicketType.objects.get(id=id)
            print(ticketTypeInfo)
            ticketTypeMadeBy = ticketTypeInfo.organizerName.id
            currentActiveAccount = req.user.id
            # currentActiveAccount = 2  # Test account
            if ticketTypeMadeBy != currentActiveAccount:
                responseDict = {
                    "ticketTypeID": id,
                    "madeBy": ticketTypeInfo.organizerName.id,
                    "sessionUserID": req.user.id,
                    "info": "Unauthorized Access",
                }
                return Response(data=responseDict, status=403)

            ticketTypeCreatedByInstance = models.User.objects.get(
                id=req.data["createdBy"]
            )
            ticketList = []
            for ticketItems in range(int(req.data["howManyTicket"])):
                ticketList.append(
                    models.Ticket(
                        ticketType=ticketTypeInfo, createdBy=ticketTypeCreatedByInstance
                    )
                )
            models.Ticket.objects.bulk_create(ticketList)
            responseDict = {
                "info": f"Successfuly generated {req.data['howManyTicket']} tickets"
            }
            return Response(data=req.data, status=200)

        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)

    # TODO: Make edit http verb
    # Function dapat nito ay pinapalitan yung boughtBy kung sakalin may bumili ng ticket
    # find empty boughtBy and false value from isUsed

    def delete(self, req, id):
        try:
            ticketTypeInfo = models.TicketType.objects.get(id=id)
            ticketTypeMadeBy = ticketTypeInfo.organizerName.id
            currentActiveAccount = req.user.id
            # currentActiveAccount = 2  # Test account
            if ticketTypeMadeBy != currentActiveAccount:
                responseDict = {
                    "ticketTypeID": id,
                    "madeBy": ticketTypeInfo.organizerName.id,
                    "sessionUserID": req.user.id,
                    "info": "Unauthorized Access",
                }
                return Response(data=responseDict, status=403)

            ticketNotFoundList = []
            for i in req.data["ticketIdList"]:
                ticketInstance = models.Ticket.objects.filter(id=i).first()
                if ticketInstance is None:
                    ticketNotFoundList.append(i)
                else:
                    ticketInstance.delete()

            responseDict = {
                "info": "Ticket not found",
                "id": ticketNotFoundList,
            }

            if len(ticketNotFoundList) != 0:
                return Response(data=responseDict, status=404)

            return Response(data="It works", status=200)

        except Exception as ex:
            responseDict = {"Server Response": "Something went wrong", "info": str(ex)}
            return Response(data=responseDict, status=500)
