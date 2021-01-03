from rest_framework import serializers
from .models import Todo

#model 인스턴스를 JSON으로 frontend에 전달할 수 있게 하기 위한 serializer
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')