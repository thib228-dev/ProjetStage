# apps/authentification/urls.py

from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    StudentRegisterView, 
    LogoutView, 
    UserProfileView, 
    ChangePasswordView
)

urlpatterns = [
    # Authentification
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # Inscription
    path('register/', RegisterView.as_view(), name='register'),
    path('register/etudiant/', StudentRegisterView.as_view(), name='register-etudiant'),
    
    # Profil utilisateur
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]