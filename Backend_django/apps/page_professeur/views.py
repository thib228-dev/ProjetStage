from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import UE, AffectationUe, Evaluation, Note, Projet, Recherche, Article, Encadrement,PeriodeSaisie
from apps.authentification.permissions import IsAdminOrRespNotesOnly, IsProfesseur, IsResponsableNotes, IsOwnerOrReadOnlyForProf
from .serializers import UESerializer,AffectationUeSerializer, EvaluationSerializer, NoteSerializer, ProjetSerializer, RechercheSerializer, ArticleSerializer, EncadrementSerializer, PeriodeSaisieSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from apps.utilisateurs.models import Professeur



class UEViewSet(viewsets.ModelViewSet):
    queryset = UE.objects.all()
    serializer_class = UESerializer
    permission_classes = [IsAdminOrRespNotesOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsResponsableNotes()]
        elif self.action == 'list':
            if hasattr(self.request.user, 'professeur'):
                prof = self.request.user.professeur
                ues = prof.ues.all().values_list('id', flat=True)
                self.queryset = UE.objects.filter(id__in=ues)
                return [IsProfesseur()]
            return [IsResponsableNotes()]
        return super().get_permissions()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['parcours', 'filiere', 'annee_etude']

    

class EvaluationViewSet(viewsets.ModelViewSet):
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class ProjetViewSet(viewsets.ModelViewSet):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer
    permissions_classes = [IsOwnerOrReadOnlyForProf]

    def perform_create(self, serializer):
        # Lier le projet au professeur connecté
        serializer.save(professeur=self.request.user.professeur)

class RechercheViewSet(viewsets.ModelViewSet):
    queryset = Recherche.objects.all()
    serializer_class = RechercheSerializer
    permission_classes = [IsOwnerOrReadOnlyForProf]


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsOwnerOrReadOnlyForProf]


class EncadrementViewSet(viewsets.ModelViewSet):
    queryset = Encadrement.objects.all()
    serializer_class = EncadrementSerializer
    permission_classes = [IsOwnerOrReadOnlyForProf]


class PeriodeSaisieViewSet(viewsets.ModelViewSet):
    queryset = PeriodeSaisie.objects.all()
    serializer_class = PeriodeSaisieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return PeriodeSaisie.objects.all()
        elif hasattr(user, 'resp_notes'):
            return PeriodeSaisie.objects.filter(responsable=user.resp_notes)
        return PeriodeSaisie.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, 'resp_notes'):
            serializer.save(responsable=user.resp_notes)
        elif user.is_superuser:
            responsable = self.request.data.get('responsable')
            serializer.save(responsable_id=responsable)
        else:
            raise PermissionError("Tu n'as pas le droit de créer une période.")

class AffectationUeViewSet(viewsets.ModelViewSet):
    queryset = AffectationUe.objects.all()
    serializer_class = AffectationUeSerializer
    permission_classes = [IsAdminOrRespNotesOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsResponsableNotes()]
        elif self.action == 'list':
            if hasattr(self.request.user, 'professeur'):
                return [IsProfesseur()]
            return [IsResponsableNotes()]
        return super().get_permissions()
