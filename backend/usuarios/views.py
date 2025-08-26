from rest_framework.permissions import AllowAny
from rest_framework import generics, viewsets
from django.contrib.auth import get_user_model
from .serializers import Registro, Usuario
from .models import User

User = get_user_model()

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = Usuario

class RegistroView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = Registro
    permission_classes = [AllowAny] 

# Create your views here.
