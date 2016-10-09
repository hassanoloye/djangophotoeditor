from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from rest_framework.test import APITestCase

register_url = reverse('apiregister')
login_url = reverse('apilogin')


class SignUpTest(APITestCase):

    def test_create_account_with_valid_details(self):
        """
        Ensure a user can create an account
        """
        data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                'password': 'adeola', 'confirm_password': 'adeola'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(User.objects.filter(username='hassan'))

    def test_create_account_with_existing_username(self):
        """
        Ensure a user cannot register with an existing username
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                'password': 'adeola', 'confirm_password': 'adeola'}
        self.client.post(url, data, format='multipart')
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_with_blank_username(self):
        """
        Ensure a user cannot create an account with blank username
        """
        url = reverse('apiregister')
        data = {'username': '', 'email': 'oyeboadehassan@gmail.com',
                'password': 'adeola', 'confirm_password': 'adeola'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_with_blank_email(self):
        """
        Ensure a new user cannot create an account with blank email
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': '',
                'password': 'adeola', 'confirm_password': 'adeola'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_with_mismatched_password(self):
        """
        Ensure a user cannot create an account with mismatched password
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                'password': 'adeola', 'confirm_password': 'olaide'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_with_invalid_username(self):
        """
        Ensure a user cannot create an account with username less
        than 6 characters
        """
        url = reverse('apiregister')
        data = {'username': 'ade', 'email': 'oyeboadehassan@gmail.com',
                'password': 'adeola', 'confirm_password': 'adeola'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_without_password(self):
        """
        Ensure a user cannot create an account without supplying a password
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                'password': '', 'confirm_password': 'adeola'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_without_confirmation_password(self):
        """
        Ensure a user cannot create an account without supplying a
        confirmation password
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                'password': 'adeola', 'confirm_password': ''}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_with_invalid_password(self):
        """
        Ensure a user cannot create an account with password
        less than 6 characters
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                'password': 'ade', 'confirm_password': 'ade'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_create_account_with_invalid_email(self):
        """
        Ensure a user cannot create an account with password
        less than 6 characters
        """
        url = reverse('apiregister')
        data = {'username': 'hassan', 'email': 'ade',
                'password': 'adeola', 'confirm_password': 'adeola'}
        response = self.client.post(register_url, data, format='multipart')
        self.assertEqual(response.status_code, 400)


class LoginTest(APITestCase):

    def test_sign_in_with_valid_details(self):
        """
        Ensure a user can sign in with valid details
        """
        register_data = {'username': 'hassan', 'email': 'oyeboadehassan@gmail.com',
                         'password': 'adeola', 'confirm_password': 'adeola'}
        login_data = {'username': 'hassan', 'password': 'adeola'}
        self.client.post(register_url, register_data, format='multipart')
        response = self.client.post(login_url, login_data, format='multipart')
        self.assertEqual(response.status_code, 200)

    def test_sign_in_with_blank_username(self):
        """
        Ensure a user cannot sign in with a blank username
        """
        login_data = {'username': '', 'password': 'adeola'}
        response = self.client.post(login_url, login_data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_sign_in_with_blank_password(self):
        """
        Ensure a user cannot sign in with a blank password
        """
        login_data = {'username': 'hassan', 'password': ''}
        response = self.client.post(login_url, login_data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_sign_in_with_non_existing_username(self):
        """
        Ensure a user cannot sign in with a non-existing username
        """
        login_data = {'username': 'badooo', 'password': 'adeola'}
        response = self.client.post(login_url, login_data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_sign_in_with_invalid_password(self):
        """
        Ensure a user cannot sign in with an invalid password
        """
        register_data = {'username': 'hassan',
                         'email': 'oyeboadehassan@gmail.com',
                         'password': 'adeola', 'confirm_password': 'adeola'}
        login_data = {'username': 'hassan', 'password': 'olaide'}
        self.client.post(register_url, register_data, format='multipart')
        response = self.client.post(login_url, login_data, format='multipart')
        self.assertEqual(response.status_code, 400)
