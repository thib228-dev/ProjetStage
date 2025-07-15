
from rest_framework import serializers
from apps.utilisateurs.models import Utilisateur
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    role_demande = serializers.ChoiceField(choices=[('ETUDIANT', 'Étudiant'), ('PROFESSEUR', 'Professeur')])

    class Meta:
        model = Utilisateur
        fields = ['email', 'nom', 'prenom', 'password', 'role_demande']

    def create(self, validated_data):
        user = Utilisateur.objects.create_user(
            email=validated_data['email'],
            nom=validated_data['nom'],
            prenom=validated_data['prenom'],
            role_demande=validated_data['role_demande'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
