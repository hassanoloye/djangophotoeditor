from django.core.files import File
from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase

photo_url = reverse('photo_api')
folder_url = reverse('folder_api')
new_folder_data = {'name': 'Test folder'}
image_file = File(open('uploads/tmp/sample.jpg'))
new_photo_data = {'title': 'Test photo',
                  'image': image_file}
filter_list = ('blur,detail,contour,edge_enhance,edge_enhance_more,emboss,'
               'find_edges,gaussian_blur,max_filter,min_filter,med_filter,'
               'mode_filter,sharpen,smooth,smooth_more,unsharp_mask'
               )


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
        image_file.seek(0)

    def create_new_folder(self):
        response = self.client.post(folder_url,
                                    data=new_folder_data, format='multipart')
        folder_id = response.data.get('id')
        self.folder_photo_url = reverse('folder_photo_api',
                                        kwargs={'pk': folder_id})

    def create_new_photo_with_folder(self):
        self.create_new_folder()
        response = self.client.post(self.folder_photo_url,
                                    data=new_photo_data, format='multipart')
        photo_id = response.data.get('id')
        self.photo_detail_url = reverse('photo_detail_api',
                                        kwargs={'pk': photo_id})

    def test_create_photo_without_folder(self):
        """Ensure users can create photos without folders"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        response = self.client.post(photo_url,
                                    data=new_photo_data, format='multipart')
        self.assertEqual(response.status_code, 201)

    def test_create_photo_with_folder(self):
        """Ensure users can create photos inside folders"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_folder()
        response = self.client.post(self.folder_photo_url,
                                    data=new_photo_data, format='multipart')
        self.assertEqual(response.status_code, 201)

    def test_create_photo_without_uploading_image(self):
        """Ensure users can create not create an empty photo"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        response = self.client.post(photo_url,
                                    data={}, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_retrieve_all_photos(self):
        """Ensure users can retrieve photos"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        response = self.client.get(photo_url)
        self.assertEqual(response.status_code, 200)

    def test_retrieve_particular_photo(self):
        """Ensure users can retrieve a certain photo"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_photo_with_folder()
        response = self.client.get(self.photo_detail_url)
        self.assertEqual(response.status_code, 200)

    def test_delete_particular_photo(self):
        """Ensure users can delete a certain photo"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_photo_with_folder()
        response = self.client.delete(self.photo_detail_url)
        self.assertEqual(response.status_code, 204)

    def test_apply_filters_to_photo_without_save(self):
        """Ensure users can update a certain photo"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_photo_with_folder()
        response = self.client.put(self.photo_detail_url, data={
                                   'filters': filter_list})
        self.assertEqual(response.status_code, 200)

    def test_apply_filters_to_photo_with_save(self):
        """Ensure users can update a certain photo"""
        # Test access without authentication
        response = self.client.post(photo_url)
        self.assertEqual(response.status_code, 401)

        # Set authentication token in header
        self.client.credentials(HTTP_AUTHORIZATION=self.token)

        # Asserting TRUE access
        self.create_new_photo_with_folder()
        self.assertEqual(type(filter_list), str)

        response = self.client.put(self.photo_detail_url, data={
                                   'filters': filter_list, 'save': 1})
        self.assertEqual(response.status_code, 200)
