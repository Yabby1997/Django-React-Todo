from .serializers import UserSerializer
from rest_framework import generics
from .models import User


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer