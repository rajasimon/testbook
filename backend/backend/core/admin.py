from django.contrib import admin

# Register your models here.
from backend.core.models import Profile, Company

admin.site.register(Profile)
admin.site.register(Company)
