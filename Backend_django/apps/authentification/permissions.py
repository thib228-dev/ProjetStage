
from rest_framework.permissions import BasePermission

class IsIntranet(BasePermission):
    def has_permission(self, request, view):
        ip = request.META.get('REMOTE_ADDR')
        return ip.startswith('192.168.') or ip.startswith('10.')

class IsValidated(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_validated

class IsProfesseur(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'professeur')

class IsEtudiant(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'etudiant')
