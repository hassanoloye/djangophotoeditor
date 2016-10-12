from account import views
from django.conf.urls import include, url

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^dashboard/', views.DashboardView.as_view(), name='dashboard'),
    url(r'^photo', views.PhotosView.as_view(), name='photos'),
    url(r'^folder/', views.FolderView.as_view(), name='folders'),
    url('', include('social.apps.django_app.urls', namespace='social')),
]
