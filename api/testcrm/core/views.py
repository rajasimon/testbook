from django.contrib.auth.models import User

from testcrm.core.serializers import UserSerializers, CompanySerializers
from rest_framework import viewsets

from testcrm.core.models import Company


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializers
