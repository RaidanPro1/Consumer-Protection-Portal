
import { 
  TranslationDictionary, 
  NewsItem, 
  Publication, 
  ServiceItem, 
  PriceItem, 
  PriceCategory, 
  HeroSlide, 
  PrivacyPolicyContent, 
  TeamMember, 
  AboutUsContent,
  JobItem,
  VolunteerContent,
  DonationMethod,
  SiteStatistics,
  SiteSettings,
  SuccessStory,
  Testimonial
} from './types';

// Using the provided logo image as the default
const DEFAULT_LOGO = "https://i.ibb.co/VpMTT0M6/logo.png";

export const TRANSLATIONS: TranslationDictionary = {
  ar: {
    brandName: "حماية المستهلك - تعز",
    home: "الرئيسية",
    news: "الأخبار",
    library: "المكتبة",
    prices: "الأسعار",
    report: "بلاغ مخالفة",
    admin: "لوحة الإدارة",
    scan_barcode: "مسح باركود",
    scan_desc: "تأكد من السعر الرسمي للمنتج",
    privacy: "الخصوصية",
    about: "من نحن",
    team: "فريقنا",
    jobs: "وظائف",
    volunteering: "تطوع",
    donations: "تبرعات",
    stats: "إحصائيات",
    total_reports: "إجمالي البلاغات",
    verified_reports: "بلاغات مؤكدة",
    active_violations: "مخالفات نشطة",
    success_stories: "إنجازاتنا",
    testimonials: "قالوا عنا",
    manage_keywords: "إدارة الكلمات الدلالية (SEO)",
    site_config: "إعدادات الموقع",
    seo_title: "تحسين محركات البحث",
    
    heroTitle1: "سوق آمن.. مستهلك محمي",
    heroSub1: "جمعيتنا هي حصنك المنيع ضد الجشع والغش التجاري في تعز.",
    cta_report: "بلغ الآن",
    cta_prices: "دليل الأسعار",

    services_title: "ماذا نقدم؟",
    news_title: "آخر المستجدات",
    read_more: "التفاصيل ←",

    gallery_title: "معرض الصور",
    pubs_title: "اللوائح والإصدارات",
    download: "تحميل",

    footer_about: "نبذة عن الجمعية",
    footer_desc: "منظمة مدنية طوعية لحماية حقوق ومصالح المستهلك في محافظة تعز.",
    footer_contact: "اتصل بنا",
    rights: "جميع الحقوق محفوظة © 2024 لجمعية حماية المستهلك - تعز.",

    tickerText: "+++ عاجل: رصد مخالفات سعرية في سوق الجملة والبدء بالإجراءات القانونية +++ تأكد من الباركود قبل الشراء +++",
    
    report_title: "إبلاغ عن مخالفة",
    product_name: "المنتج",
    shop_name: "اسم المحل",
    price: "السعر المرصود",
    details: "وصف المخالفة",
    location: "الموقع الجغرافي",
    submit: "إرسال البلاغ",
    loc_fetching: "تحديد الموقع...",
    loc_success: "تم تحديد الموقع",
    
    admin_dashboard: "الرئيسية",
    manage_news: "الأخبار",
    manage_prices: "الأسعار",
    manage_categories: "الأصناف",
    logout: "خروج",
    confirm_logout: "تأكيد الخروج",
    logout_desc: "هل تود مغادرة لوحة التحكم؟",
    cancel: "إلغاء",
    bulk_delete: "حذف محدد",
    confirm_delete: "تأكيد الحذف"
  },
  en: {
    brandName: "CPA - Taiz",
    home: "Home",
    news: "News",
    library: "Gallery",
    prices: "Prices",
    report: "Report",
    admin: "Admin",
    scan_barcode: "Scan Barcode",
    scan_desc: "Verify official price",
    privacy: "Privacy",
    about: "About",
    team: "Team",
    jobs: "Jobs",
    volunteering: "Volunteer",
    donations: "Donate",
    stats: "Stats",
    total_reports: "Total Reports",
    verified_reports: "Verified",
    active_violations: "Violations",
    success_stories: "Impact",
    testimonials: "Testimonials",
    manage_keywords: "SEO Management",
    site_config: "Site Settings",
    seo_title: "SEO Settings",

    heroTitle1: "Safe Market, Protected Consumer",
    heroSub1: "Your shield against greed and commercial fraud in Taiz.",
    cta_report: "Report Violation",
    cta_prices: "Price List",

    services_title: "Our Services",
    news_title: "Latest Updates",
    read_more: "Read More →",

    gallery_title: "Gallery",
    pubs_title: "Publications",
    download: "Download",

    footer_about: "About Association",
    footer_desc: "Voluntary civil organization protecting consumers in Taiz.",
    footer_contact: "Contact",
    rights: "© 2024 CPA - Taiz. All Rights Reserved.",

    tickerText: "+++ Urgent: Monitoring price violations in wholesale markets +++ Check barcode before buying +++",
    
    report_title: "Report Violation",
    product_name: "Product",
    shop_name: "Shop Name",
    price: "Price",
    details: "Details",
    location: "Location",
    submit: "Submit",
    loc_fetching: "Locating...",
    loc_success: "Located",
    
    admin_dashboard: "Dashboard",
    manage_news: "News",
    manage_prices: "Prices",
    manage_categories: "Categories",
    logout: "Logout",
    confirm_logout: "Logout?",
    logout_desc: "Confirm exit to home.",
    cancel: "Cancel",
    bulk_delete: "Delete Selected",
    confirm_delete: "Confirm"
  }
};

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    titleAr: "إغلاق معمل حلويات مخالف",
    titleEn: "Closing a Violating Candy Factory",
    descAr: "تم ضبط واستبعاد كميات كبيرة من المواد الفاسدة وإغلاق المنشأة فوراً.",
    descEn: "Seized large quantities of spoiled materials and closed the facility immediately.",
    image: "https://picsum.photos/seed/success1/800/600",
    keywordsAr: "إغلاق, مخالفة, تعز, حماية المستهلك",
    keywordsEn: "closure, violation, Taiz, consumer protection"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    nameAr: "علي الحميري",
    nameEn: "Ali Al-Himiari",
    roleAr: "مواطن",
    roleEn: "Citizen",
    feedbackAr: "خدمة رائعة، شعرت بالأمان عند التأكد من الأسعار عبر الباركود.",
    feedbackEn: "Great service, I felt safe verifying prices via barcode.",
    image: "https://i.pravatar.cc/150?u=ali"
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    titleAr: "سوق آمن.. مستهلك محمي",
    titleEn: "Safe Market, Protected Consumer",
    subAr: "حصنك المنيع ضد الجشع والغش التجاري.",
    subEn: "Your shield against greed and fraud."
  }
];

export const ABOUT_US_DATA: AboutUsContent = {
  missionAr: "رسالتنا هي حماية المستهلك في تعز من الغش والاحتكار.",
  missionEn: "Protecting consumers in Taiz from fraud and monopoly.",
  visionAr: "نسعى لتكون تعز نموذجاً في الالتزام السعري والجودة.",
  visionEn: "Striving for Taiz to be a model in price compliance and quality.",
  valuesAr: "النزاهة، الشفافية، العدالة.",
  valuesEn: "Integrity, Transparency, Fairness."
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    nameAr: "أ. محمد عبدالباقي",
    nameEn: "Mohammad Abdulbaqi",
    roleAr: "رئيس الجمعية",
    roleEn: "President",
    bioAr: "خبير في الرقابة التجارية منذ 15 عاماً.",
    bioEn: "Expert in commercial monitoring for 15 years.",
    image: "https://i.pravatar.cc/150?u=moh"
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  showStatsOnHome: true,
  animations: {
    type: 'slide',
    speed: 0.6,
    enabled: true
  },
  logoUrl: DEFAULT_LOGO,
  metaKeywordsAr: "حماية المستهلك, تعز, اليمن, مراقبة الأسعار, بلاغات",
  metaKeywordsEn: "consumer protection, Taiz, Yemen, price monitoring, reports"
};

export const JOB_LISTINGS: JobItem[] = [
  {
    id: 1,
    titleAr: "مراقب ميداني",
    titleEn: "Field Inspector",
    descAr: "رصد الأسعار في الأسواق المحلية.",
    descEn: "Monitoring prices in local markets.",
    requirementsAr: "شهادة جامعية، دقة ملاحظة.",
    requirementsEn: "Degree required, high observation skills.",
    instructionsAr: "يرجى تقديم السيرة الذاتية عبر الإيميل.",
    instructionsEn: "Submit CV via email.",
    keywordsAr: "وظائف, مراقب, تعز",
    keywordsEn: "jobs, inspector, Taiz"
  }
];

export const VOLUNTEER_DATA: VolunteerContent = {
  titleAr: "كن معنا متطوعاً",
  titleEn: "Volunteer with Us",
  descAr: "ساهم في توعية المجتمع وحماية حقوقه.",
  descEn: "Help educate the community and protect their rights.",
  contactEmail: "volunteer@cpa-taiz.org"
};

export const DONATION_METHODS: DonationMethod[] = [
  {
    id: 1,
    titleAr: "حساب الكريمي",
    titleEn: "Kuraimi Account",
    detailsAr: "حساب رقم: 1234567",
    detailsEn: "Account No: 1234567",
    methodType: 'wallet'
  }
];

export const INITIAL_STATS: SiteStatistics = {
  totalReports: 1250,
  verifiedDiscrepancies: 840,
  activeViolations: 45
};

export const PRIVACY_POLICY: PrivacyPolicyContent = {
  titleAr: "سياسة الخصوصية",
  titleEn: "Privacy Policy",
  contentAr: "نلتزم بحماية بياناتك الشخصية...",
  contentEn: "We are committed to protecting your personal data..."
};

export const PRICE_CATEGORIES: PriceCategory[] = [
  { id: 1, nameAr: "المواد الغذائية", nameEn: "Food Items" },
  { id: 2, nameAr: "الأدوية", nameEn: "Medicines" },
];

export const NEWS_DATA: NewsItem[] = [
  { 
    id: 1, 
    date: "2024-05-12", 
    titleAr: "حملة رقابية على المخابز", 
    titleEn: "Monitoring Campaign on Bakeries",
    descAr: "تم التأكد من أوزان الخبز والأسعار المعتمدة.",
    descEn: "Verified bread weights and official prices.",
    image: "https://picsum.photos/seed/news/800/600",
    keywordsAr: "أخبار, مخابز, تعز",
    keywordsEn: "news, bakeries, Taiz"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  { id: 1, icon: 'search', titleAr: 'الرصد اليومي', titleEn: 'Daily Monitoring', descAr: 'نتابع تغيرات الأسعار لحظة بلحظة.', descEn: 'We track price changes moment by moment.' },
  { id: 2, icon: 'balance', titleAr: 'العدالة السعرية', titleEn: 'Price Justice', descAr: 'نضمن عدم استغلال المستهلك.', descEn: 'Ensuring consumers are not exploited.' },
  { id: 3, icon: 'bullhorn', titleAr: 'التوعية المستمرة', titleEn: 'Constant Awareness', descAr: 'ننشر حقوقك عبر كل المنصات.', descEn: 'Broadcasting your rights on all platforms.' }
];

export const PUBLICATIONS_DATA: Publication[] = [
  { id: 1, type: 'pdf', titleKey: 'اللائحة التنظيمية', size: '1.2 MB' },
];

export const MOCK_PRICES: PriceItem[] = [
  { id: 1, code: "F01", barcode: "12345678", nameAr: "دقيق السعيد 10كجم", nameEn: "Al-Saeed Flour 10kg", price: 4500, categoryId: 1, lastUpdated: "2024-05-15" },
];
