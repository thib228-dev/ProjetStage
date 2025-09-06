# apps/utilisateurs/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from ..utilisateurs.managers import UtilisateurManager

class Utilisateur(AbstractUser):
    ROLES = [
        ('etudiant', 'Etudiant'),
        ('professeur', 'Professeur'),
        ('admin', 'Administrateur'),
        ('resp_notes', 'Responsable des notes'),
        ('resp_inscription', 'Responsable des inscriptions'),
        ('secretaire', 'Secrétaire'),
    ]
    SEXE = [
        ('M', 'Masculin'),
        ('F', 'Féminin'),
    ]
    sexe = models.CharField(max_length=1, choices=SEXE)
    role = models.CharField(max_length=30, choices=ROLES) 
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    is_validated = models.BooleanField(default=False)  # Ajouté pour la validation des comptes
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['role', 'email']

    objects = UtilisateurManager()
    
    def __str__(self):
        return f"{self.username} ({self.role})"

    @property
    def is_etudiant(self):
        return hasattr(self, 'etudiant')

    @property
    def is_professeur(self):
        return hasattr(self, 'professeur')

    @property
    def is_secretaire(self):
        return hasattr(self, 'secretaire')

    @property
    def is_resp_notes(self):
        return hasattr(self, 'resp_notes')

    @property
    def is_resp_inscription(self):
        return hasattr(self, 'resp_inscription')

    @property
    def is_admin_personnalise(self):
        return hasattr(self, 'admin')


class Etudiant(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="etudiant")
    # Correction : num_carte peut être null mais doit être unique quand défini
    num_carte = models.CharField(max_length=20, null=True, blank=True, unique=True)
    autre_prenom = models.CharField(max_length=50, null=True, blank=True)
    photo = models.ImageField(upload_to='photos_etudiants/', null=True, blank=True)
    date_naiss = models.DateField()
    lieu_naiss = models.CharField(max_length=100)
    evaluations = models.ManyToManyField('page_professeur.Evaluation', through='page_professeur.Note', blank=True)

    def clean(self):
        """Validation personnalisée"""
        super().clean()
        # Vérifier que num_carte est unique seulement si elle n'est pas None
        if self.num_carte and Etudiant.objects.exclude(pk=self.pk).filter(num_carte=self.num_carte).exists():
            raise ValidationError({'num_carte': 'Ce numéro de carte existe déjà.'})

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.utilisateur.first_name} {self.utilisateur.last_name} - {self.num_carte or 'Sans carte'}"


class Professeur(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="professeur")
    titre = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos_profils/', null=True, blank=True)
    ues = models.ManyToManyField('page_professeur.UE', through='page_professeur.AffectationUe', blank=True)
   
    def __str__(self):
        return f"{self.titre} {self.utilisateur.first_name} {self.utilisateur.last_name}"


class Administrateur(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="admin")
    
    def __str__(self):
        return f"Admin: {self.utilisateur.username}"


class RespInscription(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="resp_inscription")
    
    def __str__(self):
        return f"Resp. Inscription: {self.utilisateur.username}"


class ResponsableSaisieNote(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="resp_notes")
    
    def __str__(self):
        return f"Resp. Notes: {self.utilisateur.username}"


class Secretaire(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="secretaire")
    
    def __str__(self):
        return f"Secrétaire: {self.utilisateur.username}"


class Connexion(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='connexions')
    date_connexion = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField()
    statut = models.CharField(max_length=50)
    navigateur = models.CharField(max_length=200)
    resultat = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.utilisateur.username} - {self.date_connexion} - {self.statut}"

    class Meta:
        ordering = ['-date_connexion']