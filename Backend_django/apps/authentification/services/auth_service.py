# apps/authentification/services/auth_service.py

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthService:
    
    @staticmethod
    def login(username, password):
        """
        Authentifie un utilisateur et retourne les tokens JWT
        """
        try:
            # Récupérer l'utilisateur
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return None

        # Vérifier le mot de passe
        authenticated_user = authenticate(username=username, password=password)
        if not authenticated_user:
            return None

        # Vérifier si le compte est actif
        if not user.is_active:
            return {
                'error': 'Compte désactivé',
                'code': 'ACCOUNT_DISABLED'
            }

        # Générer les tokens JWT
        refresh = RefreshToken.for_user(user)
        
        # Déterminer le profil de l'utilisateur
        profile_data = AuthService._get_user_profile(user)

        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role,
                'is_validated': user.is_validated,
                'profile': profile_data
            },
            'message': f"Bienvenue {user.first_name or user.username} !"
        }
    
    @staticmethod
    def _get_user_profile(user):
        """
        Récupère les données du profil spécifique selon le rôle
        """
        profile_data = {}
        
        if hasattr(user, 'etudiant'):
            profile_data = {
                'type': 'etudiant',
                'id': user.etudiant.id,
                'num_carte': user.etudiant.num_carte,
                'date_naiss': user.etudiant.date_naiss.isoformat() if user.etudiant.date_naiss else None,
                'lieu_naiss': user.etudiant.lieu_naiss,
            }
        elif hasattr(user, 'professeur'):
            profile_data = {
                'type': 'professeur',
                'id': user.professeur.id,
                'titre': user.professeur.titre,
                'bio': user.professeur.bio,
            }
        elif hasattr(user, 'secretaire'):
            profile_data = {
                'type': 'secretaire',
                'id': user.secretaire.id,
            }
        elif hasattr(user, 'resp_notes'):
            profile_data = {
                'type': 'resp_notes',
                'id': user.resp_notes.id,
            }
        elif hasattr(user, 'resp_inscription'):
            profile_data = {
                'type': 'resp_inscription',
                'id': user.resp_inscription.id,
            }
        elif hasattr(user, 'admin'):
            profile_data = {
                'type': 'admin',
                'id': user.admin.id,
            }
        
        return profile_data
    
    @staticmethod
    def register_user(user_data, role):
        """
        Crée un nouvel utilisateur avec le rôle spécifié
        """
        try:
            # Créer l'utilisateur de base
            password = user_data.pop('password')
            user = User.objects.create_user(**user_data)
            user.role = role
            user.save()
            
            return user
        except Exception as e:
            raise ValueError(f"Erreur lors de la création de l'utilisateur: {str(e)}")
    
    @staticmethod
    def get_user_permissions(user):
        """
        Retourne les permissions de l'utilisateur selon son rôle
        """
        permissions = {
            'can_read_users': False,
            'can_write_users': False,
            'can_read_notes': False,
            'can_write_notes': False,
            'can_read_inscriptions': False,
            'can_write_inscriptions': False,
            'is_admin': False,
        }
        
        if user.is_staff or hasattr(user, 'admin'):
            permissions.update({
                'can_read_users': True,
                'can_write_users': True,
                'can_read_notes': True,
                'can_write_notes': True,
                'can_read_inscriptions': True,
                'can_write_inscriptions': True,
                'is_admin': True,
            })
        elif hasattr(user, 'professeur'):
            permissions.update({
                'can_read_notes': True,
                'can_write_notes': True,
            })
        elif hasattr(user, 'resp_notes'):
            permissions.update({
                'can_read_notes': True,
                'can_write_notes': True,
                'can_read_users': True,
            })
        elif hasattr(user, 'resp_inscription'):
            permissions.update({
                'can_read_inscriptions': True,
                'can_write_inscriptions': True,
                'can_read_users': True,
            })
        elif hasattr(user, 'secretaire'):
            permissions.update({
                'can_read_users': True,
                'can_read_notes': True,
                'can_read_inscriptions': True,
            })
        elif hasattr(user, 'etudiant'):
            permissions.update({
                'can_read_notes': True,  # Ses propres notes
            })
        
        return permissions