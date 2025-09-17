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
    pagination_class = None

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
    pagination_class = None
    # permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_etudiant:
            return Etudiant.objects.filter(utilisateur=user)
        return super().get_queryset()

    @action(detail=False, methods=['get', 'put'], 
        permission_classes=[IsAuthenticated])
    def me(self, request):
        """Endpoint pour récupérer/modifier le profil de l'étudiant connecté"""
        try:
            instance = request.user.etudiant
            
            if request.method == 'GET':
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
                
            elif request.method == 'PUT':
                # Séparer les données utilisateur et étudiant
                data = request.data.copy()
                utilisateur_data = {}
                etudiant_data = {}
                
                # Champs utilisateur modifiables
                modifiable_user_fields = ['email', 'telephone', 'first_name', 'last_name']
                for field in modifiable_user_fields:
                    if field in data:
                        utilisateur_data[field] = data.pop(field)
                
                # Champs étudiant modifiables (limités)
                modifiable_etudiant_fields = ['autre_prenom', 'photo']
                for field in modifiable_etudiant_fields:
                    if field in data:
                        etudiant_data[field] = data[field]
                
                # Mise à jour utilisateur
                if utilisateur_data:
                    for attr, value in utilisateur_data.items():
                        setattr(instance.utilisateur, attr, value)
                    instance.utilisateur.save()
                
                # Mise à jour étudiant
                if etudiant_data:
                    for attr, value in etudiant_data.items():
                        setattr(instance, attr, value)
                    instance.save()
                
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
                
        except Etudiant.DoesNotExist:
            return Response({"error": "Profil étudiant non trouvé"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
    
    
    # ----- PROFESSEUR -----
class ProfesseurViewSet(viewsets.ModelViewSet):
    queryset = Professeur.objects.all().order_by('utilisateur__last_name')
    serializer_class = ProfesseurSerializer
    #permission_classes = [IsAdminOrReadOnly]
   
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
        
    #Recuperation des UEs d'un professeur donné (par id)
    @action(detail=True, methods=['get'], url_path='ues-prof')
    def mes_ues_id(self, request, pk=None):
        professeur = self.get_object()
        affectations = professeur.affectations.all()
        ues = [aff.ue for aff in affectations]
        serializer = UESerializer(ues, many=True)
        return Response(serializer.data)
    
    #Recuperation des UEs d'un professeur connecté
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
        