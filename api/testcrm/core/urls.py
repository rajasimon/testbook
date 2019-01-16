from django.urls import path, include

from rest_framework import routers

from testcrm.core import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'company', views.CompanyViewSet)

urlpatterns = [
    path('', include(router.urls))
]