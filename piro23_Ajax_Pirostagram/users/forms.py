from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'name', 'username', 'profile_image', 'bio']
        labels = {
            'email': '이메일',
            'username': '닉네임',
            'name': '이름',
            'bio' : '자기소개',
            'profile_image' : '프로필 사진'
        }