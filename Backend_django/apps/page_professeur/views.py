from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import UE, AffectationUe, Evaluation, Note, Projet, Recherche, Article, Encadrement,PeriodeSaisie
from apps.authentification.permissions import IsAdminOrRespNotesOnly, IsProfesseur, IsResponsableNotes, IsOwnerOrReadOnlyForProf
from .serializers import UESerializer,AffectationUeSerializer, EvaluationSerializer, NoteSerializer, ProjetSerializer, RechercheSerializer, ArticleSerializer, EncadrementSerializer, PeriodeSaisieSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from apps.utilisateurs.models import Professeur, Etudiant
from apps.utilisateurs.serializers import EtudiantSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class UEViewSet(viewsets.ModelViewSet):
    queryset = UE.objects.all().order_by('code')
    serializer_class = UESerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['parcours', 'filiere', 'annee_etude', 'semestre']

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]  
        if self.action == 'retrieve':
            return [permissions.AllowAny()]
        
        if self.action in ['create', 'update', 'destroy', 'partial_update']:
            return [IsResponsableNotes()]
        
        # Par défaut : authentification requise
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtrage optionnel pour les professeurs
        if hasattr(self.request.user, 'professeur'):
            return queryset.filter(professeurs=self.request.user.professeur)
        
        return queryset
        
        
# Récupération des étudiants inscrits à une UE donnée
    @action(detail=True, methods=['get'])
    def etudiantsInscrits(self, request, pk=None):
        ue = self.get_object()
        etudiantsInscrits = Etudiant.objects.filter(inscriptions__ues=ue)
        serializer = EtudiantSerializer(etudiantsInscrits, many=True)
        return Response(serializer.data)

    # Récupérer toutes les évaluations liées à une UE donnée
    @action(detail=True, methods=['get'], url_path='evaluations')
    def get_evaluations(self, request, pk=None):
        try:
            ue = self.get_object()  # récupère l'UE en fonction de pk
            evaluations = ue.evaluations.all()  # grâce au related_name="evaluations"
            serializer = EvaluationSerializer(evaluations, many=True)
            return Response(serializer.data)
        except UE.DoesNotExist:
            return Response({"error": "UE introuvable"}, status=404)
        
    # nouvelle action pour récupérer les notes
    @action(detail=True, methods=["get"])
    def notes(self, request, pk=None):
        """
        Récupère toutes les évaluations d’une UE, les étudiants inscrits,
        et les notes correspondantes.
        """
        ue = self.get_object()

        # toutes les évaluations liées à cette UE (ex: devoir, examen, projet…)
        evaluations = Evaluation.objects.filter(ue=ue)

        # tous les étudiants inscrits à cette UE
        etudiants = Etudiant.objects.filter(inscriptions__ues=ue).distinct()

        # construire la réponse JSON
        data = {
            "evaluations": [
                {"id": ev.id, "type": ev.type, "poids": ev.poids}
                for ev in evaluations
            ],
            "etudiants": []
        }

        for etu in etudiants:
            notes_dict = {}
            for ev in evaluations:
                note_obj = Note.objects.filter(etudiant=etu, evaluation=ev).first()
                notes_dict[str(ev.id)] = note_obj.note if note_obj else None

            data["etudiants"].append({
                "id": etu.id,
                "nom": etu.utilisateur.last_name,
                "prenom": etu.utilisateur.first_name,
                "num_carte": etu.num_carte,
                "sexe": etu.utilisateur.sexe,
                "notes": notes_dict,
            })

        return Response(data)
        
    @action(detail=False, methods=['get'], url_path='filtrer')
    def filtrer(self, request):
        """
        Récupérer les UEs filtrées par parcours, filière et année d’étude.
        Exemple d’URL :
        GET /notes/ues/filtrer/?parcours=1&filiere=2&annee_etude=3
        """
        parcours_id = request.query_params.get('parcours')
        filiere_id = request.query_params.get('filiere')
        annee_id = request.query_params.get('annee_etude')

        queryset = UE.objects.all()

        if parcours_id:
            queryset = queryset.filter(parcours__id=parcours_id)
        if filiere_id:
            queryset = queryset.filter(filiere__id=filiere_id)
        if annee_id:
            queryset = queryset.filter(annee_etude__id=annee_id)

        serializer = UESerializer(queryset.distinct(), many=True)
        return Response(serializer.data)


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
    #permission_classes = [IsAdminOrRespNotesOnly]

    """  def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [IsResponsableNotes()]
        elif self.action == 'list':
            if hasattr(self.request.user, 'professeur'):
                return [IsProfesseur()]
            return [IsResponsableNotes()]
        return super().get_permissions()
    """