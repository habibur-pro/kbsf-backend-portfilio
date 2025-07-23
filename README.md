# 🏥 KBSF Foundation - Backend API

This is the backend API for **কদমতলী বন্ধু সেবা ফাউন্ডেশন**, a nonprofit organization platform that facilitates managing members, collecting donations, and distributing aid to the underprivileged.

---

## 🌐 Live Project

Frontend: [https://kbsf.vercel.app](https://kbsf.vercel.app)

---

## 📌 About

The backend serves as the core logic and data layer of the KBSF Foundation's digital platform. It provides RESTful APIs to support:

- Member management (add, update, delete)
- Role-based authentication & authorization
- Donation tracking (receive & distribute)
- Fund request and approval system
- Activity logging and secure access
- Admin dashboards and insights

---

## ⚙️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & bcrypt
- **Hosting**: Vercel / Render / Railway / Any Node-supported host
- **Environment**: .env configuration for secret management

---

## 📂 Folder Structure

```
/
├── src/app/         # Next.js routes
├── src/components/  # reusable components
├── public/           # Static files and images
├── src/types/            # all types use by whole website
├── src/redux/           # all redux operation including data fetch !
├── src/providers/           # all providers !
├── src/lib/           # all utility functions !
├── src/hooks/           # all custom hooks !
```
