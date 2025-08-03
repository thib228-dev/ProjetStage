
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.utilisateurs.views import (
   UtilisateurViewSet, AdministrateurViewSet, ConnexionViewSet, ProfesseurViewSet, EtudiantViewSet,
    RespInscriptionViewSet, ResponsableSaisieNoteViewSet, SecretaireViewSet
)

router = DefaultRouter()
router.register(r'utilisateurs', UtilisateurViewSet)
router.register(r'etudiants', EtudiantViewSet)
router.register(r'professeurs', ProfesseurViewSet)
router.register(r'secretaires', SecretaireViewSet)
router.register(r'responsables-inscription', RespInscriptionViewSet)
router.register(r'responsables-notes', ResponsableSaisieNoteViewSet)
router.register(r'administrateurs', AdministrateurViewSet)
router.register(r'connexions', ConnexionViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
