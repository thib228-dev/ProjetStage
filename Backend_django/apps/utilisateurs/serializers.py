
from rest_framework import serializers
from .models import Utilisateur, Professeur, Etudiant, Administrateur, RespInscription, ResponsableSaisieNote, Secretaire, Connexion

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'

class ProfesseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professeur
        fields = '__all__'

class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields = '__all__'

class ConnexionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connexion
        fields = '__all__'
