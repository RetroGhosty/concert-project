from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("user/", views.GetUserDetails.as_view()),
    path("get/users/", views.GetUserAll.as_view()),
    path("get/concerts/", views.GetConcertAll.as_view()),
    path("public/concert/<int:concert_id>/", views.GetConcert.as_view()),
    path("concert/", views.GetTicketOfOrganizer.as_view()),
    path("userpw/", views.UserPassword.as_view()),
    path("register/user/", views.RegisterUser.as_view()),
    path("organizer/concert/", views.OrganizerConcertModification.as_view()),
    path("reset/", views.ResetPassword.as_view()),
    path("changepassword/", views.OTPChangePassword.as_view()),
    path("typeticket/<int:id>/", views.TicketType.as_view()),
    path("public/typeticket/<int:concert_id>/", views.GetTicketTypeAll.as_view()),
    path("ticket/<int:id>/", views.Ticket.as_view()),
    path("public/ticket/<int:id>/", views.PublicTicket.as_view())
]
