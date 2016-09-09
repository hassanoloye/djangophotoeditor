from django.contrib.auth.models import User
from django.test import TestCase

from .models import Folder, Photo


class TestFolder(TestCase):

    def setUp(self):
        """Register a sample user"""
        self.user = User.objects.create_user(
            username='test_user', password='test_password')
        self.user.set_password('test_password')
        self.user.save()
        self.create_folder()

    def create_folder(self):
        """Create a folder"""
        self.folder = Folder.objects.create(
            name='Test Folder', owner=self.user)

    def test_that_user_can_create_folder(self):
        """Test that users can create a new folder"""
        self.assertTrue(Folder.objects.filter(name='Test Folder'))

    def test_that_user_can_update_folder(self):
        """Test that users can update folder"""
        self.folder.name = 'Test Folder renamed'
        self.folder.save()
        self.assertFalse(Folder.objects.filter(name='Test Folder'))
        self.assertTrue(Folder.objects.filter(name='Test Folder renamed'))

    def test_that_user_can_delete_folder(self):
        """Test that users can delete folder"""
        self.folder.delete()
        self.assertFalse(Folder.objects.filter(name='Test Folder'))


class PhotoTest(TestCase):

    def setUp(self):
        """Register a sample user"""
        self.user = User.objects.create_user(
            username='test_user', password='test_password')
        self.user.set_password('test_password')
        self.user.save()
        self.create_photo()

    def create_folder(self):
        """Create a folder"""
        self.folder = Folder.objects.create(
            name='Test Folder', owner=self.user)

    def create_photo(self):
        """Create a photo"""
        # Create folder to associate with photo
        self.create_folder()

        # Create photo
        self.photo = Photo.objects.create(
            name='Test Photo', image='tmp/sample.jpg',
            folder=self.folder, uploader=self.user)

    def test_that_user_can_create_photo(self):
        """Test that users can create a new photo"""
        photo_path = Photo.objects.get(name='Test Photo').image.path

        # Open the image using the path
        self.failUnless(open(photo_path), 'file not found')

        # Assert that the model is saved
        self.assertTrue(Photo.objects.filter(name='Test Photo'))

    def test_that_user_can_update_photo(self):

        self.photo.name = 'Test Photo updated'
        self.photo.save()
        self.assertFalse(Photo.objects.filter(name='Test Photo'))
        self.assertTrue(Photo.objects.filter(name='Test Photo updated'))

    def test_that_user_can_delete_photo(self):

        self.photo.delete()
        self.assertFalse(Photo.objects.filter(name='Test Photo'))
