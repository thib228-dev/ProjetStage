from django.db import models
from ..utilisateurs.models import Professeur, Etudiant, ResponsableSaisieNote
from django.core.exceptions import ValidationError
from django.utils import timezone


# Create your models here.

class UE(models.Model):
    libelle = models.CharField(max_length=100)
    code = models.CharField(max_length=50 , unique=True)
    nbre_credit = models.IntegerField()
    composite = models.BooleanField(default=False)
    parcours = models.ManyToManyField("inscription_pedagogique.Parcours", related_name='ues')
    filiere = models.ManyToManyField("inscription_pedagogique.Filiere", related_name='ues')
    annee_etude= models.ManyToManyField("inscription_pedagogique.AnneeEtude", related_name='ues')
    semestre = models.ForeignKey("inscription_pedagogique.Semestre", on_delete=models.CASCADE, related_name='ues')

class Evaluation(models.Model):
    TYPE = [
        ('Devoir', 'Devoir'),
        ('Examen', 'Examen'),
        ('Projet', 'Projet'),
    ]
    ue = models.ForeignKey(UE,on_delete=models.CASCADE, related_name='evaluations')
    type = models.CharField(max_length=50, choices=TYPE)
    poids = models.FloatField()

class Note(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE, related_name='notes')
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


class PeriodeSaisie(models.Model):
    numero = models.CharField(max_length=50)
    date_debut = models.DateField()
    date_fin = models.DateField()
    active = models.BooleanField(default=False)
    responsable = models.ForeignKey(
        ResponsableSaisieNote,
        on_delete=models.CASCADE,
        related_name='periodes_saisie'
    )

    def clean(self):
        if self.date_fin < self.date_debut:
            raise ValidationError("La date de fin doit être postérieure à la date de début.")
        if self._state.adding:  # uniquement à la création
            today = timezone.now().date()
            if self.date_debut < today or self.date_fin < today:
                raise ValidationError("Les dates de début et de fin doivent être dans le futur.")

    def save(self, *args, **kwargs):
        today = timezone.now().date()

        # Si la période a démarré et qu'elle est toujours dans sa plage, active automatiquement
        if self.date_debut <= today <= self.date_fin:
            self.active = True  # automatique
        # Sinon, ne rien changer si le responsable a défini manuellement active=False

        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Période {self.numero} ({self.date_debut} → {self.date_fin})"
    

class AffectationUe(models.Model):
    ue = models.ForeignKey(UE, on_delete=models.CASCADE, related_name='affectations')
    professeur = models.ForeignKey(Professeur, on_delete=models.CASCADE, related_name='affectations')
   