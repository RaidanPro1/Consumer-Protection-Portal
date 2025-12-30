
import { 
  TranslationDictionary, 
  NewsItem, 
  Publication, 
  ServiceItem, 
  PriceItem, 
  PriceCategory, 
  PrivacyPolicyContent, 
  TeamMember, 
  AboutUsContent,
  JobItem,
  VolunteerContent,
  DonationMethod,
  SiteStatistics,
  SiteSettings,
  SuccessStory,
  Testimonial,
  Violation
} from './types';

export const DEFAULT_LOGO = "https://i.ibb.co/VpMTT0M6/logo.png";

export const TRANSLATIONS: TranslationDictionary = {
  ar: {
    brandName: "حماية المستهلك - تعز",
    home: "الرئيسية",
    news: "الأخبار",
    library: "المكتبة",
    prices: "الأسعار",
    report: "بلاغ مخالفة",
    admin: "الإدارة",
    scan_barcode: "فحص السعر",
    scan_desc: "وجه الكاميرا نحو باركود المنتج للتأكد من سعره",
    privacy: "الخصوصية",
    about: "عن الجمعية",
    team: "فريق العمل",
    jobs: "فرص العمل",
    volunteering: "التطوع",
    donations: "دعمنا",
    stats: "أرقامنا",
    total_reports: "بلاغات المستهلكين",
    verified_reports: "مخالفات تم ضبطها",
    active_violations: "حملات جارية",
    success_stories: "إنجازات الرقابة",
    testimonials: "صوت المستهلك",
    manage_keywords: "SEO",
    site_config: "الإعدادات",
    heroTitle1: "استقرار الأسعار.. مسؤوليتنا جميعاً",
    heroSub1: "نعمل في ميدان تعز لنضمن وصول السلع إليك بالسعر العادل والجودة المطلوبة.",
    cta_report: "تقديم بلاغ فوري",
    cta_prices: "استعراض قائمة الأسعار",
    services_title: "ماذا نقدم للمجتمع؟",
    news_title: "آخر أخبار الرقابة",
    read_more: "اقرأ المزيد ←",
    gallery_title: "العمل الميداني",
    pubs_title: "النشرات والتعاميم",
    download: "تحميل المستند",
    footer_about: "عن الجمعية",
    footer_desc: "كيان مجتمعي يهدف للدفاع عن حقوق المستهلك وتوعيته وحمايته من الاحتكار والغش في محافظة تعز.",
    footer_contact: "تواصل معنا",
    rights: "جميع الحقوق محفوظة لجمعية حماية المستهلك - تعز © 2024",
    tickerText: "تنبه: حملة رقابية شاملة تستهدف أسواق اللحوم في شارع جمال ووسط المدينة | تأكد من وجود ختم البلدية قبل الشراء | الإبلاغ عن مخالفة حق وواجب",
    report_title: "نموذج البلاغ الرقمي",
    product_name: "السلعة / المنتج",
    shop_name: "اسم المنشأة التجارية",
    price: "السعر المدفوع",
    details: "وصف المخالفة بالتفصيل",
    location: "موقع المحل / السوق",
    submit: "إرسال البلاغ للعمليات",
    loc_fetching: "جاري تحديد الموقع...",
    loc_success: "تم التقاط الموقع بنجاح",
    admin_dashboard: "لوحة التحكم",
    manage_news: "إدارة الأخبار",
    manage_prices: "تحديث الأسعار",
    manage_categories: "تصنيفات السلع",
    logout: "تسجيل الخروج",
    map_title: "خارطة الرصد الميداني للمخالفات",
    filter_type: "نوع المخالفة",
    filter_date: "تاريخ الرصد",
    price_min: "أقل سعر",
    price_max: "أعلى سعر",
    suggestions_title: "سلع قد تبحث عنها",
    ai_assistant_title: "المساعد الذكي",
    ai_assistant_placeholder: "اسأل عن أسعار السلع أو حقوقك...",
    ai_assistant_welcome: "مرحباً بك! أنا مساعدك الذكي في جمعية حماية المستهلك - تعز. كيف يمكنني مساعدتك اليوم؟",
  },
  en: {
    brandName: "CPA - Taiz",
    home: "Home",
    news: "News",
    library: "Library",
    prices: "Prices",
    report: "Report",
    admin: "Admin",
    scan_barcode: "Check Price",
    scan_desc: "Point camera at barcode to verify official price",
    privacy: "Privacy",
    about: "About Us",
    team: "Our Team",
    jobs: "Jobs",
    volunteering: "Volunteer",
    donations: "Support Us",
    stats: "Stats",
    total_reports: "Consumer Reports",
    verified_reports: "Seized Violations",
    active_violations: "Ongoing Campaigns",
    success_stories: "Monitoring Success",
    testimonials: "Voice of Consumer",
    manage_keywords: "SEO",
    site_config: "Config",
    heroTitle1: "Price Stability is Our Responsibility",
    heroSub1: "We work in Taiz to ensure you get goods at fair prices and required quality.",
    cta_report: "Report Now",
    cta_prices: "Browse Price List",
    services_title: "Our Services",
    news_title: "Latest Monitoring News",
    read_more: "Read More ←",
    gallery_title: "Field Operations",
    pubs_title: "Bulletins",
    download: "Download",
    footer_about: "About Us",
    footer_desc: "A community entity aiming to defend consumer rights and protect against monopoly in Taiz.",
    footer_contact: "Contact Us",
    rights: "CPA-Taiz All Rights Reserved © 2024",
    tickerText: "Notice: Comprehensive monitoring campaign targeting meat markets in Jamal Street | Verify official stamp before purchase",
    report_title: "Digital Report Form",
    product_name: "Product / Item",
    shop_name: "Store Name",
    price: "Observed Price",
    details: "Violation Details",
    location: "Location / Market",
    submit: "Submit to Ops",
    loc_fetching: "Locating...",
    loc_success: "Location Captured",
    admin_dashboard: "Dashboard",
    manage_news: "News",
    manage_prices: "Prices",
    manage_categories: "Categories",
    logout: "Logout",
    map_title: "Field Monitoring Map",
    filter_type: "Type",
    filter_date: "Date",
    price_min: "Min Price",
    price_max: "Max Price",
    suggestions_title: "Suggested Items",
    ai_assistant_title: "Smart Assistant",
    ai_assistant_placeholder: "Ask about prices or your rights...",
    ai_assistant_welcome: "Welcome! I am your AI Assistant for the Consumer Protection Association - Taiz. How can I help you today?",
  }
};

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    titleAr: "ضبط معمل حلويات منتهي الصلاحية",
    titleEn: "Expired Candy Factory Seized",
    descAr: "بالتنسيق مع الجهات الأمنية، تم إتلاف 2 طن من المواد الأولية المنتهية في منطقة بير باشا وإغلاق المنشأة.",
    descEn: "In coordination with security forces, 2 tons of expired materials were destroyed in Bir Basha.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    titleAr: "إعادة ضبط أسعار الدقيق",
    titleEn: "Flour Price Stabilization",
    descAr: "نجحت الجمعية في إلزام تجار الجملة في سوق المركزي بالالتزام بالسعر الرسمي بعد بلاغات مكثفة.",
    descEn: "Successfully forced wholesalers in Central Market to adhere to official prices.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 3,
    titleAr: "حملة الرقابة على المخابز",
    titleEn: "Bakery Monitoring Campaign",
    descAr: "تفتيش مفاجئ لأكثر من 40 مخبزاً في مديرية القاهرة لضمان التزام الأوزان والأسعار.",
    descEn: "Sudden inspection of 40 bakeries in Al-Qahira district for weight adherence.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
  }
];

export const MOCK_PRICES: PriceItem[] = [
  { id: 1, code: "F01", barcode: "12345678", nameAr: "دقيق السعيد 10كجم", nameEn: "Al-Saeed Flour 10kg", price: 4800, categoryId: 1, lastUpdated: "2024-05-20" },
  { id: 2, code: "F02", barcode: "12345679", nameAr: "سكر الأسرة 5كجم", nameEn: "Al-Osra Sugar 5kg", price: 3500, categoryId: 1, lastUpdated: "2024-05-20" },
  { id: 3, code: "O01", barcode: "12345681", nameAr: "زيت شروق 1.5 لتر", nameEn: "Shurooq Oil 1.5L", price: 2900, categoryId: 1, lastUpdated: "2024-05-20" },
  { id: 4, code: "M01", barcode: "12345680", nameAr: "باراسيتامول 500ملجم", nameEn: "Paracetamol 500mg", price: 1500, categoryId: 2, lastUpdated: "2024-05-19" },
  { id: 5, code: "M02", barcode: "12345682", nameAr: "أموكسيسيلين 500ملجم", nameEn: "Amoxicillin 500mg", price: 3200, categoryId: 2, lastUpdated: "2024-05-19" },
];

export const NEWS_DATA: NewsItem[] = [
  { 
    id: 1, 
    date: "2024-05-18", 
    titleAr: "اجتماع طارئ لمناقشة تذبذب أسعار الصرف وأثره على السوق", 
    titleEn: "Emergency Meeting on Exchange Rates",
    descAr: "ترأس رئيس الجمعية اجتماعاً مع ممثلي الغرفة التجارية لمناقشة استقرار أسعار المواد الأساسية.",
    descEn: "CPA president met with Chamber of Commerce to discuss stability of essentials.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 2, 
    date: "2024-05-15", 
    titleAr: "إتلاف كميات كبيرة من الأدوية المهربة في تعز", 
    titleEn: "Large Quantity of Smuggled Meds Destroyed",
    descAr: "تمت عملية الإتلاف بحضور لجنة من الصحة والبيئة بعد ضبطها في مداخل المدينة.",
    descEn: "Destroyed in presence of health committee after seizure at city entrances.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 3, 
    date: "2024-05-12", 
    titleAr: "إطلاق تطبيق حماية المستهلك للهواتف الذكية", 
    titleEn: "Consumer Protection App Launched",
    descAr: "أصبح بإمكان المواطنين الآن فحص الأسعار وتقديم البلاغات مباشرة عبر التطبيق الجديد.",
    descEn: "Citizens can now check prices and report violations via the new mobile app.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
  }
];

export const MOCK_VIOLATIONS: Violation[] = [
  { id: 1, lat: 13.5783, lng: 44.0135, typeAr: "تلاعب بالأسعار", typeEn: "Price Manipulation", date: "2024-05-15", descriptionAr: "بيع الدقيق بسعر 5500 بدلاً من 4800", descriptionEn: "Selling flour at 5500 instead of 4800", status: "verified" },
  { id: 2, lat: 13.5850, lng: 44.0200, typeAr: "غش تجاري", typeEn: "Commercial Fraud", date: "2024-05-16", descriptionAr: "إعادة تعبئة أرز مجهول المصدر في أكياس ماركة معروفة", descriptionEn: "Repackaging unknown rice in branded bags", status: "pending" },
  { id: 3, lat: 13.5650, lng: 44.0000, typeAr: "احتكار", typeEn: "Monopoly", date: "2024-05-14", descriptionAr: "امتناع عن بيع حليب الأطفال بحجة نفاذ الكمية", descriptionEn: "Refusal to sell baby formula claiming out of stock", status: "resolved" }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, nameAr: "أحمد سيف", nameEn: "Ahmed Saif", roleAr: "مواطن - حي الروضة", roleEn: "Citizen - Rawda", feedbackAr: "سرعة الاستجابة للبلاغ كانت مذهلة، تم إنصافي واستعادة فارق السعر من المحل.", feedbackEn: "Response speed was amazing, I was compensated for the price difference.", image: "https://i.pravatar.cc/150?u=ahmed" },
  { id: 2, nameAr: "د. هدى القدسي", nameEn: "Dr. Huda Qudsi", roleAr: "طبيبة صيدلانية", roleEn: "Pharmacist", feedbackAr: "جهود الجمعية في ملاحقة الأدوية المهربة والمنتهية تحمي أرواح الآلاف في تعز.", feedbackEn: "Association's efforts in tracking smuggled meds protect thousands of lives.", image: "https://i.pravatar.cc/150?u=huda" }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, nameAr: "أ. محمد علي", nameEn: "Mohammad Ali", roleAr: "رئيس الجمعية", roleEn: "President", bioAr: "خبير في الرقابة التجارية لأكثر من 15 عاماً.", bioEn: "Expert in commercial monitoring for over 15 years.", image: "https://i.pravatar.cc/150?u=moali" },
  { id: 2, nameAr: "م. نادية عبده", nameEn: "Nadia Abdo", roleAr: "مسؤولة الرصد الميداني", roleEn: "Field Monitoring Lead", bioAr: "متخصصة في جودة المواد الغذائية وإدارة فرق التفتيش.", bioEn: "Specialist in food quality and inspection team management.", image: "https://i.pravatar.cc/150?u=nadia" }
];

export const ABOUT_US_DATA: AboutUsContent = {
  missionAr: "حماية المستهلك من الغش والاحتكار وضمان استقرار الأسعار في محافظة تعز من خلال الرصد والتوعية.",
  missionEn: "Protecting consumers from fraud and monopoly and ensuring price stability in Taiz.",
  visionAr: "أن نكون المرجع الأول والرقيب الأمين لحقوق المستهلك في اليمن.",
  visionEn: "To be the primary reference and faithful guardian of consumer rights in Yemen.",
  valuesAr: "النزاهة، الشفافية، العدالة، والخدمة الطوعية.",
  valuesEn: "Integrity, Transparency, Fairness, and Voluntary Service."
};

export const JOB_LISTINGS: JobItem[] = [
  {
    id: 1,
    titleAr: "مراقب ميداني - مديرية القاهرة",
    titleEn: "Field Inspector - Al Qahira",
    descAr: "القيام بجولات تفتيشية دورية على المحلات التجارية لرصد الأسعار.",
    descEn: "Conduct regular inspection tours of retail shops to monitor prices.",
    requirementsAr: "شهادة جامعية، قدرة على العمل الميداني، مهارات تواصل ممتازة.",
    requirementsEn: "Bachelor's degree, ability to work in field, excellent communication skills.",
    instructionsAr: "يرجى إرسال السيرة الذاتية عبر البريد الإلكتروني للجمعية.",
    instructionsEn: "Please send your CV via the association's email.",
    keywordsAr: "وظائف, مراقب, تعز",
    keywordsEn: "jobs, inspector, Taiz"
  }
];

export const VOLUNTEER_DATA: VolunteerContent = {
  titleAr: "كن عيناً للمجتمع",
  titleEn: "Be the Community Eye",
  descAr: "انضم إلى فريق المتطوعين وساهم في رصد الأسعار وتوعية جيرانك بحقوقهم.",
  descEn: "Join our volunteer team and contribute to price monitoring and awareness.",
  contactEmail: "volunteer@cpa-ye.org"
};

export const DONATION_METHODS: DonationMethod[] = [
  { id: 1, titleAr: "حساب بنك الكريمي", titleEn: "Kuraimi Bank", detailsAr: "حساب رقم: 12345678 - باسم جمعية حماية المستهلك تعز", detailsEn: "Account: 12345678 - CPA Taiz", methodType: 'bank' },
  { id: 2, titleAr: "كاش (محفظة موبايل)", titleEn: "Kuraimi Cash", detailsAr: "777000000", detailsEn: "777000000", methodType: 'wallet' }
];

export const INITIAL_STATS: SiteStatistics = {
  totalReports: 12450,
  verifiedDiscrepancies: 4820,
  activeViolations: 15
};

export const INITIAL_SETTINGS: SiteSettings = {
  brandNameAr: "حماية المستهلك - تعز",
  brandNameEn: "CPA - Taiz",
  primaryColor: "#0A2647", // New Deep Blue
  accentColor: "#FFB100", // New Gold
  showStatsOnHome: true,
  animations: { type: 'slide', speed: 0.6, enabled: true },
  logoUrl: DEFAULT_LOGO,
  metaKeywordsAr: "حماية المستهلك, تعز, اليمن, مراقبة الأسعار, بلاغات, غش تجاري",
  metaKeywordsEn: "consumer protection, Taiz, Yemen, price monitoring, reports, fraud"
};

export const PRIVACY_POLICY: PrivacyPolicyContent = {
  titleAr: "سياسة الخصوصية",
  titleEn: "Privacy Policy",
  contentAr: "نحن في جمعية حماية المستهلك - تعز نلتزم بأعلى معايير السرية لبيانات المبلغين، ولا يتم الكشف عن هويتهم لأي جهة تجارية.",
  contentEn: "We at CPA-Taiz are committed to the highest standards of confidentiality for whistleblowers."
};

export const PRICE_CATEGORIES: PriceCategory[] = [
  { id: 1, nameAr: "المواد الغذائية", nameEn: "Food Items" },
  { id: 2, nameAr: "الأدوية", nameEn: "Medicines" },
  { id: 3, nameAr: "اللحوم والخضروات", nameEn: "Meat & Veg" },
];

export const SERVICES_DATA: ServiceItem[] = [
  { id: 1, icon: 'search', titleAr: 'الرصد اليومي', titleEn: 'Daily Monitoring', descAr: 'نتابع تغيرات الأسعار في أسواق تعز لحظة بلحظة.', descEn: 'Tracking price changes in Taiz markets moment by moment.' },
  { id: 2, icon: 'balance', titleAr: 'العدالة السعرية', titleEn: 'Price Justice', descAr: 'نتدخل قانونياً لضبط الأسعار وضمان عدم استغلال المواطن.', descEn: 'Legal intervention to stabilize prices and prevent exploitation.' },
  { id: 3, icon: 'bullhorn', titleAr: 'التوعية المستمرة', titleEn: 'Continuous Awareness', descAr: 'ننشر حقوقك عبر البروشورات والمنصات الرقمية لتععرف حقك.', descEn: 'Broadcasting your rights across digital platforms.' }
];

export const PUBLICATIONS_DATA: Publication[] = [
  { id: 1, type: 'pdf', titleKey: 'اللائحة التنظيمية لحقوق المستهلك', size: '1.2 MB' },
  { id: 2, type: 'excel', titleKey: 'دليل الأسعار المرجعي - مايو 2024', size: '450 KB' },
];
