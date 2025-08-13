from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.password_validation  import validate_password

from apps.utilisateurs.managers import UtilisateurManager

class Utilisateur(AbstractUser):
    ROLES = [
        ('etudiant', 'Etudiant'),
        ('professeur', 'Professeur'),
        ('admin', 'Administrateur'),
        ('resp_notes', 'Responsable des notes'),
        ('resp_inscription', 'Responsable des inscriptions'),
        ('secretaire', 'Secrétaire'),
    ]
    role = models.CharField(max_length=30, choices=ROLES) 
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['role','email','telephone']

    # ✅ Lien vers le manager
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


# -----------------------------
# Profils utilisateurs
# -----------------------------

class Etudiant(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="etudiant")
    num_carte = models.CharField(max_length=20)
    autre_prenom = models.CharField(max_length=50, null =True)
    photo = models.ImageField(upload_to='photos_etudiants/', null=True,blank=True)
    date_naiss = models.DateField()
    lieu_naiss = models.CharField(max_length=100)
    is_validated = models.BooleanField(default=False)
    evaluations = models.ManyToManyField('page_professeur.Evaluation', through='page_professeur.Note', blank=True)

class Professeur(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="professeur")
    titre = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos_profils/', null=True,blank=True)
    ues = models.ManyToManyField('page_professeur.UE', through='page_professeur.AffectationUe', blank=True)
   
class Administrateur(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="admin")

class RespInscription(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="resp_inscription")

class ResponsableSaisieNote(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="resp_notes")

class Secretaire(models.Model):
    utilisateur = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="secretaire")

class Connexion(models.Model):
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='connexions')
    date_connexion = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField()
    statut = models.CharField(max_length=50)
    navigateur = models.CharField(max_length=200)
    resultat = models.TextField(blank=True)
