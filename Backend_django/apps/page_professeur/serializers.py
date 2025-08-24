
from rest_framework import serializers
from .models import UE, AffectationUe, Evaluation, Note, Projet, Recherche, Article, Encadrement,  PeriodeSaisie
from ..inscription_pedagogique.models import Inscription, Parcours, Filiere, AnneeEtude, Semestre
from django.utils import timezone



class UESerializer(serializers.ModelSerializer):
    evaluations = serializers.PrimaryKeyRelatedField(queryset=Evaluation.objects.all(), many=True, required=False) 
    parcours = serializers.PrimaryKeyRelatedField(queryset=Parcours.objects.all(), many=True, required=True)
    filiere = serializers.PrimaryKeyRelatedField(queryset=Filiere.objects.all(), many=True, required=True)
    annee_etude = serializers.PrimaryKeyRelatedField(queryset=AnneeEtude.objects.all(), many=True, required=True)
    semestre = serializers.PrimaryKeyRelatedField(queryset=Semestre.objects.all(), required=True)
    class Meta:
        model = UE
        fields = ['id', 'libelle', 'code', 'nbre_credit', 'composite','evaluations', 'parcours', 'filiere', 'annee_etude','semestre']
        required_fields = ['libelle', 'code', 'nbre_credit', 'composite', 'parcours', 'filiere', 'annee_etude','semestre']
    

class EvaluationSerializer(serializers.ModelSerializer):
   # écriture → on envoie ue
    ue = serializers.PrimaryKeyRelatedField(
        queryset=UE.objects.all(),
        write_only=True
    )

    # lecture → on affiche les infos de l’UE
    ue_obj = UESerializer(read_only=True)

    class Meta:
        model = Evaluation
        fields = ["id", "type", "poids", "ue", "ue_obj"]
        required_fields = ['type', 'poids', 'ue']
    def create(self, validated_data):
        user = self.context['request'].user
        if not hasattr(user, 'professeur'):
            raise serializers.ValidationError("Seuls les professeurs peuvent créer une évaluation.")

        ue = validated_data.get('ue')
        if ue.professeur != user.professeur:
            raise serializers.ValidationError("Vous ne pouvez créer une évaluation que pour vos propres UE.")

        validated_data['professeur'] = user.professeur
        return Evaluation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for field in ['titre', 'date', 'ponderation', 'ue']:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        required_fields = ['etudiant', 'evaluation', 'note']
        
    def create(self, validated_data):
        user = self.context['request'].user
        if not hasattr(user, 'professeur'):
            raise serializers.ValidationError("Seuls les professeurs peuvent saisir une note.")

        #evaluation = validated_data.get('evaluation')
        #if evaluation.ue.professeur != user.professeur:
        #    raise serializers.ValidationError("Vous ne pouvez saisir une note que pour vos propres évaluations.")
        return Note.objects.create(**validated_data)

    def update(self, instance, validated_data):
        field = ['note']
        setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance


class ProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['request'].user
        if not hasattr(user, 'professeur'):
            raise serializers.ValidationError("Seuls les professeurs peuvent créer un projet.")

        validated_data['professeur_encadrant'] = user.professeur
        return Projet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for field in ['titre', 'resume', 'date_debut', 'date_fin']:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance

class RechercheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recherche
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['request'].user
        if not hasattr(user, 'professeur'):
            raise serializers.ValidationError("Seuls les professeurs peuvent créer une recherche.")

        validated_data['chercheur'] = user.professeur
        return Recherche.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for field in ['titre', 'resume', 'date_publication']:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class EncadrementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encadrement
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['request'].user
        if not hasattr(user, 'professeur'):
            raise serializers.ValidationError("Seuls les professeurs peuvent encadrer.")

        validated_data['professeur'] = user.professeur
        return Encadrement.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for field in ['etudiant', 'projet', 'commentaire']:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        instance.save()
        return instance


class PeriodeSaisieSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodeSaisie
        fields = '__all__'
        read_only_fields = ['responsable', 'active']  # le backend gère active automatiquement

    def validate(self, data):
        if data['date_debut'] >= data['date_fin']:
            raise serializers.ValidationError("La date de début doit être avant la date de fin.")
        if data['date_debut'] < timezone.now().date():
            raise serializers.ValidationError("La date de début ne peut pas être dans le passé.")
        return data
    
class AffectationUeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AffectationUe
        fields = '__all__'
