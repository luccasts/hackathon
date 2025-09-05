from django.urls import path
from .views import RegistroViewSet, MeView, UsuarioViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()

router.register(r'usuarios', UsuarioViewSet, basename='user')
router.register(r'register', RegistroViewSet, basename='register')

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name = 'login'),
    path('refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),

    path('me/', MeView.as_view(), name='me'),
]

urlpatterns += router.urls