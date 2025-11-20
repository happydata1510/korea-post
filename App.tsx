import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { LiveDemo } from './components/LiveDemo';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-crimson selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <LiveDemo />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;