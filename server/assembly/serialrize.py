from rest_framework import serializers
from .models import auth_user


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = auth_user
        fields = ['id', 'username', 'password']