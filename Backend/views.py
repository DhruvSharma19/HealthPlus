from django.shortcuts import render
from django.http import FileResponse
from django.conf import settings
import os

def index(request):
    return render(request, 'index.html')


def load_icon(request):
    icon_path = os.path.join(settings.BASE_DIR, 'frontend/dist/icon.svg')
    return FileResponse(open(icon_path, 'rb'), content_type='image/svg+xml')
