from django.contrib import admin

# Register your models here.
from .models import UE, Evaluation, Note, Projet, Recherche, Article, Encadrement
admin.site.register(UE)
admin.site.register(Evaluation)
admin.site.register(Note)
admin.site.register(Projet)
admin.site.register(Recherche)
admin.site.register(Article)
admin.site.register(Encadrement)
