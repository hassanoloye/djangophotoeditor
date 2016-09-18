from api_v1.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response


class RegisterView(ObtainAuthToken):

    """
    Returns a generated token
    """

    def post(self, request):
        """
        Returns token for a registered user
        ---
        parameters:
            - name: email
              description: email to register
              required: true
              type: string
              paramType: form
            - name: username
              description: username to register
              required: true
              type: string
              paramType: form
            - name: password
              description: password to register
              required: true
              type: string
              paramType: form
            - name: confirm_password
              description: confirmation password for user
              required: true
              type: string
              paramType: form
        """
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if not username:
            return Response({'message':
                             'Username not provided.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if len(username) < 6:
            return Response({'message':
                             'Username is too short '
                             '(Minimum is 6 characters)'},
                            status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({'message':
                             'Password not provided.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if not confirm_password:
            return Response({'message':
                             'Please confirm your password.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if len(password) < 6 or len(confirm_password) < 6:
            return Response({'message':
                             'Password is too short '
                             '(Minimum is 6 characters)'},
                            status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({'message': 'The passwords do not match'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username):
            return Response({'message':
                             'Username already exist.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if not email:
            return Response({'message':
                             'Email not provided.'},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            User.objects.create_user(username=username, password=password,
                                     email=email)
            return super(RegisterView, self).post(request)
        else:
            return Response({'message':
                             'Unable to register. Plese ensure '
                             'you provide a valid email'},
                            status=status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):

    """
    Returns a generated token
    """

    def post(self, request):
        """
        Returns token for a logged in user
        ---
        parameters:
            - name: username
              description: username used to register
              required: true
              type: string
              paramType: form
            - name: password
              description: secret password
              required: true
              type: string
              paramType: form
        """
        username, password = request.data.get(
            'username'), request.data.get('password')
        if not username:
            return Response({'message':
                             'Username not provided.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if not password:
            return Response({'message':
                             'Password not provided.'},
                            status=status.HTTP_400_BAD_REQUEST)
        if not User.objects.filter(username=username):
            return Response({'message':
                             'Username does not exist.'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            return super(LoginView, self).post(request)
        except:
            return Response({'message': 'Password incorrect.'},
                            status=status.HTTP_400_BAD_REQUEST)
