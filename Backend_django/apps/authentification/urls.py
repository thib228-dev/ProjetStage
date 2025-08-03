
from django.urls import path
from .views import StudentRegisterView, LoginView

urlpatterns = [
    path('register/', StudentRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
