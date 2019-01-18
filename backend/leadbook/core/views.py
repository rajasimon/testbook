"""
Leadbook django project view functions. 

This file contains all the view functions to run leadbook. All the resources 
mentioned in urls will access this file to get the view functions.
"""
# Third party packages / modules imports
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from rest_framework import viewsets, status, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, action

# Leadbook project level imports
from leadbook.core.models import Profile, Company
from leadbook.core.serializers import UserSerializers, CompanySerializers, PasswordSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    Users Rest API resource view function. Responsible for create, update
    user related actions.

    Create a new user instance.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializers
    http_method_names = ['post']

    def get_permissions(self):
        """
        Leadbook project using project level restriction to use the Rest API 
        endpoint so creating the new user requires lifting this permission and 
        grant anyone to access `create` aka POST method.
        """
        # Condition to check the action level and set desired permission_class
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        
        # Finally return the all the permissions
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        """
        post:
        User can change the password by supplying old and new password. This
        function accepts POST method and expect 3 data from the user

        old_password
        new_password
        confirm_password

        Also responsible for error cased where new and confirm password mismatches
        and old password is wrong. 

        Note: Protected resource and client must pass token in the header. 
        """
        # 
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not user.check_password(serializer.data.get('old_password')):
                return Response(
                    {
                        "old_password": ["Wrong password."]
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
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
    """
    After successfull user creation still user need to validate the account using
    verification link which sends to their mail earlier. Upon successful activation
    user needs to navigate to frontend. Accept token as parament and redirect the user to frontend.
    """
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
    """
    post:
    Generate custom auth token for clients to access protected resources.
    """

    def post(self, request, *args, **kwargs):
        """
        Return token along with email and user_id.
        """
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
    """
    Return all the companies. Since this is protected resource client must 
    submit token in the header to access this resource. So using the user_id to 
    add favorite in the result.
    """
    companies = Company.objects.all()
    context={'user_id': request.user.id}
    serializer = CompanySerializers(companies, context=context)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_companies(request):
    """
    Search companies by providing search argument in the POST method.
    """
    search = request.data.get('search', None)
    if search:
        companies = Company.objects.filter(name__search=search)
    else:
        companies = Company.objects.all()
        
    context={'user_id': request.user.id}
    serializer = CompanySerializers(companies, context=context)
    print(search)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    """
    Return all the associated companies for this user.
    """
    companies = request.user.profile.companies.all()
    context = {'user_id': request.user.id}
    serializer = CompanySerializers(companies, context=context)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_favorite(request):
    """
    Add company object to companies in profile.
    """
    company_id = request.data.get('id')
    company = Company.objects.get(id=company_id)

    request.user.profile.companies.add(company)
    return Response({'favorite': True})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_favorite(request):
    """
    Remove company object from the profile companies.
    """
    company_id = request.data.get('id')
    company = Company.objects.get(id=company_id)

    request.user.profile.companies.remove(company)
    return Response({'favorite': False})
