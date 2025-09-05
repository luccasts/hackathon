from rest_framework.routers import DefaultRouter
from .views import CreateChildScreeningViewSet, GetChildScreeningViewSet

router = DefaultRouter()

router.register(r'create-child-screening', CreateChildScreeningViewSet, basename='create-child-screening')
router.register(r'get-child-screening', GetChildScreeningViewSet, basename='get-child-screening')

urlpatterns = router.urls