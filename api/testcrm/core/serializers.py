from django.contrib.auth.models import User

# Third party moduels 
from rest_framework import serializers

from testcrm.core.models import Company


# Serializer fro user ( accounts management )
class UserSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password']

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save
        return user


class CompanySerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        fields = ['url', 'name', 'address', 'phone_number']
