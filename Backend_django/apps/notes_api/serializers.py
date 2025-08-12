from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    ueNom = serializers.CharField(source='ue.nom')  # jointure UE

    class Meta:
        model = Note
        fields = ['id', 'etudiant_id', 'ue_id', 'ueNom', 'valeur', 'session', 'semestre']
