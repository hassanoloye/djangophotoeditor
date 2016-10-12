from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase

photo_url = reverse('photo_api')
folder_url = reverse('folder_api')


class PhotoTest(APITestCase):

    def setUp(self):
        # Login the user and get the token
        registration_data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                             'password': 'adeola', 'confirm_password': 'adeola'}
        login_data = {'username': 'hassan', 'password': 'adeola'}
        self.client.post(reverse('apiregister'),
                         registration_data, format='multipart')
        login_response = self.client.post(reverse('apilogin'), login_data)
        self.token = 'Token ' + login_response.data.get('token')

    def test_access_photo_without_authentication(self):
        """
        Ensure a user cannot access photos without authentication
        """

        response = self.client.get(photo_url)
        self.assertEqual(response.status_code, 401)

    def test_access_photo_with_authentication(self):
        """
        Ensure authenticatied users can access photos
        """

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        response = self.client.get(photo_url)
        self.assertEqual(response.status_code, 200)


class FolderTest(APITestCase):

    def setUp(self):
        # Login the user and get the token
        registration_data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                             'password': 'adeola', 'confirm_password': 'adeola'}
        login_data = {'username': 'hassan', 'password': 'adeola'}
        self.client.post(reverse('apiregister'),
                         registration_data, format='multipart')
        login_response = self.client.post(reverse('apilogin'), login_data)
        self.token = 'Token ' + login_response.data.get('token')

    def test_access_folder_without_authentication(self):
        """
        Ensure a user cannot access folders without authentication
        """
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 401)

    def test_access_folder_with_authentication(self):
        """
        Ensure authenticated users can access folders
        """

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        response = self.client.get(photo_url)
        self.assertEqual(response.status_code, 200)
