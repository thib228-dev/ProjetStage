from django.shortcuts import render

# Create your views here.

""" 
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import StudentRegisterSerializer, LoginSerializer
from apps.utilisateurs.models import Utilisateur

class StudentRegisterView(generics.CreateAPIView):
   
    permission_classes = [AllowAny]
    serializer_class = StudentRegisterSerializer

class LoginView(APIView):
    def post(self, request):
        identifiant = request.data.get("identifiant")
        password = request.data.get("password")
        try:
                user = Utilisateur.objects.get(username=identifiant)
        except Utilisateur.DoesNotExist:
                return Response({"error": "Utilisateur introuvable"}, status=404)

        user_auth = authenticate(username=user.username, password=password)
        if user_auth is None:
            return Response({"error": "Mot de passe incorrect"}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": f"Bienvenue {user.first_name} !"
        }, status=200) """
        
        

# apps/authentification/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.auth_service import AuthService
from .services.register_service import RegisterService

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        data = AuthService.login(username, password)
        if not data:
            return Response({"detail": "Identifiants invalides"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(data, status=status.HTTP_200_OK)



class RegisterView(APIView):
    def post(self, request):
        try:
            user_data = {
                "username": request.data.get("username"),
                "email": request.data.get("email"),
                "password": request.data.get("password"),
                "role": request.data.get("role")
            }

            # On retire du payload les champs communs pour laisser profil_data gérer le reste
            profil_data = request.data.copy()
            for key in ["username", "email", "password", "role"]:
                profil_data.pop(key, None)

            profil = RegisterService.register_user(user_data, profil_data)

            return Response({"message": "Utilisateur et profil créés avec succès"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)