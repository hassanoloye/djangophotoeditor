from rest_framework import permissions


class IsFolderOwner(permissions.BasePermission):
    """
    Permission only allow owners of object access to it
    """

    def has_object_permission(self, request, view, obj):
        # only owners of folder are allowed access
        return obj.owner == request.user


class IsPhotoOwner(permissions.BasePermission):
    """
    Permission only allow owners of object access to it
    """

    def has_object_permission(self, request, view, obj):
        # only uploaders of photos are allowed access
        return obj.uploader == request.user
