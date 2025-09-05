from rest_framework import serializers
from .models import ChildScreening

class ChildScreeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildScreening
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}  # Importante!
        }
