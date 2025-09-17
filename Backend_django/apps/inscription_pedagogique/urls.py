
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from  apps.inscription_pedagogique.views.apiviews.parcours_relations_view import parcours_avec_relations

from .views.viewset.views import AnneeAcademiqueViewSet, AnneeEtudeViewSet, FiliereViewSet, ParcoursViewSet, EtablissementViewSet, DepartementViewSet, InscriptionViewSet, PeriodeInscriptionViewSet,SemestreViewSet
from .views.apiviews.inscriptions_filtre_view import FiltrerEtudiantsAPIView, EtudiantsParUEView

router = DefaultRouter()
router.register(r'annee-academique', AnneeAcademiqueViewSet)
router.register(r'annee-etude', AnneeEtudeViewSet)
router.register(r'filiere', FiliereViewSet)
router.register(r'parcours', ParcoursViewSet)
router.register(r'etablissement', EtablissementViewSet)
router.register(r'departement', DepartementViewSet)
router.register(r'inscription', InscriptionViewSet)
router.register(r'periode-inscription', PeriodeInscriptionViewSet)
router.register(r'semestre',SemestreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('etudiants/filtrer/', FiltrerEtudiantsAPIView.as_view(), name='filtrer_etudiants'), 
    path('etudiants/ue/<int:ue_id>/', EtudiantsParUEView.as_view(), name='etudiants_par_ue'),
    path('parcours-relations/', parcours_avec_relations, name='parcours-relations'),

]
