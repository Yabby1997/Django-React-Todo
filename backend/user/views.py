from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


# 사용자 로그인 상태 유지를 위한것
@api_view(['GET'])
def current_user(request):
    # request.user를 인자로 UserSerializer로 보낸다.
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# 계정 생성 등을 위한것
class UserList(APIView):
    # auth가 안되어있어도 할 수 있어야해서 Allowany
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
