# Consumer Protection Taiz - Professional CMS

This project is a full-stack capable CMS built with React, Node.js, and MongoDB.

## 🚀 Features
- **Bilingual Support**: Fully localized in Arabic and English.
- **Dynamic CMS**: Manage News, Prices, Success Stories, and Site Settings.
- **Smart Barcode Scanner**: Real-time price verification with auto-reset.
- **Admin RBAC**: Role-based access control for Admins and Editors.
- **Social Integration**: One-click sharing for news items.

## 🛠 Tech Stack
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend (Architecture)**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).

## 📦 Installation & Setup

### 1. Backend (Node.js/Express)
1. Navigate to the `/backend` folder.
2. Run `npm install`.
3. Create a `.env` file with:
   ```env
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server: `npm run dev`.

### 2. Frontend (React)
1. Run `npm install`.
2. Update the API URL in `src/services/api.ts`.
3. Start the dev server: `npm start`.

## 🔑 Creating an Admin User
Use the provided script in `backend/scripts/seedAdmin.js`:
```bash
node backend/scripts/seedAdmin.js
```
Default credentials: `admin@cpa-ye.org` / `admin123`.

## 🎨 Global Configuration
The font 'Cairo' is applied globally via the `tailwind.config.js` and `index.html` CSS overrides. Colors can be adjusted dynamically through the Site Settings tab in the Admin Dashboard.
