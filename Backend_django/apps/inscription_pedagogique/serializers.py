
from rest_framework import serializers
from .models import AnneeAcademique, AnneeEtude, Filiere, Parcours, Etablissement, Departement, Inscription, PeriodeInscription

class AnneeAcademiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnneeAcademique
        fields = '__all__'

class AnneeEtudeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnneeEtude
        fields = '__all__'

class FiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiere
        fields = '__all__'

class ParcoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcours
        fields = '__all__'

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = '__all__'

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = '__all__'

class InscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscription
        fields = '__all__'

class PeriodeInscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodeInscription
        fields = '__all__'
