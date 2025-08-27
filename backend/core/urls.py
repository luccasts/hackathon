from django.urls import path
from .views import assistant_view

urlpatterns = [
    path('api/assistant/', assistant_view),
]