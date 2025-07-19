from django.contrib import admin
from .models import Story
from .models import StoryImage

admin.site.register(Story)
admin.site.register(StoryImage)