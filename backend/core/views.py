import concurrent.futures
import json
import os
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv

def call_generate_content(model, question):
    return model.generate_content(question)
# Create your views here.
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@csrf_exempt
def assistant_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            question = data.get("question", "")

            for m in genai.list_models():
                print(m.name, "=>", m.supported_generation_methods)

            if len(question.strip()) < 3:
                return JsonResponse({"erro": "Pergunta muito curta"}, status=500)
            
            model = genai.GenerativeModel("models/gemini-2.0-flash")
            prompt = f"""
            Você é um assistente especializado em Transtorno de Espectro Autista (TEA).
            Baseado nas duvidas do usuário, veja se as informações estão fortemente relacionadas a TEA.
            Se tiver certeza, forneça uma breve descrição dentro de 5 linhas confirmando suspeita de TEA.
            Caso contrário, mostre incerteza e pergunte se há mais comportamentos relacionados.
            Se não houver comportamentos relacionados encerre o assunto.
            Duvidas do usuário: {question}
            """

            with concurrent.futures.ThreadPoolExecutor() as executor:
                future = executor.submit(call_generate_content, model, prompt)
                try:
                    response = future.result(timeout=15)  # timeout em segundos
                except concurrent.futures.TimeoutError:
                    return JsonResponse({"erro": "Tempo de resposta esgotado, tente novamente mais tarde."}, status=504)
                
            answer = response.text
            return JsonResponse({"answer": answer})

        except Exception as e:
            return JsonResponse({"erro": f"Erro no processamento: {str(e)}"}, status=500)
    
    return JsonResponse({"erro": "Método não permitido."}, status=405)
