from django.db import models
from ..utilisateurs.models import Professeur, Etudiant


# Create your models here.

class UE(models.Model):
    libelle = models.CharField(max_length=100)
    code = models.CharField(max_length=50)
    nbre_credit = models.IntegerField()
    composite = models.BooleanField(default=False)
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE, related_name='ues')

class Evaluation(models.Model):
    ue = models.ForeignKey(UE, on_delete=models.CASCADE, related_name='evaluations')
    type = models.CharField(max_length=50)
    poids = models.FloatField()

class Note(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE, related_name='notes')
    note = models.FloatField()

class Projet(models.Model):
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)
    titre = models.CharField(max_length=200)
    date_debut = models.DateField()
    date_fin = models.DateField()
    resume = models.TextField()
    lien = models.URLField(blank=True)

class Recherche(models.Model):
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    titre = models.CharField(max_length=200)
    description = models.TextField()
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)

class Article(models.Model):
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)
    titre = models.CharField(max_length=200)
    journal = models.CharField(max_length=100)
    annee = models.CharField(max_length=4)
    lien = models.URLField(blank=True)

class Encadrement(models.Model):
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    titre = models.CharField(max_length=200)
    niveau = models.CharField(max_length=50)
    filiere = models.CharField(max_length=100)
    nom_etudiant = models.CharField(max_length=100)
    annee = models.CharField(max_length=10)
    lien = models.URLField(blank=True)

