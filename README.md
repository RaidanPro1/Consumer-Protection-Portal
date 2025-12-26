
# 🛡️ Consumer Protection System - Taiz (CPA-Taiz)  
# نظام حماية المستهلك - تعز (CPA-Taiz)

---

![Release](https://img.shields.io/badge/Release-v2.6.0--Stable-emerald?style=for-the-badge)  
![Target](https://img.shields.io/badge/Target-Taiz_Markets-navy?style=for-the-badge)  
![Coverage](https://img.shields.io/badge/Coverage-100%25_Responsive-blueviolet?style=for-the-badge)

---

## English Version

### Project Overview  
The Consumer Protection System - Taiz (CPA-Taiz) is a comprehensive, full-stack web platform designed specifically to empower consumers within the Taiz Governorate. The system integrates smart monitoring tools, real-time news updates, and dynamic pricing guides to enhance transparency and consumer rights enforcement in local markets. It serves as both a citizen-facing interface and an administrative backend for regulators and market inspectors.

---

### 🏗️ System Architecture  

- **Frontend:**  
  Developed using React 19, enhanced with TypeScript for type safety, and styled with Tailwind CSS 3.4 to provide a modern, responsive, and accessible user interface. Framer Motion is integrated for smooth animations and transitions, improving the user experience.

- **Backend:**  
  Built on Node.js with Express.js framework, the backend exposes RESTful APIs for data interaction, user authentication, and administrative operations. It ensures scalability and modularity for future feature expansions.

- **Database:**  
  MongoDB (NoSQL) serves as the primary data store, supporting flexible schema design suitable for heterogeneous data types such as user profiles, price lists, violation reports, and news content.

- **Security:**  
  User authentication and authorization are managed through JSON Web Tokens (JWT), with passwords securely hashed using Bcrypt. The system adheres to best security practices including HTTPS enforcement, CORS policies, and input validation to safeguard user data.

- **Additional Features:**  
  Integration of HTML5 QR code scanning API for direct barcode scanning via device cameras, and GIS mapping services to plot geo-tagged violation reports for spatial analysis.

---

### 🛠️ Prerequisites & Setup Requirements  

Before proceeding with installation, ensure the following prerequisites are met:

- **Node.js:** Version 18 or later is required to support modern JavaScript features and compatibility with the project's dependencies.
- **MongoDB:** Version 6.0 or later, either installed locally or accessed through a cloud provider such as MongoDB Atlas.
- **SSL Certificate:** For production deployments, an SSL certificate is mandatory to enable HTTPS, which is required for camera access (barcode scanning) and geolocation features.
- **PM2:** Recommended for production process management to keep the backend service running and auto-restart on crashes.

---

### 🚀 Backend Setup Instructions  

1. **Create and initialize the backend directory:**  
   Open a terminal and run:  
   ```bash
   mkdir backend && cd backend
   npm init -y
   ```

2. **Install required Node.js packages:**  
   ```bash
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

3. **Environment configuration:**  
   Create a `.env` file inside the `backend` directory with the following parameters:  
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

   - Replace `your_super_secret_key_2024` with a strong secret key.
   - Adjust the `MONGO_URI` if using a remote or cloud-hosted database.

4. **Define MongoDB models:**  
   Implement Mongoose schemas for:
   - **Users:** To manage user roles such as admin, inspector, and citizen.
   - **Prices:** To store and update official commodity prices.
   - **News:** For managing announcements and consumer awareness content.
   - **Violations:** To track reported market violations including geolocation data and status.

5. **Seed initial administrator user:**  
   Create a script at `backend/scripts/seed.js` and run it once to create the initial admin account:  
   ```js
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

### 🌐 Production Deployment on Ubuntu Using Hestia Control Panel (v1.9.4)  

1. **Upload Files:**  
   - Upload the frontend build folder (typically `dist/`) to:  
     `/home/cpa-ye/web/cpa-ye.org/public_html`  
   - Upload backend files to:  
     `/home/cpa-ye/web/cpa-ye.org/backend`  

2. **Set correct permissions:**  
   Run the following commands to assign ownership and permissions suitable for web server operation:  
   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. **Configure domain and SSL:**  
   Use Hestia’s control panel to:  
   - Point your domain (e.g., `cpa-ye.org`) to the `/public_html` directory.  
   - Enable SSL via Let's Encrypt for secure HTTPS access.

4. **Nginx/Apache configuration for React SPA:**  
   Add the following rewrite rules to ensure React routing works correctly:  
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
   }
   ```

5. **Run backend with process manager (PM2):**  
   Install PM2 globally and start the backend service:  
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name cpa-backend
   pm2 startup
   pm2 save
   ```

6. **Verify deployment:**  
   Confirm site accessibility on both:  
   - `http://cpa-ye.org`  
   - `https://cpa-ye.org` (SSL secured)

---

### 🔒 Security Considerations  

- **HTTPS Enforcement:** Browsers require HTTPS to allow camera and geolocation APIs.  
- **CORS Policy:** Backend is configured to accept API requests only from the official frontend domain for security.  
- **File Uploads:** Multer middleware handles uploads, ensure directories have proper write permissions to prevent errors.

---

### ⚙️ Admin Control Panel Features  

- **Geolocated Violation Management:** Add, update, and resolve market violation reports with precise GPS data.  
- **Content Management:** Rich-text editor for publishing news and awareness campaigns.  
- **Price List Management:** Easily update and publish official commodity prices.  
- **Dashboard Analytics:** Real-time statistics and visualizations on reported issues and market conditions.

---

### 📞 Technical Support & Contacts  

- **Lead Developer:** Raidan Pro  
- **Support Email:** [support@cpa-ye.org](mailto:support@cpa-ye.org)  
- **Office Location:** Taiz, Yemen  

---

© 2026 Consumer Protection Association - Taiz. All rights reserved.

---

## النسخة العربية

### نظرة عامة على المشروع  
نظام حماية المستهلك - تعز هو منصة شاملة ومتطورة تهدف إلى تمكين المستهلكين في محافظة تعز، من خلال توفير أدوات مراقبة ذكية، تحديثات إخبارية مستمرة، وقوائم أسعار ديناميكية تعزز الشفافية وحماية حقوق المستهلك في الأسواق المحلية. يشمل النظام واجهة تفاعلية للمواطنين ولوحة إدارة متقدمة للمشرفين والمفتشين.

---

### 🏗️ هندسة النظام  

- **الواجهة الأمامية:**  
  تم تطويرها باستخدام React 19 مع TypeScript لضمان جودة التعليمات البرمجية، ويستخدم Tailwind CSS 3.4 لتوفير واجهة مستخدم حديثة ومتجاوبة. كما تم دمج مكتبة Framer Motion لتحسين الانسيابية والانتقالات.

- **الخادم الخلفي:**  
  يعتمد على Node.js مع إطار عمل Express.js، ويقدم واجهات RESTful لإدارة البيانات، التحقق من المستخدمين، والعمليات الإدارية. تم تصميمه ليكون قابلاً للتوسع مع المحافظة على الأداء العالي.

- **قاعدة البيانات:**  
  MongoDB (قاعدة بيانات NoSQL) تدعم التخزين المرن للبيانات المتنوعة مثل ملفات المستخدمين، قوائم الأسعار، تقارير المخالفات، والمحتوى الإخباري.

- **الأمان:**  
  تعتمد المنصة على JSON Web Tokens (JWT) لإدارة المصادقة والتفويض، مع تشفير كلمات المرور عبر مكتبة Bcrypt. يتم تطبيق أفضل ممارسات الأمان، بما في ذلك فرض HTTPS وسياسات CORS وفحص المدخلات.

- **ميزات إضافية:**  
  تضمين ماسح باركود باستخدام HTML5 QR Code API، بالإضافة إلى خدمات نظم المعلومات الجغرافية (GIS) لرصد وتوثيق المخالفات مع تحديد المواقع بدقة.

---

### 🛠️ المتطلبات الأساسية والإعداد  

قبل البدء بعملية التثبيت، تأكد من توفر المتطلبات التالية:

- **Node.js:** إصدار 18 أو أحدث لدعم ميزات حديثة.  
- **MongoDB:** إصدار 6.0 أو أحدث، يمكن أن يكون محليًا أو عبر خدمة MongoDB Atlas السحابية.  
- **شهادة SSL:** ضرورية لبيئة الإنتاج لتفعيل HTTPS الذي يشترط للوصول إلى كاميرا الجهاز وميزات تحديد الموقع الجغرافي.  
- **PM2:** يوصى باستخدامه لإدارة تشغيل تطبيق الخادم الخلفي في بيئة الإنتاج.

---

### 🚀 خطوات إعداد الخادم الخلفي  

1. **إنشاء مجلد Backend وتهيئة المشروع:**  
   افتح الطرفية ونفذ:  
   ```bash
   mkdir backend && cd backend
   npm init -y
   ```

2. **تثبيت الحزم الضرورية:**  
   ```bash
   npm install express mongoose dotenv cors jsonwebtoken bcryptjs multer
   ```

3. **إعداد ملف البيئة `.env`:**  
   داخل مجلد `/backend`، أنشئ ملف `.env` بالبيانات التالية:  
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/cpa_taiz
   JWT_SECRET=your_super_secret_key_2024
   NODE_ENV=production
   ```

4. **تعريف نماذج Mongoose:**  
   - المستخدمون (Users) بإدراج أدوار متعددة مثل المسؤول والمفتش والمستخدم العادي.  
   - الأسعار (Prices) لإدارة قوائم السلع الرسمية.  
   - الأخبار (News) لنشر الحملات التوعوية والمستجدات.  
   - المخالفات (Violations) لتسجيل البلاغات مع إحداثيات الموقع وحالة المعالجة.

5. **إنشاء مستخدم مسؤول أولي:**  
   قم بإنشاء سكريبت `seed.js` في مجلد `backend/scripts` ثم نفذه مرة واحدة:  
   ```js
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

### 🌐 النشر في بيئة الإنتاج باستخدام أوبونتو ولوحة تحكم Hestia (الإصدار 1.9.4)  

1. **رفع الملفات:**  
   - الواجهة الأمامية (`dist/`) إلى:  
     `/home/cpa-ye/web/cpa-ye.org/public_html`  
   - ملفات الخادم الخلفي إلى:  
     `/home/cpa-ye/web/cpa-ye.org/backend`  

2. **تعديل أذونات الملفات:**  
   ```bash
   sudo chown -R www-data:www-data /home/cpa-ye/web/cpa-ye.org/
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type d -exec chmod 755 {} \;
   sudo find /home/cpa-ye/web/cpa-ye.org/ -type f -exec chmod 644 {} \;
   ```

3. **إعداد الدومين وشهادة SSL:**  
   - تأكد من توجيه الدومين إلى مجلد `/public_html`.  
   - فعل شهادة SSL المجانية من Let's Encrypt عبر لوحة Hestia.

4. **تكوين قواعد إعادة التوجيه لـ Nginx أو Apache:**  
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-Content-Type-Options "nosniff";
   }
   ```

5. **تشغيل الخادم الخلفي عبر PM2:**  
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name cpa-backend
   pm2 startup
   pm2 save
   ```

6. **التأكد من عمل الموقع:**  
   - [http://cpa-ye.org](http://cpa-ye.org)  
   - [https://cpa-ye.org](https://cpa-ye.org) (مع تفعيل SSL)  

---

### 🔒 ملاحظات أمنية  

- HTTPS ضروري لتشغيل ميزات الكاميرا والتحديد الجغرافي في المتصفح.  
- سياسة CORS مفعلة للسماح بالطلبات فقط من نطاق الواجهة الأمامية الرسمي.  
- تأكد من صلاحيات مجلد رفع الملفات حتى يعمل Multer بدون مشاكل.

---

### ⚙️ ميزات لوحة الإدارة  

- إدارة البلاغات الميدانية مع دعم تحديد الموقع وتحديث الحالة.  
- محرر نصوص متقدم للنشرات والأخبار التوعوية.  
- قوائم أسعار محدثة وسهلة التعديل للسلع الأساسية.  
- لوحة تحكم تعرض إحصائيات وتقارير في الوقت الفعلي.

---

### 📞 الدعم الفني  

- المطور الرئيسي: Raidan Pro  
- البريد الإلكتروني: [support@cpa-ye.org](mailto:support@cpa-ye.org)  
- المكتب: محافظة تعز، اليمن  

---

© 2026 جمعية حماية المستهلك - تعز. جميع الحقوق محفوظة.
