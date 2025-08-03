from rest_framework.views import APIView
from rest_framework.response import Response
from apps.inscription_pedagogique.models import Inscription
from apps.utilisateurs.models import Etudiant
from apps.utilisateurs.serializers import EtudiantSerializer
from rest_framework.permissions import IsAuthenticated

class FiltrerEtudiantsAPIView(APIView):
    def get(self, request):
        queryset = Etudiant.objects.all()
        
        departement = request.query_params.get('departement')
        filiere = request.query_params.get('filiere')
        parcours = request.query_params.get('parcours')
        annee_etude = request.query_params.get('annee_etude')
        annee_scolaire = request.query_params.get('annee_scolaire')

        if departement and departement.lower() != 'tout':
            queryset = queryset.filter(departement__id=departement)

        if filiere and filiere.lower() != 'tout':
            queryset = queryset.filter(filiere__id=filiere)

        if parcours and parcours.lower() != 'tout':
            queryset = queryset.filter(parcours__id=parcours)

        if annee_etude and annee_etude.lower() != 'tout':
            queryset = queryset.filter(annee_etude=annee_etude)

        if annee_scolaire and annee_scolaire.lower() != 'tout':
            queryset = queryset.filter(annee_scolaire=annee_scolaire)

        serializer = EtudiantSerializer(queryset, many=True)
        return Response(serializer.data)

# Liste des étudiants inscrits à une UE spécifique
class EtudiantsParUEView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ue_id):
        # Toutes les inscriptions contenant cette UE
        inscriptions = Inscription.objects.filter(ues__id=ue_id)
        if not inscriptions.exists():
            return Response({"detail": "Aucune inscription trouvée pour cette UE."}, status=404)
        # Extraire les étudiants à partir des inscriptions
        etudiants = Etudiant.objects.filter(id__in=inscriptions.values_list('etudiant_id', flat=True))

        serializer = EtudiantSerializer(etudiants, many=True)
        return Response(serializer.data)