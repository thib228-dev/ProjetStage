

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


