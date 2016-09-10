from django.contrib.auth.models import User
from django.db import models


class Base(models.Model):
    """
    Base model inherited by other models
    """
    name = models.CharField(max_length=100, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-date_modified']

    def __str__(self):
        return self.name


class Folder(Base):
    """Model for folder"""
    owner = models.ForeignKey(
        User, related_name='folders', on_delete=models.CASCADE)


class Photo(Base):
    """Model for photo"""
    image = models.ImageField(upload_to='/uploaded_photos')
    size = models.IntegerField(default=0)
    uploader = models.ForeignKey(
        User, related_name='photos', on_delete=models.CASCADE)
    folder = models.ForeignKey(Folder, related_name='photos')
