from django.contrib.auth.models import User
from django.http import HttpResponseRedirect

from rest_framework import viewsets, status, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, action

from backend.core.models import Profile, Company
from backend.core.serializers import UserSerializers, CompanySerializers, PasswordSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def send_activation_email(self, request, pk=None):
        user = self.get_object()
        serializer = self.serializer_class(data=request.data)
        serializer.send_activation_email(user.profile)
        return Response({'success': 'New confirmation mail sent successfully'})

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            # Check old password
            if not user.check_password(serializer.data.get('old_password')):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            new_password = serializer.data.get('new_password')
            confirm_password = serializer.data.get('confirm_password')

            if not new_password == confirm_password:
                return Response(
                    {
                        "new_password": ["New Password Mismatch with Confirm Password."],
                        "confirm_password": ["Confirm Password mismatch with New Password"]
                    }, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'status': 'password set'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def activate_token(request, token):
    try:
        profile = Profile.objects.get(activation_key=token)
        profile.user.is_active = True
        profile.user.save()
    except Profile.DoesNotExist:
        profile = None

    if profile:
        return HttpResponseRedirect('http://localhost:3000/activation/success')
    else:
        return HttpResponseRedirect('http://localhost:3000/activation/failed')


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, 
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        else:
            return Response({
                'status': False,
                'message': 'Please validate your email address.'
            })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_companies(request):
    companies = Company.objects.all()
    context={'user_id': request.user.id}
    serializer = CompanySerializers(companies, context=context)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_companies(request):
    companies = Company.objects.all()
    context={'user_id': request.user.id}
    serializer = CompanySerializers(companies, context=context)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    companies = request.user.profile.companies.all()
    context = {'user_id': request.user.id}
    serializer = CompanySerializers(companies, context=context)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_favorite(request):
    company_id = request.data.get('id')
    company = Company.objects.get(id=company_id)

    request.user.profile.companies.add(company)
    return Response({'favorite': True})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_favorite(request):
    company_id = request.data.get('id')
    company = Company.objects.get(id=company_id)

    request.user.profile.companies.remove(company)
    return Response({'favorite': False})