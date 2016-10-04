from django.shortcuts import render
from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'account/index.html'


class PhotosView(TemplateView):
    template_name = 'account/photo.html'


class DashboardView(TemplateView):
    template_name = 'account/photo.html'


class FolderView(TemplateView):
    template_name = 'account/photo.html'
