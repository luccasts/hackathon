from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CreateChildScreening, GetChildScreening

router = DefaultRouter()

router.register(r'create-child-screening', CreateChildScreening, basename='create-child-screening')
router.register(r'get-child-screening', GetChildScreening, basename='get-child-screening')

urlpatterns = router.urls