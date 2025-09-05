from rest_framework import serializers
from .models import ChildScreening

class ChildScreeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildScreening
        fields = ['id','user','questions','answers','result','screening','date',]