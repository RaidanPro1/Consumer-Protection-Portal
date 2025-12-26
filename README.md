# 🛡️ Consumer Protection System - Taiz (CPA-Taiz)  
# نظام حماية المستهلك - تعز (CPA-Taiz)

---

![Release](https://img.shields.io/badge/Release-v2.6.0--Stable-emerald?style=for-the-badge)  
![Target](https://img.shields.io/badge/Target-Taiz_Markets-navy?style=for-the-badge)  
![Coverage](https://img.shields.io/badge/Coverage-100%25_Responsive-blueviolet?style=for-the-badge)

---

## English Version

### Project Overview  
Consumer Protection System - Taiz (CPA-Taiz) is a comprehensive full-stack platform designed to empower consumers in Taiz Governorate by providing smart monitoring tools, updated news, and dynamic price listings.

### 🏗️ System Architecture  
- **Frontend:** React 19 + Tailwind CSS + Framer Motion  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (NoSQL)  
- **Security:** JWT (JSON Web Tokens) + Bcrypt for password hashing  

### 🛠️ Prerequisites & Setup  
- Node.js (v18+)  
- MongoDB (v6.0+) - Local or MongoDB Atlas  
- SSL Certificate (mandatory for barcode scanning and geolocation in production)  

### 🚀 Backend Setup  

1. Create backend folder and initialize the project:  
   ```bash
   mkdir backend && cd backend
   npm init -y
````

2. Install dependencies:

   ```bash
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

3. Create `.env` file in `/backend` directory:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

4. Define Mongoose models for Users, Prices, News, and Violations.

5. Seed initial admin user (run once):

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

### 🌐 Production Deployment on Ubuntu with Hestia Control Panel (v1.9.4)

1. Upload frontend build (`dist/`) and backend files to:

   * Frontend: `/home/cpa-ye/web/cpa-ye.org/public_html`
   * Backend: `/home/cpa-ye/web/cpa-ye.org/backend`

2. Set file permissions:

   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. Configure domain and SSL via Hestia:

   * Point domain to `/public_html` directory
   * Enable SSL with Let’s Encrypt

4. Configure Nginx/Apache rewrite rules for React SPA routing:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
   }
   ```

5. Run backend with PM2:

   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name cpa-backend
   pm2 startup
   pm2 save
   ```

6. Verify site access:

   * [http://cpa-ye.org](http://cpa-ye.org)
   * [https://cpa-ye.org](https://cpa-ye.org) (SSL enabled)

---

### 🔒 Security Notes

* HTTPS is mandatory for camera and geolocation API access.
* CORS policy configured to accept requests only from the frontend domain.
* Multer handles file uploads; ensure upload directory has write permissions.

---

### ⚙️ Admin Control Panel Features

* Manage geo-located violation reports with status updates.
* Rich text news editor for awareness campaigns.
* Dynamic price lists for official commodities.
* Real-time dashboard statistics.

---

### 📞 Technical Support

* Lead Developer: Raidan Pro
* Email: [support@cpa-ye.org](mailto:support@cpa-ye.org)
* Office: Taiz, Yemen

---

© 2026 Consumer Protection Association - Taiz. All rights reserved.

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

* Node.js الإصدار 18 أو أحدث
* MongoDB الإصدار 6.0 أو أحدث (محلي أو عبر MongoDB Atlas)
* شهادة SSL ضرورية في بيئة الإنتاج لعمل ماسح الباركود والكشف الجغرافي

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

3. إنشاء ملف `.env` داخل مجلد `/backend`:

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

### 🌐 النشر في بيئة الإنتاج على أوبونتو مع لوحة تحكم Hestia (الإصدار 1.9.4)

1. رفع ملفات الواجهة الأمامية (`dist/`) وملفات الخادم الخلفي إلى:

   * الواجهة الأمامية: `/home/cpa-ye/web/cpa-ye.org/public_html`
   * الخادم الخلفي: `/home/cpa-ye/web/cpa-ye.org/backend`

2. ضبط أذونات الملفات:

   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. إعداد الدومين وشهادة SSL عبر Hestia:

   * تأكد من توجيه الدومين إلى مجلد `/public_html`
   * تفعيل شهادة SSL المجانية من Let's Encrypt

4. تكوين قواعد إعادة التوجيه لـ Nginx أو Apache لدعم تطبيق React SPA:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
   }
   ```

5. تشغيل الخادم الخلفي باستخدام PM2:

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

* يتطلب المتصفح اتصال HTTPS لتفعيل الكاميرا وميزة الكشف الجغرافي.
* سياسة CORS يجب أن تسمح فقط للطلبات من الدومين الرسمي للواجهة الأمامية.
* Multer تُستخدم لرفع الملفات؛ تأكد من صلاحيات مجلد التحميل.

---

### ⚙️ ميزات لوحة التحكم الإدارية

* إدارة البلاغات الجغرافية مع تحديث الحالة.
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

يمكنك نسخ هذا الملف كما هو ووضعه مباشرة في ملف `README.md` في مستودع GitHub الخاص بك ليكون دليلاً مرجعياً شاملاً ومفصلاً.  
هل ترغب في أن أساعدك بتحويله إلى ملف جاهز للتحميل؟
```
