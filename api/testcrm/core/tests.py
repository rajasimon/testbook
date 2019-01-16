from django.test import TestCase

from rest_framework.test import APIClient, APIRequestFactory

from testcrm.core.models import Company
from testcrm.core.views import UserViewSet, CompanyViewSet


# Create your tests here.
class CompanyDatabaseTestCase(TestCase):
    def setUp(self):
        Company.objects.create(name='LeadBook')
        Company.objects.create(name='Visteon')

    def test_company_name(self):
        leadbook_obj = Company.objects.get(name='LeadBook')
        visteon_obj = Company.objects.get(name='Visteon')

        self.assertEqual(leadbook_obj.name, 'LeadBook')
        self.assertEqual(visteon_obj.name, 'Visteon')


class CompanySimpleTestCase(TestCase):
    def setUp(self):
        # Every test needs access to the request factory
        self.client = APIClient()

    def test_home(self):
        # Using the standard RequestFactory API to create a GET request
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)


class CompanyFactoryTestCase(TestCase):
    def setUp(self):
        # Every test needs access to the request factory
        self.factory = APIRequestFactory()

    def test_users(self):
        # Create a GET request
        request = self.factory.get('/users/', {})

        # View function for users endpoint
        view = CompanyViewSet.as_view({'get': 'list'})

        # GET response from view
        response = view(request)

        self.assertEqual(response.status_code, 200)


