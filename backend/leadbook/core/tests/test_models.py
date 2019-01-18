from datetime import datetime, timedelta

from django.test import TestCase
from django.contrib.auth.models import User

from leadbook.core.models import Profile, Company
from leadbook.core.helper import generate_token


# Create your tests here.
class ProfileDatabaseTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('testuser', 'test@email.com' 'password')
        self.profile = Profile.objects.create(user=self.user)

    def test_profile_token(self):
        self.profile.token = generate_token()
        self.profile.key_expires = datetime.strftime(datetime.now() + timedelta(days=2), "%Y-%m-%d %H:%M:%S")
        self.profile.save()

        self.assertEqual(self.user.id, self.profile.user_id)

    def test_rest_framework_token(self):
        # Rest framework creates the token when new user created.
        from rest_framework.authtoken.models import Token
        token = Token.objects.get(user=self.user)
        self.assertEqual(len(token.key), 40)


class CompanyDatabaseTestCase(TestCase):
    def setUp(self):
        self.leadbook = Company.objects.create(name='LeadBook')
        self.visteon = Company.objects.create(name='Visteon')

        # Adding address to leadbook company instance
        self.leadbook.address = 'Singapore'
        self.leadbook.save()

        # Adding address to visteon company instance
        self.visteon.address = 'Olympia Tech Park, Chennai'
        self.visteon.save()

    def test_company_name(self):
        leadbook_obj = Company.objects.get(name='LeadBook')
        visteon_obj = Company.objects.get(name='Visteon')

        self.assertEqual(leadbook_obj.name, 'LeadBook')
        self.assertEqual(visteon_obj.name, 'Visteon')

    def test_update_company_address(self):
        self.assertEqual(self.leadbook.address, 'Singapore')
        self.assertEqual(self.visteon.address, 'Olympia Tech Park, Chennai')
