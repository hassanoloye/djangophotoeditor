from time import time

from django.contrib.auth.models import User
from django.db import models


def get_upload_file_name(instance, filename):
    return 'photos/user_{0}/{1}'.format(instance.uploader.id, filename)


class Base(models.Model):
    """
    Base model inherited by other models
    """
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-date_modified']


class Folder(Base):
    """Model for folder"""
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, related_name='folders', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Photo(Base):
    """Model for photo"""
    title = models.CharField(max_length=100, null=True)
    image = models.ImageField(upload_to=get_upload_file_name, null=True)
    edited_image = models.CharField(max_length=255, null=True)
    image_size = models.IntegerField(default=0)
    uploader = models.ForeignKey(
        User, related_name='photos', on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, related_name='photos')

    def __str__(self):
        return self.title
