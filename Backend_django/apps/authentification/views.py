from django.shortcuts import render

# Create your views here.


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
    """Inscription libre pour les étudiants (compte en attente de validation)."""
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
        }, status=200)