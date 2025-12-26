
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Info, MapPin, BarChart3, UserCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyPolicy: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Use any to bypass motion type issues in this environment
  const motionAny = motion as any;

  const sections = language === 'ar' ? [
    { icon: Info, title: "البيانات التي نجمعها", content: "نقوم بجمع بيانات مسح الباركود، الموقع الجغرافي عند الإبلاغ عن مخالفة، وتفاصيل البلاغات التي تقدمها." },
    { icon: BarChart3, title: "الغرض من جمع البيانات", content: "تُستخدم البيانات لمراقبة الأسعار في تعز، وتحديد مناطق المخالفات التجارية، وتحسين الرقابة الميدانية." },
    { icon: ShieldCheck, title: "أمن البيانات", content: "يتم تخزين جميع البيانات في خوادم مشفرة وآمنة، ولا يتم مشاركتها مع أي جهات خارجية غير مخولة." },
    { icon: UserCheck, title: "حقوق المستخدم", content: "يحق لك طلب حذف بيانات البلاغات الخاصة بك أو تصحيحها في أي وقت من خلال التواصل معنا." }
  ] : [
    { icon: Info, title: "Data Collection", content: "We collect barcode scan data, geolocation when reporting a violation, and details of reports submitted." },
    { icon: BarChart3, title: "Purpose", content: "Data is used to monitor market prices in Taiz, identify violation hotspots, and improve field inspections." },
    { icon: ShieldCheck, title: "Security", content: "Data is stored on encrypted, secure servers and is never shared with unauthorized third parties." },
    { icon: UserCheck, title: "User Rights", content: "You have the right to request deletion or correction of your reporting data at any time." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-16 font-cairo">
      <div className="container mx-auto max-w-4xl">
        {/* Fix: Using motionAny.div */}
        <motionAny.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-10 md:p-16 border-t-8 border-primary"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-primary mb-4">{t('privacy')}</h1>
            <p className="text-gray-500 font-medium">آخر تحديث: يناير 2024</p>
          </div>

          <div className="grid gap-12">
            {sections.map((sec, i) => (
              /* Fix: Using motionAny.div */
              <motionAny.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="p-4 bg-primary/10 text-primary rounded-2xl flex-shrink-0">
                  <sec.icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-3">{sec.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{sec.content}</p>
                </div>
              </motionAny.div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t flex flex-col items-center text-center">
            <h3 className="text-xl font-bold mb-4">للاستفسارات المتعلقة بالخصوصية</h3>
            <div className="flex gap-4 items-center bg-gray-50 px-6 py-3 rounded-full text-primary font-bold">
               <Mail size={20} />
               <span>privacy@cpa-ye.org</span>
            </div>
          </div>
        </motionAny.div>

        <div className="mt-8 text-center">
          <a href="#home" className="text-primary font-bold hover:underline">العودة للرئيسية</a>
        </div>
      </div>
    </div>
  );
};
