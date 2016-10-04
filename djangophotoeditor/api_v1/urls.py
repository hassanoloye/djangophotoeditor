from api_v1.views import view_folders, view_photos, view_users
from django.conf.urls import include, url

urlpatterns = [
    url(r'^auth/login$', view_users.LoginView.as_view(), name='apilogin'),
    url(r'^auth/register$', view_users.RegisterView.as_view(), name='apiregister'),
    #url(r'^auth/', include('rest_social_auth.urls_token')),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^photo/$', view_photos.PhotoView.as_view(),
        name='photo_api'),
    url(r'^photo/(?P<pk>[0-9]+)$',
        view_photos.PhotoDetailView.as_view(),
        name='photo_detail_api'),
    url(r'^folder/$', view_folders.FolderView.as_view(),
        name='folder_api'),
    url(r'^folder/(?P<pk>[0-9]+)$',
        view_folders.FolderDetailView.as_view(),
        name='folder_detail_api'),
    url(r'^folder/(?P<pk>[0-9]+)/photos$',
        view_photos.FolderPhotoView.as_view(),
        name='folder_photo_api'),
    url(r'^docs/', include('rest_framework_swagger.urls')),
]
