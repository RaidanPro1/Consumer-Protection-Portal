
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
import { AIAssistant } from './components/Home/AIAssistant';
import { BarcodeScanner } from './components/Home/BarcodeScanner';
import { AnimatePresence } from 'framer-motion';
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
const PageWrapper: React.FC<{ children: React.ReactNode; logoUrl: string; onOpenScanner: () => void }> = ({ children, logoUrl, onOpenScanner }) => (
  <LanguageProvider>
    <div className="min-h-screen flex flex-col font-cairo overflow-x-hidden">
      <Navbar logoUrl={logoUrl} onOpenScanner={onOpenScanner} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer logoUrl={logoUrl} />
      <AIAssistant />
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
  const [isScannerOpen, setIsScannerOpen] = useState(false);

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

  const toggleScanner = () => setIsScannerOpen(!isScannerOpen);

  if (route === '#admin') {
    return (
      <LanguageProvider>
        <AdminDashboard />
        <AIAssistant />
      </LanguageProvider>
    );
  }

  // Common PageWrapper props
  const wrapperProps = {
    logoUrl: settings.logoUrl,
    onOpenScanner: toggleScanner
  };

  return (
    <>
      {route === '#privacy' && <PageWrapper {...wrapperProps}><PrivacyPolicy /></PageWrapper>}
      {route === '#about' && <PageWrapper {...wrapperProps}><AboutUs /></PageWrapper>}
      {route === '#team' && <PageWrapper {...wrapperProps}><Team /></PageWrapper>}
      {route === '#jobs' && <PageWrapper {...wrapperProps}><Jobs jobs={jobs} /></PageWrapper>}
      {route === '#volunteering' && <PageWrapper {...wrapperProps}><Volunteering content={volContent} /></PageWrapper>}
      {route === '#donations' && <PageWrapper {...wrapperProps}><Donations methods={donationMethods} /></PageWrapper>}
      
      {route === '#home' && (
        <PageWrapper {...wrapperProps}>
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
      )}

      <AnimatePresence>
        {isScannerOpen && <BarcodeScanner onClose={toggleScanner} />}
      </AnimatePresence>
    </>
  );
};

export default App;
