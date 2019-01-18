import datetime

from django.contrib.auth.models import User

# Third party package / modules imports 
from rest_framework import serializers

from leadbook.core.models import Profile, Company
from leadbook.core.helper import generate_token, send_activation_email


# Serializer fro user ( accounts management )
class UserSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()

        # After creating the inactive user create profile object
        profile, created = Profile.objects.get_or_create(user=user)
        profile.activation_key = generate_token()
        profile.key_expires = datetime.datetime.strftime(datetime.datetime.now() + datetime.timedelta(days=2), "%Y-%m-%d %H:%M:%S")
        profile.save()

        # Time to send email
        self.activate(profile)
        return user

    def activate(self, profile):
        send_activation_email(profile)


class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)


class CompanySerializers(serializers.BaseSerializer):
    def to_representation(self, obj):
        user_id = self.context.get('user_id')

        favorites = [] 
        for company in self.instance.all():
            favorite = {}
            favorite['id'] = company.id
            favorite['name'] = company.name
            favorite['address'] = company.address
            profile = company.profile_set.filter(user_id=user_id).first()
            if profile:
                favorite['favorite'] = True
            else:
                favorite['favorite'] = False

            favorites.append(favorite)
        return favorites
