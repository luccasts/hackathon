from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@csrf_exempt
def assistant_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            question = data.get("question", "")

            if len(question.strip()) < 3:
                return JsonResponse({"erro": "Pergunta muito curta"}, status=500)
            
            answer = f"Você perguntou: {question}. Esta é uma resposta simulada da IA."

            return JsonResponse({"resposta": answer})
        
        except Exception as e:
            return JsonResponse({"erro": f"Erro no processamento: {str(e)}"}, status=500)
    
    return JsonResponse({"erro": "Método não permitido."}, status=405)
