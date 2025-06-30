from django.db import models

# Create your models here.

class Utilisateur(models.Model):
    email = models.EmailField(unique=True)
    pseudo = models.CharField(max_length=50)
    password = models.CharField(max_length=128)
    nom = models.CharField(max_length=100)
    prenoms = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)

class Professeur(Utilisateur):
    titre = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    photo = models.TextField(blank=True)
    code_secret = models.CharField(max_length=50)

class Etudiant(Utilisateur):
    num_carte = models.CharField(max_length=20)
    photo = models.TextField(blank=True)
    date_naiss = models.DateField()
    lieu_naiss = models.CharField(max_length=100)
    adresse = models.TextField(blank=True)
    quartier = models.CharField(max_length=100)

class Administrateur(Utilisateur):
    pass

class RespInscription(Utilisateur):
    pass

class ResponsableSaisieNote(Utilisateur):
    pass

class Secretaire(Utilisateur):
    pass

class Connexion(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='connexions')
    date_connexion = models.DateTimeField()
    ip = models.GenericIPAddressField()
    statut = models.CharField(max_length=50)
    navigateur = models.CharField(max_length=200)
    resultat = models.TextField(blank=True)
