from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from apps.inscription_pedagogique.models import Inscription, PeriodeInscription
from apps.page_professeur.models import UE, Evaluation, Recherche, Projet, Article, Encadrement,Note
from apps.page_professeur.serializers import AffectationUeSerializer, UESerializer, EvaluationSerializer, NoteSerializer

from rest_framework import serializers
from .models import (
    Utilisateur, Etudiant, Professeur, Administrateur,
    RespInscription, ResponsableSaisieNote, Secretaire, Connexion
)


# ----- UTILS -----
def creer_utilisateur_avec_role(utilisateur_data, role):
    password = utilisateur_data.pop('password')
    utilisateur = Utilisateur.objects.create_user(password=password, **utilisateur_data)
    utilisateur.role = role
    utilisateur.save()
    return utilisateur

# ----- SERIALIZER UTILISATEUR DE BASE -----
class UtilisateurSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True , required=True, validators=[validate_password])
    class Meta:
        model = Utilisateur
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'telephone', 'role','password']
        read_only_fields = ['role']  # Le rôle ne doit pas être modifiable via l'API
        


# ----- CLASSE DE BASE -----
class BaseProfilSerializer(serializers.ModelSerializer):
    utilisateur = UtilisateurSerializer()
    
    def create(self, validated_data):
        utilisateur_data = validated_data.pop('utilisateur')
        role = self.Meta.role
        utilisateur = creer_utilisateur_avec_role(utilisateur_data, role)
        return self.Meta.model.objects.create(utilisateur=utilisateur, **validated_data)
    
    
    def update(self, instance, validated_data):
        utilisateur_data = validated_data.pop('utilisateur', None)
        if utilisateur_data:
            for attr, value in utilisateur_data.items():
                setattr(instance.utilisateur, attr, value)
            instance.utilisateur.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


# ----- ETUDIANT -----
class EtudiantSerializer(BaseProfilSerializer):
    role = serializers.CharField(default='etudiant', read_only=True)
    inscriptions = serializers.PrimaryKeyRelatedField(queryset=Inscription.objects.all(),many=True, allow_null = True, required=False)
    evaluations = NoteSerializer(source = 'notes' ,many=True, read_only=True)
    class Meta:
        model = Etudiant
        fields = '__all__'


# ----- PROFESSEUR -----
class ProfesseurSerializer(BaseProfilSerializer):
    role = serializers.CharField(default='professeur', read_only=True)
    ues = AffectationUeSerializer(source = 'affectations' ,many=True, required=False)
    projets = serializers.PrimaryKeyRelatedField(queryset=  Projet.objects.all(), many=True, required=False)
    recherches = serializers.PrimaryKeyRelatedField(queryset=Recherche.objects.all(), many=True, required=False)
    articles = serializers.PrimaryKeyRelatedField(queryset=Article.objects.all(), many=True, required=False)
    encadrements = serializers.PrimaryKeyRelatedField(queryset=Encadrement.objects.all(), many=True, required=False)
   
    
    class Meta:
        model = Professeur
        fields = '__all__'


# ----- SECRETAIRE -----
class SecretaireSerializer(BaseProfilSerializer):
    role = 'secretaire'
    class Meta:
        model = Secretaire
        fields = ['id', 'utilisateur']


# ----- RESPONSABLE INSCRIPTION -----
class RespInscriptionSerializer(BaseProfilSerializer):
    class Meta:
        model = RespInscription
        role = 'resp_inscription'
        fields = ['id', 'utilisateur']


# ----- RESPONSABLE SAISIE NOTE -----
class ResponsableSaisieNoteSerializer(BaseProfilSerializer):
    class Meta:
        model = ResponsableSaisieNote
        role = 'resp_notes'
        fields = ['id', 'utilisateur']


# ----- ADMIN -----
class AdministrateurSerializer(BaseProfilSerializer):
    class Meta:
        model = Administrateur
        fields = ['id', 'utilisateur']


# ----- CONNEXION -----
class ConnexionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connexion
        fields = ['id', 'date_connexion', 'ip', 'statut', 'navigateur', 'resultat']
