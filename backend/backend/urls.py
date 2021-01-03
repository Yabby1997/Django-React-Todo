"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views as views
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')   #앞의 r은 오타가아님. rest의 r인듯.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  #api/todos 로 todo 정보 가져올 수 있음. 
    path('token-auth/', obtain_jwt_token),   #JWT 토큰을 발행해주는 api
    path('user/', include('user.urls'))
]
