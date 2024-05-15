from django.contrib import admin
from django.urls import path, include, re_path
from .views import index, load_icon
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path("", include("Accounts.urls")),
    path("", include("DiseasePredictor.urls")),
    path("contactdoctor", index),
    path("dashboard", index),
    path('icon.svg', load_icon),
    re_path(r'^.*/$', index),
]

