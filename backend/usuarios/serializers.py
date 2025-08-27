from rest_framework import serializers
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import User

User = get_user_model()

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "share_data")  

    def validate(self, data):
        if not data.get("share_data"):
            raise serializers.ValidationError(
                {"share_data": "Você precisa aceitar o compartilhamento de dados para criar a conta."}
            )
        return data

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            share_data=validated_data["share_data"],
        )

class UsuarioSerializer(serializers.ModelSerializer):
    username=serializers.CharField(
        validators=[
            RegexValidator(
                regex=r"^[a-zA-Z0-9áéíóúãõçÁÉÍÓÚÃÕÇ]+$",
                message="Nome de usuário inválido"
            )
        ]
    )
    
    class Meta:
        model = User
        fields = ("id","username","email")