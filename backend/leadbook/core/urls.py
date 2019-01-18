from django.urls import path, include

from rest_framework import routers

from leadbook.core import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', views.CustomAuthToken.as_view()),
    path('activate/<token>', views.activate_token),
    path('get-companies/', views.get_companies),
    path('search-companies/', views.search_companies),
    path('get-favorites/', views.get_favorites),
    path('set-favorite/', views.set_favorite),
    path('delete-favorite/', views.delete_favorite)
]