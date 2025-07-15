
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UEViewSet, EvaluationViewSet, NoteViewSet, ProjetViewSet, RechercheViewSet, ArticleViewSet, EncadrementViewSet

router = DefaultRouter()
router.register(r'ues', UEViewSet)
router.register(r'evaluations', EvaluationViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'projets', ProjetViewSet)
router.register(r'recherches', RechercheViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'encadrements', EncadrementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
