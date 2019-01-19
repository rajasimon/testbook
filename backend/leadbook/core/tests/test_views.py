import json
from datetime import datetime, timedelta

from django.core.management import call_command
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

from leadbook.core.models import Profile
from leadbook.core.views import UserViewSet, activate_token
from leadbook.core.helper import generate_token


class UserViewSetTestCase(TestCase):
    def setUp(self):
        # Init rest_framework factory
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user('testuser', 'test@email.com')
        self.user.set_password('password')
        self.user.save()
        self.profile = Profile.objects.create(user=self.user)

    def test_get_users(self):
        request = self.factory.get('/users/', {})
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        
        self.assertEqual(response.status_code, 401)

    def test_post_users(self):
        # This users endpoint is protected so GET should throws 401
        request = self.factory.post(
            '/users/', 
            {
                'username': 'testuser',
                'email': 'test@email.com',
                'password': 'password'
            }
        )
        view = UserViewSet.as_view({'post': 'create'})
        response = view(request)
        response.render()

        self.assertEqual(response.content, b'{"username":["A user with that username already exists."]}')
        self.assertEqual(response.status_code, 400)
    
    def test_set_password(self):
        request = self.factory.post(
            '/users/{}/set_password/'.format(self.user.id), 
            {
                'old_password': 'password',
                'new_password': 'password123',
                'confirm_password': 'password123'
            }
        )
        view = UserViewSet.as_view({'post': 'set_password'})

        # Force authenticate user
        force_authenticate(request, user=self.user, token=self.user.auth_token)
        
        response = view(request, pk=self.user.id)
        response.render()
        
        self.assertEqual(response.content, b'{"status":"password set"}')
        self.assertEqual(response.status_code, 200)


class ActivateTokenTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user('testuser', 'test@email.com')
        self.user.set_password('password')
        self.user.save()

        self.profile = Profile.objects.create(user=self.user)        
        self.profile.token = generate_token()
        self.profile.key_expires = datetime.strftime(datetime.now() + timedelta(days=2), "%Y-%m-%d %H:%M:%S")
        self.profile.save()

    def test_activate_token(self):
        
        request = self.factory.get('/activate/<token>')
        response = activate_token(request, self.profile.token)

        self.assertEqual(response.status_code, 302)



class CustomAuthTokenTestCase(TestCase):
    def setUp(self):
        # Every test needs access to the request factory
        self.client = APIClient()

    def test_get(self):
        # Using the standard RequestFactory API to create a GET request
        response = self.client.get('/api-token-auth/')
        self.assertEqual(response.status_code, 405)

    def test_post(self):
        response = self.client.post(
            '/api-token-auth/', 
            {'username': 'testuser', 'password': 'password'}
        )
        self.assertEqual(response.status_code, 400)


class CompaniesTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create user instance
        user = User.objects.create(username='testuser', email='test@email.com')
        user.set_password('password')
        user.save()

        token = Token.objects.get(user__username='testuser')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_companies(self):
        response = self.client.get('/get-companies/')
        self.assertEqual(response.content, b'[]')

    def test_load_companies(self):
        call_command('loaddata', 'leadbook/core/fixtures/companies.json', verbosity=0)

        response = self.client.get('/get-companies/')

        with open('leadbook/core/fixtures/companies.json') as data_file:
            data = json.loads(data_file.read())
            self.assertEqual(len(response.json()), len(data))


class FavoriteTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create user instance
        self.user = User.objects.create(username='testuser', email='test@email.com')
        self.user.set_password('password')
        self.user.save()

        # Create profile instance
        self.profile = Profile.objects.create(user=self.user)        
        self.profile.token = generate_token()
        self.profile.key_expires = datetime.strftime(datetime.now() + timedelta(days=2), "%Y-%m-%d %H:%M:%S")
        self.profile.save()

        # Create company entries
        from django.core.management import call_command
        call_command('loaddata', 'leadbook/core/fixtures/companies.json', verbosity=0)

        # Create token for login purpose
        token = Token.objects.get(user__username='testuser')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)


    def test_set_favorite(self):
        response = self.client.post('/set-favorite/', {'id': 1})
        self.assertEqual(response.json(), {'favorite': True})

    def test_delete_favorite(self):
        response = self.client.post('/delete-favorite/', {'id': 1})
        self.assertEqual(response.json(), {'favorite': False})
