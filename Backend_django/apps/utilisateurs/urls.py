
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UtilisateurViewSet, EtudiantViewSet, ProfesseurViewSet, ConnexionViewSet

router = DefaultRouter()
router.register(r'utilisateurs', UtilisateurViewSet)
router.register(r'etudiants', EtudiantViewSet)
router.register(r'professeurs', ProfesseurViewSet)
router.register(r'connexions', ConnexionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
