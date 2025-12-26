# 🛡️ نظام حماية المستهلك - تعز (CPA-Taiz)

هذا المشروع هو منصة متكاملة (Full-Stack) تهدف إلى تمكين المستهلك في محافظة تعز من خلال أدوات الرقابة الذكية، الأخبار، ودليل الأسعار المحدث.

---

## 🏗️ البنية التحتية (System Architecture)

- **Frontend:** React 19 + Tailwind CSS + Framer Motion.
- **Backend:** Node.js + Express.js.
- **Database:** MongoDB (NoSQL).
- **Security:** JWT (JSON Web Tokens) + Bcrypt لشفير كلمات المرور.

---

## 🛠️ متطلبات التشغيل (Prerequisites)

- **Node.js:** إصدار 18 أو أعلى.
- **MongoDB:** إصدار 6.0 أو أعلى (محلي أو MongoDB Atlas).
- **SSL Certificate:** ضروري لتشغيل الكاميرا (ماسح الباركود) وتحديد الموقع الجغرافي (Geolocation) في بيئة الإنتاج.

---

## 🚀 إعداد الخادم (Backend Setup)

1. **إنشاء مجلد الخادم:**
   قم بإنشاء مجلد باسم `backend` في الجذر وتثبيت الحزم الأساسية:
   ```bash
   mkdir backend && cd backend
   npm init -y
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

2. **ملف الإعدادات البيئية (`.env`):**
   قم بإنشاء ملف `.env` داخل مجلد `backend` وأضف القيم التالية:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

3. **هيكلية قاعدة البيانات (Mongoose Models):**
   - **User:** (name, email, password, role [admin/editor]).
   - **Price:** (code, barcode, nameAr, nameEn, price, categoryId).
   - **News:** (titleAr, titleEn, contentAr, contentEn, image, date).
   - **Violation:** (type, lat, lng, description, status, senderInfo).

---

## 🗄️ إعداد قاعدة البيانات (Database Logic)

### سكريبت إنشاء المدير الأول (Seeding Admin)
يجب تشغيل هذا السكريبت مرة واحدة لإنشاء حساب الإدارة:
```javascript
// backend/scripts/seed.js
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('Admin@Taiz2024', 10);
  await User.create({
    name: 'مدير النظام',
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

## 🌐 إعدادات الإنتاج (Production Deployment)

### 1. الروابط الحيوية (API endpoints)
تأكد من تغيير رابط `BASE_URL` في ملف `services/api.ts` ليشير إلى رابط السيرفر الحقيقي بدلاً من الموك:
```typescript
const BASE_URL = 'https://api.cpa-ye.org/api';
```

### 2. إدارة العمليات (PM2)
استخدم PM2 لضمان بقاء الخادم يعمل باستمرار:
```bash
npm install -g pm2
pm2 start server.js --name "cpa-backend"
```

### 3. إعداد Nginx (Reverse Proxy)
يُفضل استخدام Nginx لتوجيه الطلبات وتفعيل HTTPS:
```nginx
server {
    listen 443 ssl;
    server_name cpa-ye.org;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
    }

    location / {
        root /var/www/cpa-frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔒 ملاحظات أمنية وهامة

- **Camera & GPS:** المتصفحات الحديثة تمنع الوصول للكاميرا والموقع الجغرافي إلا عبر بروتوكول **HTTPS**. لن يعمل ماسح الباركود على روابط `http` العادية.
- **CORS:** تأكد من إعداد سياسة `cors` في الخادم للسماح فقط برابط الموقع الخاص بك.
- **Uploads:** تم استخدام `multer` في الخادم لمعالجة صور الأخبار، تأكد من وجود مجلد `uploads` بصلاحيات كتابة.

---

## 📞 الدعم الفني
في حال واجهت مشاكل في الربط، يرجى مراجعة سجلات الخادم عبر:
`pm2 logs cpa-backend`
