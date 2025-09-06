#!/bin/bash

# Script de nettoyage et migration pour le projet Django

echo "🚀 Début du nettoyage et de la migration..."

# 1. Supprimer les fichiers de migration en conflit
echo "📝 Suppression des migrations en conflit..."
rm -f Backend_django/apps/utilisateurs/migrations/0003_remove_etudiant_adresse_remove_etudiant_quartier.py

# 2. Supprimer les fichiers .pyc et __pycache__
echo "🧹 Nettoyage des fichiers cache Python..."
find . -name "*.pyc" -delete
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null

# 3. Réinitialiser les migrations (optionnel - à faire avec précaution)
# echo "🔄 Réinitialisation des migrations..."
# rm -rf Backend_django/apps/*/migrations/0*.py
# python Backend_django/manage.py makemigrations utilisateurs
# python Backend_django/manage.py makemigrations page_professeur
# python Backend_django/manage.py makemigrations inscription_pedagogique
# python Backend_django/manage.py makemigrations authentification

# 4. Créer les nouvelles migrations
echo "📋 Création des nouvelles migrations..."
cd Backend_django
python manage.py makemigrations

# 5. Appliquer les migrations
echo "⚙️ Application des migrations..."
python manage.py migrate

# 6. Collecter les fichiers statiques
echo "📦 Collecte des fichiers statiques..."
python manage.py collectstatic --noinput

# 7. Créer le superutilisateur (si configuré dans .env)
echo "👤 Création du superutilisateur..."
python manage.py shell -c "
import os
from django.contrib.auth import get_user_model
from decouple import config

User = get_user_model()
username = config('DJANGO_SUPERUSER_USERNAME', default='admin')
email = config('DJANGO_SUPERUSER_EMAIL', default='admin@example.com')
password = config('DJANGO_SUPERUSER_PASSWORD', default='admin123')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password, role='admin')
    print(f'Superuser {username} créé avec succès')
else:
    print(f'Superuser {username} existe déjà')
"

# 8. Vérifier la configuration
echo "✅ Vérification de la configuration..."
python manage.py check

echo "🎉 Migration et nettoyage terminés avec succès!"
echo ""
echo "📌 N'oubliez pas de :"
echo "   1. Créer votre fichier .env avec les bonnes valeurs"
echo "   2. Configurer votre base de données PostgreSQL"
echo "   3. Installer les dépendances : pip install -r requirements.txt"
echo ""
echo "🚀 Vous pouvez maintenant démarrer le serveur : python manage.py runserver"