from django.contrib.auth.models import User
from photos.models import Folder, Photo
from rest_framework import serializers
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for photo objects
    """
    photos = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Photo.objects.all())
    folders = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Folder.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'photos', 'folders')


class PhotoSerializer(serializers.ModelSerializer):
    """
    Serializer for photos objects
    """
    folder = serializers.ReadOnlyField(source='folder.id')
    uploader = serializers.ReadOnlyField(source='uploader.username')

    class Meta:
        model = Photo
        fields = '__all__'
        read_only_fields = ('image_size',)

    def create(self, validated_data):
        image = validated_data.get("image")
        return Photo.objects.create(
            title=validated_data.get("title"),
            image=image,
            image_size=image.size,
            folder=validated_data.get("folder"),
            uploader=validated_data.get("uploader")
        )


class FolderSerializer(serializers.ModelSerializer):
    """
    Serializer for folder objects
    """
    photos = PhotoSerializer(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Folder
        fields = (
            'id', 'name', 'photos', 'owner', 'date_created',
            'date_modified')
