from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('<str:username>/', views.profile, name='profile'),
    path('<str:username>/toggle_follow/', views.toggle_follow_ajax, name='toggle_follow_ajax'),
]