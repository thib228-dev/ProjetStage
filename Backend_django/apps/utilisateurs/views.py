from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Utilisateur, Etudiant, Professeur, Administrateur, RespInscription, ResponsableSaisieNote, Secretaire, Connexion
from .serializers import UtilisateurSerializer, EtudiantSerializer, ProfesseurSerializer, ConnexionSerializer

class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer

class EtudiantViewSet(viewsets.ModelViewSet):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer

class ProfesseurViewSet(viewsets.ModelViewSet):
    queryset = Professeur.objects.all()
    serializer_class = ProfesseurSerializer

class ConnexionViewSet(viewsets.ModelViewSet):
    queryset = Connexion.objects.all()
    serializer_class = ConnexionSerializer
