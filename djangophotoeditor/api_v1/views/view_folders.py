from api_v1.permissions import IsFolderOwner
from api_v1.serializers import FolderSerializer, PhotoSerializer
from photos.models import Folder, Photo
from rest_framework import generics
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated


class FolderView(generics.ListCreateAPIView):
    """
    Create a new folder.
    """
    serializer_class = FolderSerializer
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        """
        Overrides the default perform_create method
        Checks folder does not exist already for user
        """
        name = serializer.validated_data.get("name")
        if Folder.objects.filter(name=name, owner=self.request.user):
            raise ParseError(detail="Folder already exist")
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        """
        Overrides the default get_queryset method
        Return folders belonging to a particular user only"""
        return Folder.objects.filter(owner=self.request.user)


class FolderDetailView (generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieves, Update or delete a folder
    """
    serializer_class = FolderSerializer
    queryset = Folder.objects.all()
    permission_classes = (IsAuthenticated, IsFolderOwner)

    def perform_update(self, serializer):
        """Ensure users does not have two folders with same name"""

        folder_id = self.kwargs.get('pk')
        name = serializer.validated_data.get('name')
        folder = Folder.objects.filter(
            pk=folder_id,
            owner=self.request.user).first()

        if folder.name != name:
            if Folder.objects.filter(name=name, owner=self.request.user):
                raise ParseError(detail="This folder already exist")
        serializer.save()
