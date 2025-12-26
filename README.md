بالطبع، إليك ملف README ثنائي اللغة (عربي-إنجليزي) احترافي ومفصل جداً يشرح خطوات التثبيت والإعداد بشكل كامل، مناسب للنشر كوثيقة رسمية للمشروع على بيئة Ubuntu باستخدام Hestia Control Panel.

---

````
# 🛡️ Consumer Protection System - Taiz (CPA-Taiz)
# نظام حماية المستهلك - تعز (CPA-Taiz)

---

## English Version

### Project Overview
Consumer Protection System - Taiz (CPA-Taiz) is a full-stack platform designed to empower consumers in Taiz Governorate through smart monitoring tools, updated news, and dynamic price listings.

### 🏗️ System Architecture
- Frontend: React 19 + Tailwind CSS + Framer Motion
- Backend: Node.js + Express.js
- Database: MongoDB (NoSQL)
- Security: JWT (JSON Web Tokens) + Bcrypt for password hashing

### 🛠️ Prerequisites & Setup
- Node.js: Version 18 or higher
- MongoDB: Version 6.0 or higher (local installation or MongoDB Atlas)
- SSL Certificate: Mandatory in production for camera barcode scanning and geolocation features

### 🚀 Backend Setup

1. Create backend directory and initialize the project:
   ```bash
   mkdir backend && cd backend
   npm init -y
````

2. Install necessary dependencies:

   ```bash
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

3. Create `.env` file inside `/backend` folder with the following content:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

4. Define Mongoose models for Users, Prices, News, and Violations as per project needs.

5. Seed an initial admin user (run once):

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

### 🌐 Production Deployment on Ubuntu with Hestia Control Panel v1.9.4

1. Upload frontend build (e.g., `dist`) and backend files to:

   * Frontend: `/home/cpa-ye/web/cpa-ye.org/public_html`
   * Backend: `/home/cpa-ye/web/cpa-ye.org/backend`

2. Set proper file permissions:

   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. Configure domain and SSL via Hestia:

   * Ensure domain points to `/public_html`
   * Enable SSL certificate with Let’s Encrypt

4. Configure Nginx or Apache rewrite rules to support React SPA routing:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
   }
   ```

5. Run backend using PM2 process manager:

   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name cpa-backend
   pm2 startup
   pm2 save
   ```

6. Verify website access on:

   * [http://cpa-ye.org](http://cpa-ye.org)
   * [https://cpa-ye.org](https://cpa-ye.org) (SSL enabled)

---

### 🔒 Security Notes

* Browsers require HTTPS for camera and geolocation APIs to work.
* CORS policy should accept requests only from the frontend domain.
* Multer is used for file uploads; ensure upload directory has write permissions.

---

### ⚙️ Admin Control Panel Features

* Manage geo-located violation reports with status updates.
* Rich text editor for news and awareness campaigns.
* Dynamic price lists for official commodities.
* Real-time dashboard statistics on reports and violations.

---

### 📞 Technical Support

* Lead Developer: Raidan Pro
* Email: [support@cpa-ye.org](mailto:support@cpa-ye.org)
* Office: Taiz, Yemen

---

### © 2026 Consumer Protection Association - Taiz. All rights reserved.

---

## النسخة العربية

### نظرة عامة على المشروع

نظام حماية المستهلك - تعز هو منصة متكاملة تهدف إلى تمكين المستهلكين في محافظة تعز من خلال أدوات مراقبة ذكية، أخبار محدثة، وقوائم أسعار ديناميكية.

### 🏗️ هندسة النظام

* الواجهة الأمامية: React 19 + Tailwind CSS + Framer Motion
* الخادم الخلفي: Node.js + Express.js
* قاعدة البيانات: MongoDB (قاعدة بيانات NoSQL)
* الأمان: JWT (توكنات الويب الآمنة) + Bcrypt لتشفير كلمات المرور

### 🛠️ المتطلبات الأساسية والإعداد

* Node.js: الإصدار 18 أو أحدث
* MongoDB: الإصدار 6.0 أو أحدث (محلي أو عبر MongoDB Atlas)
* شهادة SSL: ضرورية في بيئة الإنتاج لعمل ماسح الباركود والكشف الجغرافي

### 🚀 إعداد الخادم الخلفي

1. إنشاء مجلد backend وتهيئة المشروع:

   ```bash
   mkdir backend && cd backend
   npm init -y
   ```

2. تثبيت الحزم المطلوبة:

   ```bash
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

3. إنشاء ملف `.env` داخل مجلد `/backend` بالمحتوى التالي:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

4. تعريف نماذج Mongoose للمستخدمين، الأسعار، الأخبار، والمخالفات.

5. إنشاء مستخدم مسؤول أولي (تشغيل مرة واحدة):

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
     console.log('✅ تم إنشاء المستخدم المسؤول بنجاح');
     process.exit();
   }
   seed();
   ```

---

### 🌐 النشر في بيئة الإنتاج على أوبونتو مع لوحة تحكم Hestia الإصدار 1.9.4

1. رفع ملفات الواجهة الأمامية (مثل مجلد `dist`) وملفات الخادم الخلفي إلى:

   * الواجهة الأمامية: `/home/cpa-ye/web/cpa-ye.org/public_html`
   * الخادم الخلفي: `/home/cpa-ye/web/cpa-ye.org/backend`

2. ضبط أذونات الملفات:

   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. إعداد الدومين وشهادة SSL عبر Hestia:

   * تأكد أن الدومين يشير إلى مجلد `/public_html`
   * تفعيل شهادة SSL المجانية من Let's Encrypt

4. تكوين قواعد إعادة التوجيه لـ Nginx أو Apache لدعم تطبيق React SPA:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
   }
   ```

5. تشغيل الخادم الخلفي باستخدام مدير العمليات PM2:

   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name cpa-backend
   pm2 startup
   pm2 save
   ```

6. التحقق من الوصول للموقع عبر:

   * [http://cpa-ye.org](http://cpa-ye.org)
   * [https://cpa-ye.org](https://cpa-ye.org) (مع تفعيل SSL)

---

### 🔒 ملاحظات الأمان

* تتطلب المتصفحات اتصال HTTPS ليعمل الكاميرا والكشف الجغرافي.
* سياسة CORS يجب أن تسمح فقط لطلبات من الدومين الرسمي للواجهة الأمامية.
* Multer يستخدم لرفع الملفات؛ تأكد من أن مجلد الرفع لديه صلاحيات الكتابة.

---

### ⚙️ ميزات لوحة التحكم الإدارية

* إدارة البلاغات الجغرافية مع تحديث حالة كل بلاغ.
* محرر نصوص غني لإدارة الأخبار وحملات التوعية.
* قوائم أسعار ديناميكية للسلع الرسمية.
* لوحة إحصائيات مباشرة تعرض البلاغات والمخالفات.

---

### 📞 الدعم الفني

* المطور الرئيسي: Raidan Pro
* البريد الإلكتروني: [support@cpa-ye.org](mailto:support@cpa-ye.org)
* المكتب: محافظة تعز، اليمن

---

© 2026 جمعية حماية المستهلك - تعز. جميع الحقوق محفوظة.

```

---

هل تريد أن أحول هذا النص إلى ملف PDF أو ملف نصي (TXT) يمكنك تحميله؟
```
