from django.contrib import admin

# Register your models here.
from .models import Utilisateur, Professeur, Etudiant, Administrateur, RespInscription, ResponsableSaisieNote, Secretaire, Connexion

admin.site.register(Utilisateur)
admin.site.register(Professeur)
admin.site.register(Etudiant)
admin.site.register(Administrateur)
admin.site.register(RespInscription)
admin.site.register(ResponsableSaisieNote)
admin.site.register(Secretaire)
admin.site.register(Connexion)
