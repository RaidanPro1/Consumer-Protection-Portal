
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

/**
 * PageWrapper component moved outside of App to fix children prop inference errors
 * and prevent the component from being re-defined on every App render cycle.
 */
const PageWrapper: React.FC<{ children: React.ReactNode; logoUrl: string }> = ({ children, logoUrl }) => (
  <LanguageProvider>
    <div className="min-h-screen flex flex-col font-cairo overflow-x-hidden">
      <Navbar logoUrl={logoUrl} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer logoUrl={logoUrl} />
    </div>
  </LanguageProvider>
);

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

  // Handle routing with the optimized PageWrapper
  if (route === '#privacy') return <PageWrapper logoUrl={settings.logoUrl}><PrivacyPolicy /></PageWrapper>;
  if (route === '#about') return <PageWrapper logoUrl={settings.logoUrl}><AboutUs /></PageWrapper>;
  if (route === '#team') return <PageWrapper logoUrl={settings.logoUrl}><Team /></PageWrapper>;
  if (route === '#jobs') return <PageWrapper logoUrl={settings.logoUrl}><Jobs jobs={jobs} /></PageWrapper>;
  if (route === '#volunteering') return <PageWrapper logoUrl={settings.logoUrl}><Volunteering content={volContent} /></PageWrapper>;
  if (route === '#donations') return <PageWrapper logoUrl={settings.logoUrl}><Donations methods={donationMethods} /></PageWrapper>;

  return (
    <PageWrapper logoUrl={settings.logoUrl}>
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
