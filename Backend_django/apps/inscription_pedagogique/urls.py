
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnneeAcademiqueViewSet, AnneeEtudeViewSet, FiliereViewSet, ParcoursViewSet, EtablissementViewSet, DepartementViewSet, InscriptionViewSet, PeriodeInscriptionViewSet

router = DefaultRouter()
router.register(r'annee-academique', AnneeAcademiqueViewSet)
router.register(r'annee-etude', AnneeEtudeViewSet)
router.register(r'filiere', FiliereViewSet)
router.register(r'parcours', ParcoursViewSet)
router.register(r'etablissement', EtablissementViewSet)
router.register(r'departement', DepartementViewSet)
router.register(r'inscription', InscriptionViewSet)
router.register(r'periode-inscription', PeriodeInscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
