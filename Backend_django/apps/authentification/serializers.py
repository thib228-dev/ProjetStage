# apps/authentification/serializers.py

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from apps.utilisateurs.models import Utilisateur, Etudiant
from apps.utilisateurs.serializers import (
    EtudiantSerializer,
    ProfesseurSerializer,
    SecretaireSerializer,
    RespInscriptionSerializer,
    ResponsableSaisieNoteSerializer,
    AdministrateurSerializer
)

# Association rôle → serializer correspondant
ROLE_SERIALIZER_MAP = {
    'etudiant': EtudiantSerializer,
    'professeur': ProfesseurSerializer,
    'secretaire': SecretaireSerializer,
    'resp_inscription': RespInscriptionSerializer,
    'resp_notes': ResponsableSaisieNoteSerializer,
    'admin': AdministrateurSerializer
}


class LoginSerializer(serializers.Serializer):
    """Serializer pour la connexion"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class RegisterSerializer(serializers.Serializer):
    """Serializer pour l'inscription générale (tous rôles)"""
    role = serializers.ChoiceField(choices=list(ROLE_SERIALIZER_MAP.keys()))
    data = serializers.DictField()

    def validate(self, attrs):
        role = attrs.get('role')
        serializer_class = ROLE_SERIALIZER_MAP[role]

        # Validation des données pour le rôle choisi
        nested_serializer = serializer_class(data=attrs['data'])
        nested_serializer.is_valid(raise_exception=True)

        # Stockage des infos pour create()
        attrs['validated_data'] = nested_serializer.validated_data
        attrs['serializer_class'] = serializer_class
        return attrs

    def create(self, validated_data):
        serializer_class = validated_data['serializer_class']
        nested_data = validated_data['validated_data']
        # Délégation à la logique du serializer spécifique
        return serializer_class().create(nested_data)


class StudentRegisterSerializer(serializers.ModelSerializer):
    """Serializer spécifique pour l'inscription des étudiants"""
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, validators=[validate_password])
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    sexe = serializers.ChoiceField(choices=Utilisateur.SEXE)

    class Meta:
        model = Etudiant
        fields = [
            "username", "email", "password", "first_name", "last_name", "sexe",
            "num_carte", "autre_prenom", "date_naiss", "lieu_naiss"
        ]

    def validate_username(self, value):
        if Utilisateur.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur existe déjà.")
        return value

    def validate_email(self, value):
        if Utilisateur.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cette adresse email existe déjà.")
        return value

    def validate_num_carte(self, value):
        if value and Etudiant.objects.filter(num_carte=value).exists():
            raise serializers.ValidationError("Ce numéro de carte existe déjà.")
        return value

    def create(self, validated_data):
        # Extraction des données utilisateur
        user_data = {
            'username': validated_data.pop('username'),
            'email': validated_data.pop('email'),
            'password': validated_data.pop('password'),
            'first_name': validated_data.pop('first_name'),
            'last_name': validated_data.pop('last_name'),
            'sexe': validated_data.pop('sexe'),
            'role': 'etudiant'
        }

        # Création de l'utilisateur
        user = Utilisateur.objects.create_user(**user_data)

        # Création de l'étudiant
        etudiant = Etudiant.objects.create(utilisateur=user, **validated_data)
        return etudiant


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer pour le changement de mot de passe"""
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Ancien mot de passe incorrect.")
        return value