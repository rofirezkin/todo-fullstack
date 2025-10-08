# 📝 Todo App with NestJS & React Native (Expo)

This is a simple Todo application with:

- **Backend**: NestJS (API server)
- **Frontend**: React Native Expo (mobile app)
- State management with TanStack Query
- REST API integration

---

## 📂 Project Structure

root/  
├── todo-backend-app/ # NestJS backend (API server)  
├── todo-app/ # React Native Expo frontend  
└── README.md

---

## 🚀 Backend (NestJS)

1. Install dependencies

```bash
cd todo-backend-app
yarn install
```

2. Run development server

```bash
yarn start:dev
```

3. API available at  
   http://localhost:3000

---

## 📱 Frontend (React Native Expo)

1. Install dependencies

```bash
cd todo-app
yarn install
```

2. Start Expo app

```bash
yarn start
```

3. Run on device / emulator

- Press **i** to run on iOS simulator
- Press **a** to run on Android emulator
- Or scan QR code with Expo Go app on your phone

---

## 🔗 API Integration

- **GET** `/todos` → fetch all todos
- **POST** `/todos` → create a todo
- **PUT** `/todos/:id` → update todo
- **DELETE** `/todos/:id` → delete todo

---

## ⚙️ Requirements

- Node.js >= 18
- Yarn
- Expo CLI
- Android Studio / Xcode (for emulator) or Expo Go app (for real device)

---

## 📝 Features

- ✅ Get todos
- ✅ Create todo
- ✏️ Edit todo
- ❌ Delete todo
- 🎯 Filter: All / Active / Completed

---

## 📜 License

MIT License © 2025
