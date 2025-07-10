from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path("<int:pk>/", review_read),
    path("create/", review_create),
    path("<int:pk>/update/", review_update),
    path("<int:pk>/delete/", review_delete),
    path('', home, name="home"),
    ]
