# 🧩 Compreender é cuidar  

## 👥 Equipe  
- **Lucas Teixeira**  
- **Matheus Caique**  
- **Nicolas Aragão**  

---

## 📌 Resumo do Projeto  
**Compreender é cuidar** é uma plataforma digital voltada a pais e responsáveis que possuem dúvidas sobre o comportamento ou desenvolvimento dos filhos.  

Através de **inteligência artificial**, o sistema recomenda conteúdos explicativos com base em palavras-chave fornecidas e também oferece testes iniciais de triagem, acessíveis mediante cadastro e login.  

> ⚠️ O sistema **não realiza diagnósticos médicos**, apenas orienta e sugere quando pode ser necessário buscar apoio profissional.  

---

## 🚀 Funcionalidades Principais  
- Cadastro e login de usuários (com opção de consentimento para uso de dados)  
- Chatbot com **IA** para responder dúvidas dos pais  
- Recomendação de vídeos com base em palavras-chave  
- Triagem **M-CHAT-R/F** (rastreamento de sinais de Transtorno do Espectro Autista - TEA)  

---

## 🗄️ Banco de Dados  
- **Banco utilizado:** PostgreSQL  
- **Tabela principal:** `User` personalizada, herdada de `AbstractUser` do Django  
  - `id`: Identificador único (PK)  
  - `username`: Nome de usuário  
  - `email`: Usado como login (único)  
  - `password`: Hash da senha  
  - `share_data`: Booleano indicando se o usuário autoriza compartilhamento de dados  

---

## 🛠️ Tecnologias Utilizadas  

### 🔹 Backend  
- [Django](https://www.djangoproject.com/) – framework web robusto em Python  
- [Django REST Framework](https://www.django-rest-framework.org/) – criação de APIs REST  
- [djangorestframework-simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/) – autenticação via JWT  
- Integração com **Google Gemini 2.0 Flash** para IA  
- PostgreSQL + `psycopg2-binary`  
- `django-cors-headers`, `python-decouple`, `dotenv`  

### 🔹 Frontend  
- [React.js](https://react.dev/) – construção da interface  
- [Vite](https://vitejs.dev/) – build e servidor de desenvolvimento  
- [TypeScript](https://www.typescriptlang.org/) – tipagem estática  
- [TailwindCSS](https://tailwindcss.com/) – estilização com utilitários  
- [Axios](https://axios-http.com/) – comunicação com a API  
- [React Router DOM](https://reactrouter.com/) – navegação entre páginas  
- ESLint + Prettier – qualidade e padronização do código  

---

## 📂 Estrutura do Projeto  
```bash
hackathon/
│── backend/      # API em Django + DRF + JWT + IA
│── frontend/     # Aplicação em React + Vite + Tailwind
│── README.md     # Este arquivo
```

---

## ⚙️ Como Rodar o Projeto  

### 🔹 Backend (Django + DRF)  
1. Acesse a pasta do backend:  
   ```bash
   cd backend
   ```

2. Crie e ative um ambiente virtual:  
   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate    # Windows
   ```

3. Instale as dependências:  
   ```bash
   pip install -r requirements.txt
   ```

4. Configure as variáveis de ambiente (`.env`) com:  
   ```env
   SECRET_KEY=sua_chave_secreta
   DEBUG=True
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nomedb
   GEMINI_API_KEY=sua_chave_google_gemini
   ```

5. Execute as migrações:  
   ```bash
   python manage.py migrate
   ```

6. Inicie o servidor:  
   ```bash
   python manage.py runserver
   ```

O backend estará rodando em: **http://127.0.0.1:8000/**  

---

### 🔹 Frontend (React + Vite)  
1. Acesse a pasta do frontend:  
   ```bash
   cd frontend
   ```

2. Instale as dependências:  
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:  
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. Rode o servidor de desenvolvimento:  
   ```bash
   npm run dev
   ```

O frontend estará disponível em: **http://localhost:5173/**  

---

## 🎯 Conclusão e Próximos Passos  
O projeto busca **democratizar o acesso à orientação sobre bem-estar infantil**, fornecendo suporte inicial a pais e responsáveis de forma acessível e responsável.  

**Impacto esperado:** Incentivar a busca por avaliação profissional quando necessário e contribuir positivamente para a sociedade.  

**Próximos passos:**  
- Implementar salvamento dos resultados dos testes realizados  
- Ampliar a base de conteúdos recomendados  
- Melhorar a experiência de usuário (UI/UX)  
- Expandir o chatbot para novos cenários de orientação  

---

## 📜 Licença  
Este projeto foi desenvolvido para fins acadêmicos no **Hackathon**.  
