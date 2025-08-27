import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI

# Create your views here.

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@csrf_exempt
def assistant_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            question = data.get("question", "")

            if len(question.strip()) < 3:
                return JsonResponse({"erro": "Pergunta muito curta"}, status=500)
            
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system","content": "Você é um assistente educado e claro que responde dúvidas sobre comportamento infantil e educação"},
                    {"role": "system","content": question}
                ],
                max_tokens=300,
                temperature=0.7,
            )
            
            answer = response.choices[0].message["content"]
            return JsonResponse({"resposta": answer})

        except Exception as e:
            return JsonResponse({"erro": f"Erro no processamento: {str(e)}"}, status=500)
    
    return JsonResponse({"erro": "Método não permitido."}, status=405)
