🤖 AI Interview Room

AI Interview Room is a modern, AI-powered mock interview platform designed to help students and job candidates prepare confidently for real-world interviews. It simulates realistic interview scenarios using AI, offering multiple interview types, intelligent question flows, and performance evaluation — all in one place.

🚀 Why AI Interview Room?

Preparing for interviews can be stressful and unstructured. AI Interview Room solves this by providing:

Realistic AI-driven interview experiences

Multiple interview categories tailored to different needs

A guided, dashboard-based user flow

Smart evaluation and feedback

Whether you're preparing for a technical, HR, or custom interview, AI Interview Room adapts to you.

✨ Key Features
🎓 Student Features

🔐 Secure Login & Registration

📝 Onboarding Form for candidates

📊 Student Dashboard after login

🎯 Choose interview type before starting

💬 Built-in AI Chat Assistant

🧠 AI-generated interview questions

📈 Interview session tracking & scores

🧪 Interview Types

Technical Interview (coding & problem-solving)

General Interview

Behavioral Interview

HR / Communication Interview

Custom Interview (user-defined)

Each interview type has its own structured question set.
📦 Getting Started (Run Locally)

Follow these steps to run AI Interview Room on your local machine.

1️⃣ Prerequisites

Make sure you have installed:

Node.js (v18 or higher)

npm or pnpm

Git

PostgreSQL or SQLite (as configured)

2️⃣ Clone the Repository
git clone https://github.com/your-username/ai-interview-room.git
cd ai-interview-room/frontend

3️⃣ Install Dependencies
npm install
# or
pnpm install

4️⃣ Environment Variables

Create a .env file in the frontend folder and add:

DATABASE_URL="your_database_url_here"

5️⃣ Setup Database (Prisma)
npx prisma generate
npx prisma migrate dev

6️⃣ Run the Development Server
npm run dev
# or
pnpm dev

7️⃣ Open in Browser

Once the server starts, open:

http://localhost:3000

🔐 Application Flow

Open http://localhost:3000

Landing Page → Click Start Interview

Redirects to Login / Register

Complete Registration & Onboarding

Login → Student Dashboard

Select Interview Type

Start AI-powered Interview

🧑‍💼 Admin Panel

👥 Manage students

❓ Manage interview questions

⚙️ Platform settings

📊 Interview & usage statistics

🔄 Fully dynamic and database-driven

🔒 Authentication Flow

Landing Page

Start Interview → Login / Register

Registration → Onboarding (with face capture support)

Login → Student Dashboard

Select Interview Type → Start Interview

🛠️ Tech Stack
Frontend

Next.js (App Router)

React 19

TypeScript

Tailwind CSS

Turbopack

Backend

Next.js Server Actions

Node.js

Database & ORM

Prisma ORM

Relational Database (PostgreSQL / SQLite)

AI & Intelligence

AI-powered question generation

AI chat assistant

Automated interview evaluation

📁 Project Structure (Simplified)
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── interview/
│   │   ├── admin/
│   │   └── globals.css
│   ├── lib/
│   │   ├── db.ts
│   │   └── actions.ts
│   └── components/
├── prisma/
│   └── schema.prisma
└── package.json

🧠 Use Cases

Students preparing for campus placements

Job seekers practicing technical interviews

Candidates improving communication & behavioral skills

Institutions offering AI-based interview practice

🔮 Future Enhancements

Face-based authentication for login

Real-time interview analytics

Resume-based interview customization

AI feedback & improvement suggestions

Video interview simulation

👤 Author

Ishan Jadhav
🚀 Passionate about AI, full-stack development, and building real-world solutions.

⭐ Support

If you find this project helpful:

⭐ Star the repository

🐛 Report issues

💡 Suggest new features

AI Interview Room – Practice smarter. Interview better. Get hired faster.
