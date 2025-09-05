from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ChildScreening
from .serializers import ChildScreeningSerializer

class CreateChildScreeningViewSet(viewsets.ModelViewSet):
    queryset = ChildScreening.objects.all()
    serializer_class = ChildScreeningSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        questions = request.data.get('questions')
        answers = request.data.get('answers')
        result = request.data.get('result')
        screening = request.data.get('screening')

        data = {
            "questions": questions,
            "answers": answers,
            "result": result,
            "screening": screening
        }

        # Valida e salva
        serializer = ChildScreeningSerializer(data=data)
        if serializer.is_valid():
            self.perform_create(serializer)
            screening_instance = serializer.instance
            return Response({
                'name': screening_instance.screening,
                'date': screening_instance.date,
                'result': screening_instance.result
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
            return Response({"message": "Triagem não encontrada"}, status=status.HTTP_404_NOT_FOUND)
