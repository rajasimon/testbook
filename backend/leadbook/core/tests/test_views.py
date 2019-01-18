from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

from leadbook.core.models import Profile
from leadbook.core.views import UserViewSet


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


# class CompanySimpleTestCase(TestCase):
#     def setUp(self):
#         # Every test needs access to the request factory
#         self.client = APIClient()

#     def test_home(self):
#         # Using the standard RequestFactory API to create a GET request
#         response = self.client.get('/')
#         self.assertEqual(response.status_code, 200)


# class CompanyFactoryTestCase(TestCase):
#     def setUp(self):
#         # Every test needs access to the request factory
#         self.factory = APIRequestFactory()

#     def test_users(self):
#         # Create a GET request
#         request = self.factory.get('/users/', {})

#         # View function for users endpoint
#         view = CompanyViewSet.as_view({'get': 'list'})

#         # GET response from view
#         response = view(request)

#         self.assertEqual(response.status_code, 200)


