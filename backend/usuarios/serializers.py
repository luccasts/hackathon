from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import User

User = get_user_model()

class Registro(serializers.ModelSerializer):
    senha = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ("id", "username", "email", "senha")  

    def create(self, validated_data):
        usuario = User(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        usuario.set_password(validated_data["senha"])
        usuario.save()  
        return usuario

class Usuario(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'