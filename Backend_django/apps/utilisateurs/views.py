from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from ..utilisateurs.models import (
    Professeur, Etudiant,
    RespInscription, ResponsableSaisieNote, Secretaire
)
from apps.utilisateurs.serializers import (
    ProfesseurSerializer, EtudiantSerializer,
    RespInscriptionSerializer, ResponsableSaisieNoteSerializer, SecretaireSerializer
)
from apps.authentification.permissions import IsIntranet, IsSelfOrAdmin, IsAdminOrReadOnly

from apps.utilisateurs.models import Utilisateur, Administrateur, Connexion
from apps.utilisateurs.serializers import (
    UtilisateurSerializer,
    AdministrateurSerializer,
    ConnexionSerializer
)
from apps.page_professeur.serializers import UESerializer

# ----- UTILISATEUR DE BASE -----
class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all().order_by('last_name')
    serializer_class = UtilisateurSerializer
    #permission_classes = [IsAdminUser]  # Seul admin peut voir/lister tous les utilisateurs
   
    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """/me/ : Voir ou modifier ses propres infos"""
        utilisateur = request.user
        serializer = self.get_serializer(utilisateur, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)
        

# ----- ETUDIANT -----
class EtudiantViewSet(viewsets.ModelViewSet):
    queryset = Etudiant.objects.all().order_by('utilisateur__last_name')
    serializer_class = EtudiantSerializer
   # permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_etudiant:
            return Etudiant.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], 
    permission_classes=[IsAuthenticated])
    def me(self, request):
        instance = request.user.etudiant
        serializer = self.get_serializer(instance, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)


# ----- PROFESSEUR -----
class ProfesseurViewSet(viewsets.ModelViewSet):
    queryset = Professeur.objects.all().order_by('utilisateur__last_name')
    serializer_class = ProfesseurSerializer
    permission_classes = [IsAdminOrReadOnly]
   
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_professeur:
            return Professeur.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        instance = request.user.professeur
        serializer = self.get_serializer(instance, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)
    
    
    """  @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def ues(self, request, pk=None):
        professeur = self.get_object()
        affectations = professeur.affectations.all()
        ues = [aff.ue for aff in affectations]
        serializer = UESerializer(ues, many=True)
        return Response(serializer.data) """
    
    @action(detail=False, methods=['get'])
    def mes_ues(self, request):
        professeur = request.user.professeur 
        affectations = professeur.affectations.all()
        ues = [aff.ue for aff in affectations]
        serializer = UESerializer(ues, many=True)
        return Response(serializer.data)


# ----- SECRETAIRE -----
class SecretaireViewSet(viewsets.ModelViewSet):
    queryset = Secretaire.objects.all().order_by('utilisateur__last_name')
    serializer_class = SecretaireSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_secretaire:
            return Secretaire.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        instance = request.user.secretaire
        serializer = self.get_serializer(instance, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)


# ----- RESPONSABLE INSCRIPTION -----
class RespInscriptionViewSet(viewsets.ModelViewSet):
    queryset = RespInscription.objects.all().order_by('utilisateur__last_name')
    serializer_class = RespInscriptionSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_resp_inscription:
            return RespInscription.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        instance = request.user.resp_inscription
        serializer = self.get_serializer(instance, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)


# ----- RESPONSABLE SAISIE NOTES -----
class ResponsableSaisieNoteViewSet(viewsets.ModelViewSet):
    queryset = ResponsableSaisieNote.objects.all().order_by('utilisateur__last_name')
    serializer_class = ResponsableSaisieNoteSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_resp_notes:
            return ResponsableSaisieNote.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        instance = request.user.resp_notes
        serializer = self.get_serializer(instance, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)
    
# ----- ADMINISTRATEUR -----
class AdministrateurViewSet(viewsets.ModelViewSet):
    queryset = Administrateur.objects.all().order_by('utilisateur__last_name')
    serializer_class = AdministrateurSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_admin_personnalise:
            return Administrateur.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], permission_classes=[IsAuthenticated])
    def me(self, request):
        instance = request.user.admin
        serializer = self.get_serializer(instance, data=request.data if request.method == 'PUT' else None, partial=True)
        if serializer.is_valid():
            serializer.save()
        elif request.method == 'PUT':
            return Response(serializer.errors, status=400)
        return Response(serializer.data)
    
class ConnexionViewSet(viewsets.ModelViewSet):
    """
     Vue pour consulter les connexions des utilisateurs.
    - Les admins peuvent voir toutes les connexions.
    - Un utilisateur ne voit que ses propres connexions.
    """
    queryset = Connexion.objects.all().order_by('-date_connexion') # Trier par date de connexion décroissante 
    serializer_class = ConnexionSerializer
    permission_classes = [IsIntranet, IsAdminUser]
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Connexion.objects.all()
        return Connexion.objects.filter(utilisateur=user)
        