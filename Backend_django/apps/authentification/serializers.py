""" 

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from apps.utilisateurs.models import Utilisateur, Etudiant



class LoginSerializer(serializers.Serializer):
    pseudo = serializers.CharField()
    password = serializers.CharField()


class StudentRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    pseudo = serializers.CharField(source='username')  # alias pour username

    class Meta:
        model = Utilisateur
        fields = ['email', 'nom', 'prenoms', 'pseudo', 'password']

    def create(self, validated_data):
        username = validated_data['username']  # alias pseudo
        email = validated_data['email']
        nom = validated_data['nom']
        prenoms = validated_data['prenoms']
        password = validated_data['password']

        user = Utilisateur.objects.create_user(
            username=username,
            email=email,
            nom=nom,
            prenoms=prenoms,
            password=password,
        )

        Etudiant.objects.create(utilisateur=user)
        return user


 """
 
from rest_framework import serializers
from apps.utilisateurs.serializers import (
    EtudiantSerializer,
    ProfesseurSerializer,
    SecretaireSerializer,
    RespInscriptionSerializer,
    ResponsableSaisieNoteSerializer,
    AdministrateurSerializer
)

ROLE_SERIALIZER_MAP = {
    'etudiant': EtudiantSerializer,
    'professeur': ProfesseurSerializer,
    'secretaire': SecretaireSerializer,
    'resp_inscription': RespInscriptionSerializer,
    'resp_notes': ResponsableSaisieNoteSerializer,
    'admin': AdministrateurSerializer
}

class RegisterSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=ROLE_SERIALIZER_MAP.keys())
    data = serializers.DictField()

    def validate(self, attrs):
        role = attrs['role']
        serializer_class = ROLE_SERIALIZER_MAP[role]
        nested_serializer = serializer_class(data=attrs['data'])
        if not nested_serializer.is_valid():
            raise serializers.ValidationError(nested_serializer.errors)
        attrs['validated_data'] = nested_serializer.validated_data
        attrs['serializer_class'] = serializer_class
        return attrs

    def create(self, validated_data):
        serializer_class = validated_data['serializer_class']
        return serializer_class().create(validated_data['validated_data'])
