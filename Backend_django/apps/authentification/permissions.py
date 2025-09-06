# apps/authentification/permissions.py

from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework import permissions


class IsIntranet(BasePermission):
    """Vérifie si la requête provient de l'intranet"""
    def has_permission(self, request, view):
        ip = request.META.get('REMOTE_ADDR', '')
        return ip.startswith('192.168.') or ip.startswith('10.') or ip.startswith('127.0.0.1')
        

class IsValidated(BasePermission):
    """Vérifie si l'utilisateur est validé"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.is_validated
        )
        

class IsProfesseur(BasePermission):
    """Vérifie si l'utilisateur est un professeur"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'professeur')
        )


class IsResponsableNotes(BasePermission):
    """Vérifie si l'utilisateur est responsable des notes"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'resp_notes')
        )


class IsEtudiant(BasePermission):
    """Vérifie si l'utilisateur est un étudiant"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'etudiant')
        )
    

class IsAdminOrReadOnly(BasePermission):
    """Lecture pour tous, écriture pour les admins uniquement"""
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class IsSelfOrAdmin(BasePermission):
    """L'utilisateur ne peut modifier que ses propres données ou être admin"""
    def has_object_permission(self, request, view, obj):
        return request.user == obj or request.user.is_staff


class IsOwnerOrReadOnlyForProf(BasePermission):
    """
    Lecture autorisée à tous les utilisateurs authentifiés.
    Écriture autorisée seulement au professeur propriétaire.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        # Vérifier si l'utilisateur est le professeur propriétaire
        return (
            hasattr(request.user, 'professeur') and 
            hasattr(obj, 'professeur') and 
            obj.professeur == request.user.professeur
        )
    

class IsProfOrSecretaire(BasePermission):
    """
    Lecture autorisée à tous.
    Modification autorisée au professeur ou à la secrétaire.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        return (
            (hasattr(user, 'professeur') and 
             hasattr(obj, 'evaluation') and 
             hasattr(obj.evaluation, 'ue') and
             obj.evaluation.ue.affectations.filter(professeur=user.professeur).exists()) or
            hasattr(user, 'secretaire')
        )
        

class IsAdminOrRespNotesOnly(BasePermission):
    """
    Lecture pour tous les utilisateurs authentifiés.
    Écriture réservée à admin ou responsable des notes.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
            
        if request.method in SAFE_METHODS:
            return True

        return (
            request.user.is_staff or 
            hasattr(request.user, 'resp_notes')
        )


class IsRespInscription(BasePermission):
    """Vérifie si l'utilisateur est responsable des inscriptions"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'resp_inscription')
        )


class IsSecretaire(BasePermission):
    """Vérifie si l'utilisateur est secrétaire"""
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            hasattr(request.user, 'secretaire')
        )