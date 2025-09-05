from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ChildScreening
from .serializers import ChildScreeningSerializer

# Create your views here.
class CreateChildScreening(viewsets.ModelViewSet):
    queryset = ChildScreening.objects.all()
    serializer_class = ChildScreeningSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        questions = data.get('questions')
        answers = data.get('answers')

        if len(questions) != (answers):
            return Response({"message":"Número de perguntas e respostas não coincide."}, status=status.HTTP_400_BAD_REQUEST)
        
        screening_data = {
            "user": request.user.id,
            "data": {"questions": questions, "answers": answers}
        }

        serializer = ChildScreeningSerializer(data=screening_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetChildScreening(viewsets.ModelViewSet):
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