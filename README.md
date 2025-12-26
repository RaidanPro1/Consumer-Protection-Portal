Here is a comprehensive, professional deployment and system summary text incorporating all your provided details, ready to submit to Google AI Studio or use as documentation for your project deployment on Ubuntu with Hestia Control Panel:

---

# 🛡️ Consumer Protection System - Taiz (CPA-Taiz)

This project is a full-stack platform aimed at empowering consumers in Taiz Governorate through smart monitoring tools, updated news, and a dynamic price guide.

---

## 🏗️ System Architecture

* **Frontend:** React 19 + Tailwind CSS + Framer Motion
* **Backend:** Node.js + Express.js
* **Database:** MongoDB (NoSQL)
* **Security:** JWT (JSON Web Tokens) + Bcrypt for password hashing

---

## 🛠️ Prerequisites & Setup

* **Node.js:** Version 18 or higher
* **MongoDB:** Version 6.0 or higher (local or MongoDB Atlas)
* **SSL Certificate:** Mandatory for camera barcode scanning and geolocation functionality in production

---

## 🚀 Backend Setup

1. Create backend folder and install dependencies:

   ```bash
   mkdir backend && cd backend
   npm init -y
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

2. Create `.env` file in `/backend` with:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

3. Define Mongoose Models for Users, Prices, News, Violations.

4. Seed initial admin user (run once):

   ```js
   // backend/scripts/seed.js
   const mongoose = require('mongoose');
   const User = require('../models/User');
   const bcrypt = require('bcryptjs');

   async function seed() {
     await mongoose.connect(process.env.MONGO_URI);
     const hashedPassword = await bcrypt.hash('Admin@Taiz2024', 10);
     await User.create({
       name: 'System Admin',
       email: 'admin@cpa-ye.org',
       password: hashedPassword,
       role: 'admin'
     });
     console.log('✅ Admin user created successfully');
     process.exit();
   }
   seed();
   ```

---

## 🌐 Production Deployment on Ubuntu with Hestia Control Panel v1.9.4

1. **Upload Files:**
   Upload frontend build (e.g., `dist`) and backend files to:
   `/home/cpa-ye/web/cpa-ye.org/public_html` for frontend,
   `/home/cpa-ye/web/cpa-ye.org/backend` for backend.

2. **File Permissions:**

   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. **Hestia Control Panel Configuration:**

   * Ensure domain `cpa-ye.org` points to `/public_html` directory.
   * Use Hestia to manage DNS and SSL (Let’s Encrypt).
   * Verify Nginx or Apache configurations via Hestia.
   * Use `.htaccess` or Nginx rewrite rules to support React SPA routing:

     ```nginx
     location / {
       try_files $uri $uri/ /index.html;
       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-Content-Type-Options "nosniff";
     }
     ```

4. **Run Backend with PM2:**

   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name cpa-backend
   pm2 startup
   pm2 save
   ```

5. **Enable HTTPS:**
   Use Hestia’s SSL feature to enable HTTPS for `cpa-ye.org`.

6. **Test Site:**
   Verify access via both `http://cpa-ye.org` and `https://cpa-ye.org`.

---

## 🔒 Security Notes

* Browsers require **HTTPS** for camera and geolocation APIs to function.
* CORS policy configured to accept requests only from the official frontend domain.
* Multer handles file uploads; ensure `uploads` directory has write permissions.

---

## ⚙️ Admin Control Panel Features

* Manage geo-located violation reports with status updates.
* Rich text news editor for awareness campaigns.
* Price lists for official commodity prices.
* Dashboard for real-time statistics on reports and violations.

---

## 📞 Technical Support

* **Lead Developer:** [Raidan Pro](https://raidan.pro)
* **Email:** [support@cpa-ye.org](mailto:support@cpa-ye.org)
* **Office:** Taiz, Yemen

---

*© 2026 Consumer Protection Association - Taiz. All rights reserved.*

---

If you want, I can also provide deployment scripts or detailed instructions for each step.
