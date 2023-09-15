from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.GetUserDetails.as_view(), name="api_userdetails"),
    path('get/users/', views.GetUserAll.as_view(), name="api_getusers"),
    path('get/concerts/', views.GetConcertAll.as_view(), name="api_getconcerts"),
    path('get/pub/concert/<int:concert_id>/', views.GetConcert.as_view(), name="api_findConcert"),
    path('get/tickets/', views.GetTicketAll.as_view(), name="api_gettickets"),
    path('concert/', views.GetTicketOfOrganizer.as_view(), name="api_findTicket"),
    path('userpw/', views.UserPassword.as_view(), name="api_getUserPassword"),
    path('register/user', views.RegisterUser.as_view(), name="api_registeruser"),
    path('organizer/concert', views.OrganizerConcertModification.as_view(), name="api_Organizer View")
]