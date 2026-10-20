# PS8 Complaint & Helpdesk Ticket System

## Start the backend
1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Put your MongoDB Atlas connection string in `MONGO_URI`.
4. Change `JWT_SECRET` to a private secret.
5. Run `npm run seed` to add sample records.
6. Run `npm run dev`.

Open `http://localhost:3000`.

## Demo accounts
Password for all demo accounts: `Password123`
- Admin: `admin@example.com`
- Support: `support@example.com`
- Customer: `aarav@example.com`

## API routes
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/tickets`
- POST `/api/tickets`
- GET `/api/tickets/:id`
- PUT `/api/tickets/:id`
- DELETE `/api/tickets/:id`
- GET `/api/departments`
- POST `/api/departments`
- PUT `/api/departments/:id`
- DELETE `/api/departments/:id`
- POST `/api/comments`
- GET `/api/comments/:ticketId`
- GET `/api/admin/dashboard`

For protected routes, use header `Authorization: Bearer YOUR_TOKEN`.

Note: This is a beginner starter. Test the full assignment rules and connect the React pages to these API routes before submitting.# Complaint-Helpdesk-Ticket-System
