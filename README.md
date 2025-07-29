# 🧠 SmartWriter AI - SaaS Blog Writer App

SmartWriter AI is an AI-powered SaaS platform that helps users write high-quality blog posts using OpenAI’s GPT-4 API.

---

## 🚀 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **AI Integration:** OpenAI GPT-4 API

---

## 🧩 Features

- ✍️ AI-powered blog post generation
- 🧠 Title and outline suggestions via GPT-4
- 📝 Edit, save, and manage your posts
- 🧾 Export content in Markdown or HTML
- 🔐 Auth system (Sign up / Sign in with Supabase)
- 💳 Stripe subscription plans (Free & Pro)
- 📊 Usage quota based on plan
- 🛡️ Rate limiting and OpenAI token usage tracking

---

## 🗂️ Project Structure

```bash
/ai-saas-app
│
├── /app                # Next.js app directory
├── /components         # Reusable UI components
├── /lib                # Utility functions (OpenAI, Stripe, etc.)
├── /pages/api          # API routes (auth, ai, stripe)
├── /prisma             # DB schema and migrations
├── /styles             # Global styles (Tailwind)
├── /public             # Static assets
├── /scripts            # CLI or setup scripts
└── .env                # Environment variables
