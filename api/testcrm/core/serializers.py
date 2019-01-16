from django.contrib.auth.models import User

# Third party moduels 
from rest_framework import serializers

from testcrm.core.models import Company


# Serializer fro user ( accounts management )
class UserSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password']


class CompanySerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ['url', 'name', 'address', 'phone_number']
