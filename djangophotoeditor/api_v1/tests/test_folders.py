from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase

folder_url = reverse('folder_api')
new_folder_data = {'name': 'Test Folder'}


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

    def create_new_folder(self):
        response = self.client.post(folder_url,
                                    data=new_folder_data, format='multipart')
        folder_id = response.data.get('id')
        self.folder_detail_url = reverse('folder_detail_api',
                                         kwargs={'pk': folder_id})

    def test_create_folder_with_valid_details(self):
        """Ensure authenticated users can create folders"""

        # Test access without authentication
        response = self.client.post(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        response = self.client.post(folder_url, data=new_folder_data)
        self.assertEqual(response.status_code, 201)

    def test_create_folder_with_already_existing_name(self):
        """Ensure users can not have two folders with same name"""
        # Test access without authentication
        response = self.client.post(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()
        response = self.client.post(folder_url, data=new_folder_data)
        self.assertEqual(response.status_code, 400)

    def test_retrive_all_folders(self):
        """Ensure users can retrive created folders"""
        # Test access without authentication
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 200)

    def test_retreive_particular_folders(self):
        """Ensure users can retrieve a certain folder"""
        # Test access without authentication
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()
        response = self.client.get(self.folder_detail_url)
        self.assertEqual(response.status_code, 200)

    def test_delete_particular_folders(self):
        """Ensure users can retrieve a certain folder"""
        # Test access without authentication
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()
        response = self.client.delete(self.folder_detail_url)
        self.assertEqual(response.status_code, 204)

    def test_update_particular_folder(self):
        """Ensure users can retrieve a certain folder"""
        # Test access without authentication
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()
        response = self.client.put(self.folder_detail_url, data={
                                   'name': 'Test folder updated'})
        self.assertEqual(response.status_code, 200)

    def test_update_folder_with_already_existing_name(self):
        """Ensure users can not have two folders with same name"""
        # Test access without authentication
        response = self.client.post(folder_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()

        response = self.client.post(folder_url, data={'name': 'Test folder2'})
        folder_id = response.data.get('id')
        folder_detail_url = reverse('folder_detail_api',
                                    kwargs={'pk': folder_id})
        response = self.client.put(
            folder_detail_url, data=new_folder_data)
        self.assertEqual(response.status_code, 400)
