
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Layout/Navbar';
import { HeroSlider } from './components/Home/HeroSlider';
import { NewsTicker } from './components/Home/NewsTicker';
import { Services } from './components/Home/Services';
import { NewsSection } from './components/Home/NewsSection';
import { Gallery } from './components/Home/Gallery';
import { Publications } from './components/Home/Publications';
import { PriceList } from './components/Home/PriceList';
import { ReportForm } from './components/Home/ReportForm';
import { Footer } from './components/Layout/Footer';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { PrivacyPolicy } from './components/Home/PrivacyPolicy';
import { AboutUs } from './components/Home/AboutUs';
import { Team } from './components/Home/Team';
import { Jobs } from './components/Home/Jobs';
import { Volunteering } from './components/Home/Volunteering';
import { Donations } from './components/Home/Donations';
import { StatisticsSection } from './components/Home/StatisticsSection';
import { SuccessStoriesSection } from './components/Home/SuccessStoriesSection';
import { TestimonialsSection } from './components/Home/TestimonialsSection';
import { ViolationsMap } from './components/Home/ViolationsMap';
import { 
  JOB_LISTINGS, 
  VOLUNTEER_DATA, 
  DONATION_METHODS, 
  INITIAL_STATS, 
  INITIAL_SETTINGS,
  SUCCESS_STORIES,
  TESTIMONIALS 
} from './constants';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#home');
  const [jobs] = useState(JOB_LISTINGS);
  const [volContent] = useState(VOLUNTEER_DATA);
  const [donationMethods] = useState(DONATION_METHODS);
  const [stats] = useState(INITIAL_STATS);
  const [settings] = useState(INITIAL_SETTINGS);
  const [stories] = useState(SUCCESS_STORIES);
  const [testimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = settings.logoUrl;
  }, [settings.logoUrl]);

  if (route === '#admin') {
    return (
      <LanguageProvider>
        <AdminDashboard />
      </LanguageProvider>
    );
  }

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-cairo overflow-x-hidden">
        <Navbar logoUrl={settings.logoUrl} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer logoUrl={settings.logoUrl} />
      </div>
    </LanguageProvider>
  );

  if (route === '#privacy') return <PageWrapper><PrivacyPolicy /></PageWrapper>;
  if (route === '#about') return <PageWrapper><AboutUs /></PageWrapper>;
  if (route === '#team') return <PageWrapper><Team /></PageWrapper>;
  if (route === '#jobs') return <PageWrapper><Jobs jobs={jobs} /></PageWrapper>;
  if (route === '#volunteering') return <PageWrapper><Volunteering content={volContent} /></PageWrapper>;
  if (route === '#donations') return <PageWrapper><Donations methods={donationMethods} /></PageWrapper>;

  return (
    <PageWrapper>
      <NewsTicker />
      <HeroSlider />
      
      {settings.showStatsOnHome && (
        <StatisticsSection stats={stats} />
      )}
      
      <div className="space-y-0">
        <Services />
        <ViolationsMap />
        <SuccessStoriesSection stories={stories} />
        <NewsSection />
        <PriceList />
        <div className="bg-light">
          <ReportForm />
        </div>
        <TestimonialsSection testimonials={testimonials} />
        <Gallery />
        <Publications />
      </div>
    </PageWrapper>
  );
};

export default App;
