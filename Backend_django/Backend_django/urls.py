"""
URL configuration for Backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Backend_django/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Administration Django
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/auth/', include('apps.authentification.urls')),
    path('api/utilisateurs/', include('apps.utilisateurs.urls')),
    path('api/inscription/', include('apps.inscription_pedagogique.urls')),
    path('api/notes/', include('apps.page_professeur.urls')),
    
    # JWT Token refresh (endpoint séparé pour plus de clarté)
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Servir les fichiers media en développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)