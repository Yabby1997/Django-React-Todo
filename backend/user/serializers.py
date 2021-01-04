from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # 해당 Serializer가 다루게 될 model을 명시
        model = User   
        # 반환하게될 값을 명시        
        fields = ('username', 'password')


# 가입을 위한 serializer
class UserSerializerWithToken(serializers.ModelSerializer):
    # token 필드는 User에 포함되지 않기에 추가.
    token = serializers.SerializerMethodField()  
    # password를 설정해주기위해 write_only로 추가.
    password = serializers.CharField(write_only=True)

    # 토큰을 발행해주는 함수를 구현함.
    def get_token(self, obj):
        # 토큰화될 정보. 이 경우는 User
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER  
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    # create 함수를 오버라이드해서 password를 설정할 수 있도록 한다.
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        # User 필드에 token 추가?
        fields = ('token', 'username', 'password')
