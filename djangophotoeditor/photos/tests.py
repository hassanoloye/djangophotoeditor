from django.contrib.auth.models import User
from django.test import TestCase
from models import Folder, Photo


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
        # Assert Folder exists
        self.assertTrue(Folder.objects.filter(name='Test Folder'))

        # Update folder
        self.folder.name = 'Test Folder renamed'
        self.folder.save()

        # Test folder is updated
        self.assertFalse(Folder.objects.filter(name='Test Folder'))
        self.assertTrue(Folder.objects.filter(name='Test Folder renamed'))

    def test_that_user_can_delete_folder(self):
        """Test that users can delete folder"""
        # Assert Folder exists
        self.assertTrue(Folder.objects.filter(name='Test Folder'))

        # Delete folder
        self.folder.delete()

        # Test folder is deleted
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
            title='Test Photo', image='tmp/sample.jpg',
            folder=self.folder, uploader=self.user)

    def test_that_user_can_create_photo(self):
        """Test that users can create a new photo"""
        photo_path = Photo.objects.get(title='Test Photo').image.path

        # Open the image using the path
        self.failUnless(open(photo_path), 'file not found')

        # Assert that the model is saved
        self.assertTrue(Photo.objects.filter(title='Test Photo'))

    def test_that_user_can_update_photo(self):
        # Assert photo exists
        self.assertTrue(Photo.objects.filter(title='Test Photo'))

        # Update photo
        self.photo.title = 'Test Photo updated'
        self.photo.save()

        # Test photo is updated
        self.assertFalse(Photo.objects.filter(title='Test Photo'))
        self.assertTrue(Photo.objects.filter(title='Test Photo updated'))

    def test_that_user_can_delete_photo(self):
        # Assert photo exists
        self.assertTrue(Photo.objects.filter(title='Test Photo'))

        # Delete photo
        self.photo.delete()

        # Test photo is deleted
        self.assertFalse(Photo.objects.filter(title='Test Photo'))
