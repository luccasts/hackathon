from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ChildScreening
from .serializers import ChildScreeningSerializer

# Create your views here.
class CreateChildScreeningViewSet(viewsets.ModelViewSet):
    queryset = ChildScreening.objects.all()
    serializer_class = ChildScreeningSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        questions = request.data.get('questions')
        answers = request.data.get('answers')
        result = request.data.get('result')
        screening = request.data.get('screening')
        user_id = request.data.get('user')

        screening_data = ChildScreening.objects.create(
            user_id=user_id,
            questions=questions,
            answers=answers,
            result=result,
            screening=screening
        )

        serializer = ChildScreeningSerializer(data=screening_data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'name': screening_data.screening,
                'date': screening_data.date,
                'result': screening_data.result
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetChildScreeningViewSet(viewsets.ModelViewSet):
    queryset = ChildScreening.objects.all()
    serializer_class = ChildScreeningSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            screening = ChildScreening.objects.get(user=user)
            serializer = ChildScreeningSerializer(screening)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ChildScreening.DoesNotExist:
            return Response({"message":"Triagem não encontrada"}, status=status.HTTP_404_NOT_FOUND)