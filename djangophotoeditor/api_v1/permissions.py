from django.shortcuts import get_object_or_404
from photos.models import Folder
from rest_framework.permissions import BasePermission


class IsFolderOwner(BasePermission):
    """
    Permission only allow owners of object access to it
    """

    def has_object_permission(self, request, view, obj):
        # only owners of folder are allowed access
        return obj.owner == request.user


class IsPhotoOwner(BasePermission):
    """
    Permission only allow owners of object access to it
    """

    def has_object_permission(self, request, view, obj):
        # only uploaders of photos are allowed access
        return obj.uploader == request.user


class IsPhotoFolderOwner(BasePermission):
    """
    Permission only allow owners of folders access to it
    """

    def has_permission(self, request, view):
        # only owners of object are allowed access
        folder = get_object_or_404(
            Folder, id=view.kwargs.get('pk'))
        return folder.owner == request.user
