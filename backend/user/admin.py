from django.contrib import admin
from .models import user

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')    #Admin 페이지에서 뭐부터 보여줄지

admin.site.register(Todo, TodoAdmin)