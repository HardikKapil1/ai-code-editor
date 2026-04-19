# 🧠 AI Code Editor

An AI-powered code editor with 3 intelligent features built 
with React, NestJS, and Groq API.

🔗 **Live Demo:** https://ai-code-editor-sand.vercel.app

---

## ✨ Features

### ⚡ Intent Mode
Paste your code and get an AI-optimized version instantly.
Returns structured breakdown of every change with before/after.

### 🔍 Explain Codebase  
Visual interactive diagram showing how your files connect,
how data flows, and what depends on what.

### 📌 Decision Memory
Write why you added a piece of code. AI categorizes it
(performance, bug-fix, readability) and remembers it.

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, TypeScript, Monaco Editor, React Flow |
| Backend | NestJS, TypeScript |
| AI | Groq API (Llama 3.3 70B) |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🏗️ ArchitectureController → OptimizeService
↓
ParserService
↓
PromptService
↓
GroqService
↓
ValidationService
↓
Response## 🚀 Run Locally

**Backend:**
```bash
cd backend
npm install
# add GROQ_API_KEY to .env
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

<img width="1913" height="890" alt="image" src="https://github.com/user-attachments/assets/03d8f986-15ed-4949-ac21-e4148ffdd5cd" />


<img width="1909" height="906" alt="image" src="https://github.com/user-attachments/assets/d4f8ac78-ae60-4bcc-a040-0a688e9b2020" />

---

Built by [Hardik Kapil](https://linkedin.com/in/hardik-kapil)
