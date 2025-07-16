from django.urls import path
from .views import *

app_name = "Devtool"

urlpatterns = [
    path('', devtool_list, name='devtool_list'),
    path('create/', devtool_create, name='devtool_create'),
    path('detail/<int:devtool_id>', devtool_detail, name='devtool_detail'),
    path('update/<int:devtool_id>/', devtool_update, name='devtool_update'),
    path('delete/<int:devtool_id>/', devtool_delete, name='devtool_delete'),
]