from django.urls import path
from .views import etudiant_login

urlpatterns = [
     path('etudiant', etudiant_login, name='etudiant_login'),
]
