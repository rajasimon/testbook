from django.db import models

# Third party modules
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=220)
    address = models.TextField(null=True, blank=True)
    phone_number = PhoneNumberField()
