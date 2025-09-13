
# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from apps.inscription_pedagogique.models import AnneeAcademique, AnneeEtude, Filiere, Parcours, Etablissement, Departement, Inscription, PeriodeInscription, Semestre 
from apps.inscription_pedagogique.serializers import AnneeAcademiqueSerializer, AnneeEtudeSerializer, FiliereSerializer,  ParcoursSerializer, EtablissementSerializer, DepartementSerializer, InscriptionSerializer, PeriodeInscriptionSerializer, SemestreSerializer
from django_filters.rest_framework import DjangoFilterBackend

class AnneeAcademiqueViewSet(viewsets.ModelViewSet):
    queryset = AnneeAcademique.objects.all().order_by('libelle')
    serializer_class = AnneeAcademiqueSerializer

class SemestreViewSet(viewsets.ModelViewSet):
    queryset = Semestre.objects.all()
    serializer_class = SemestreSerializer

class AnneeEtudeViewSet(viewsets.ModelViewSet):
    queryset = AnneeEtude.objects.all()
    serializer_class = AnneeEtudeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['parcours']

class FiliereViewSet(viewsets.ModelViewSet):
    queryset = Filiere.objects.all()
    serializer_class = FiliereSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['departement', 'parcours']

class ParcoursViewSet(viewsets.ModelViewSet):
    queryset = Parcours.objects.all()
    serializer_class = ParcoursSerializer

class EtablissementViewSet(viewsets.ModelViewSet):
    queryset = Etablissement.objects.all()
    serializer_class = EtablissementSerializer

class DepartementViewSet(viewsets.ModelViewSet):
    queryset = Departement.objects.all()
    serializer_class = DepartementSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['etablissement']

class InscriptionViewSet(viewsets.ModelViewSet):
    queryset = Inscription.objects.all()
    serializer_class = InscriptionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['etudiant', 'parcours', 'filiere', 'annee_etude', 'anneeAcademique']

class PeriodeInscriptionViewSet(viewsets.ModelViewSet):
    queryset = PeriodeInscription.objects.all()
    serializer_class = PeriodeInscriptionSerializer