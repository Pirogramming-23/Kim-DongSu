from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Follow

class UserAdmin(BaseUserAdmin):
    model = User
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom fields', {'fields': ('profile_image', 'bio', 'name')}),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Follow)