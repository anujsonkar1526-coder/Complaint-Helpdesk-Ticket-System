# Helpdesk Frontend

1. Keep your backend running on port 3000.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env`.
4. Run `npm run dev` and open the URL Vite prints (usually http://localhost:5173).

The API paths assumed here are POST `/auth/login`, POST `/auth/register`, GET/POST `/tickets`, GET `/tickets/:id`, GET `/departments`, and GET `/admin/dashboard`. If your backend uses different paths or response fields, edit `src/controllers/`.
Never put your MongoDB URI or JWT secret in frontend files.
