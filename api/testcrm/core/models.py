from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.authtoken.models import Token

# Third party modules
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=220)
    address = models.TextField(null=True, blank=True)
    phone_number = PhoneNumberField()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
