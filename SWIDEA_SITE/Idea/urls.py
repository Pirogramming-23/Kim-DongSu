from django.urls import path
from .views import *

app_name = "Idea"

urlpatterns = [
    path('', idea_list, name="idea_list"),
    path('detail/<int:pk>/', idea_detail, name="idea_detail"),
    path('idea/<int:idea_id>/star/', toggle_star, name='toggle_star'),
    path('idea/<int:idea_id>/increase_interest/', increase_interest, name='increase_interest'),
    path('idea/<int:idea_id>/decrease_interest/', decrease_interest, name='decrease_interest'),
    path('signup/', SignUpView.as_view(), name = 'signup'),
    path('idea/create/', idea_create, name='idea_create'),
    path('idea/update/<int:idea_id>', idea_update, name='idea_update'),
    path('delete/<int:pk>/', idea_delete, name='idea_delete'),
    path('search/', idea_search, name='idea_search'),
]