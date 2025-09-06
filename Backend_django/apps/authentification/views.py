# apps/authentification/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .serializers import RegisterSerializer, StudentRegisterSerializer
from .services.auth_service import AuthService
from apps.utilisateurs.models import Utilisateur


class LoginView(APIView):
    """
    Vue pour l'authentification des utilisateurs
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not username or not password:
            return Response(
                {"error": "Username et password sont requis"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        auth_data = AuthService.login(username, password)
        
        if not auth_data:
            return Response(
                {"error": "Identifiants invalides"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Si l'utilisateur a un compte désactivé
        if 'error' in auth_data:
            return Response(auth_data, status=status.HTTP_403_FORBIDDEN)
        
        return Response(auth_data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    """
    Vue pour l'inscription générale (tous rôles)
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                instance = serializer.save()
                return Response({
                    "message": "Utilisateur créé avec succès",
                    "user_id": instance.utilisateur.id,
                    "profile_id": instance.id,
                    "role": instance.utilisateur.role
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(
                    {"error": f"Erreur lors de la création: {str(e)}"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentRegisterView(generics.CreateAPIView):
    """
    Vue spécifique pour l'inscription des étudiants
    """
    permission_classes = [AllowAny]
    serializer_class = StudentRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            etudiant = serializer.save()
            return Response({
                "message": "Étudiant créé avec succès",
                "user_id": etudiant.utilisateur.id,
                "etudiant_id": etudiant.id,
                "username": etudiant.utilisateur.username,
                "email": etudiant.utilisateur.email
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": f"Erreur lors de la création de l'étudiant: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class LogoutView(APIView):
    """
    Vue pour la déconnexion (blacklist du refresh token)
    """
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(
                    {"message": "Déconnexion réussie"}, 
                    status=status.HTTP_200_OK
                )
            return Response(
                {"error": "Refresh token requis"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": "Token invalide"}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class UserProfileView(APIView):
    """
    Vue pour récupérer le profil de l'utilisateur connecté
    """
    def get(self, request):
        user = request.user
        profile_data = AuthService._get_user_profile(user)
        permissions = AuthService.get_user_permissions(user)
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role,
                'is_validated': user.is_validated,
                'profile': profile_data,
                'permissions': permissions
            }
        })


class ChangePasswordView(APIView):
    """
    Vue pour changer le mot de passe
    """
    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response(
                {"error": "Ancien et nouveau mot de passe requis"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not user.check_password(old_password):
            return Response(
                {"error": "Ancien mot de passe incorrect"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(new_password)
        user.save()
        
        return Response(
            {"message": "Mot de passe modifié avec succès"}, 
            status=status.HTTP_200_OK
        )