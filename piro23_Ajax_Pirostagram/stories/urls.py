from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('create/', views.create_story, name='create_story'),
    path('<str:username>/', views.story_detail, name='story_detail'),
    path('<str:username>/json/', views.story_json, name='story_json'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)