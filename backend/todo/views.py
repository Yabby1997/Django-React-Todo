from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions, status
from .serializers import TodoSerializer
from .models import Todo

# serializer와 queryset만 지정해주면 CRUD op는 자동 제공된다. 
class TodoView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()