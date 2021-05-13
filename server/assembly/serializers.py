from rest_framework import serializers
from .models import AuthUser


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ['id', 'username', 'password']