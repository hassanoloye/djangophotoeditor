from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase

photo_url = reverse('photo_api')
folder_url = reverse('folder_api')


class PhotoTest(APITestCase):

    def test_access_photo_without_authentication(self):
        """
        Ensure a user cannot access photos without authentication
        """
        response = self.client.get(photo_url)
        self.assertEqual(response.status_code, 401)


class FolderTest(APITestCase):

    def test_access_folder_without_authentication(self):
        """
        Ensure a user cannot access folders without authentication
        """
        response = self.client.get(folder_url)
        self.assertEqual(response.status_code, 401)
