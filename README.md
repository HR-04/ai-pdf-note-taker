# ai-pdf-note-taker

## 📚 Project Description

**ai-pdf-note-taker** is a Next.js application that enables users to upload PDF files, extract text content, and take notes within an interactive workspace. This app blends modern tech including:

- 🗃️ **Convex** for serverless functions and database management  
- 🎨 **Tailwind CSS** for styling  
- 🔐 **Clerk** for user authentication  
- 🤖 **LangChain** for PDF text processing and AI-powered responses  

### ✨ Features

- Upload and view PDF files
- Take and save notes in an interactive editor
- Get AI-generated answers based on selected PDF text
- Manage uploaded files via a dashboard interface

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```sh
git clone https://github.com/HR-04/ai-pdf-note-taker.git
cd ai-pdf-note-taker
```

### 2. Install Dependencies

Use your preferred package manager:

** npm:**

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. For example:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CONVEX_DEPLOYMENT_URL=your_convex_url
NEXT_PUBLIC_GEMINI_API_KEY = your gemini api key
```

> ⚠️ **Important:** Do not hardcode credentials in source files. Always use environment variables.

### 4. Run the Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🛠️ Additional Setup

### 🔄 Convex

Ensure Convex is properly set up and running. Refer to [Convex Docs](https://docs.convex.dev/) for setup instructions.

### 📄 PDF Processing

The application fetches and processes PDFs using LangChain via a custom API route located in `route.js`.

### 👤 User Authentication

Clerk is integrated for handling user sessions. Make sure your Clerk project settings match your environment variables.

### 🎨 Tailwind CSS

Tailwind is used for all UI styling. Customize styles in:

- `tailwind.config.mjs`
- `globals.css`

---

## 🧑‍💻 Usage Guide

### 🗂 Dashboard

- Navigate to the dashboard via the sidebar
- Upload and view your PDF files

### 📝 Workspace

- Click on any uploaded PDF to open the workspace
- View the PDF and take/edit notes interactively

### 🤖 AI Assistance

- Highlight text within the PDF
- Use the AI tool in the editor to generate HTML-formatted answers and summaries

---
