from django.db import models
from ..utilisateurs.models import Etudiant, RespInscription

# Create your models here.

class AnneeAcademique(models.Model):
    libelle = models.CharField(max_length=20)

class AnneeEtude(models.Model):
    libelle = models.CharField(max_length=50)
    annee_academique = models.ForeignKey(AnneeAcademique, on_delete=models.CASCADE)

class Filiere(models.Model):
    nom = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)

class Parcours(models.Model):
    libelle = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE)

class Etablissement(models.Model):
    nom = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)

class Departement(models.Model):
    nom = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=10)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)

class Inscription(models.Model):
    numero = models.CharField(max_length=50)
    date = models.DateField()
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)
    parcours = models.ForeignKey(Parcours, on_delete=models.CASCADE)
    annee_etude = models.ForeignKey(AnneeEtude, on_delete=models.CASCADE)

class PeriodeInscription(models.Model):
    numero = models.CharField(max_length=50)
    date_debut = models.DateField()
    date_fin = models.DateField()
    parcours = models.ForeignKey(Parcours, on_delete=models.CASCADE)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE)
    annee_etude = models.ForeignKey(AnneeEtude, on_delete=models.CASCADE)
    annee_univ = models.ForeignKey(AnneeAcademique, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
    responsable = models.ForeignKey(RespInscription, on_delete=models.SET_NULL, null=True)

