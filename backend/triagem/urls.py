from django.urls import path
from .views import CreateChildScreening, GetChildScreening

urlpatterns = [
    path('create-child-screening/', CreateChildScreening.as_view(), name='create-child-screening'),
    path('get-child-screening/', GetChildScreening.as_view(), name='get-child-screening'),
]