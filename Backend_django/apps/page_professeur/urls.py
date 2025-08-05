
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AffectationUeViewSet, UEViewSet, EvaluationViewSet, NoteViewSet, ProjetViewSet, RechercheViewSet, ArticleViewSet, EncadrementViewSet, PeriodeSaisieViewSet

router = DefaultRouter()
router.register(r'ues', UEViewSet)
router.register(r'evaluations', EvaluationViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'projets', ProjetViewSet)
router.register(r'recherches', RechercheViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'encadrements', EncadrementViewSet)
router.register(r'affectations', AffectationUeViewSet, basename='affectation-ue')
router.register(r'periodes', PeriodeSaisieViewSet, basename='periode-saisie')


urlpatterns = [
    path('', include(router.urls)),
]
