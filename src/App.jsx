import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Experience  from './components/Experience';
import Projects    from './components/Projects';
import Education   from './components/Education';
import Contact     from './components/Contact';
import Footer      from './components/Footer';

import ScrollProgress from './components/ScrollProgress';
import Particles      from './components/Particles';
import AmbientLights  from './components/AmbientLights';
import NoiseTexture   from './components/NoiseTexture';
import CustomCursor   from './components/CustomCursor';
import LoadingScreen  from './components/LoadingScreen';

import useLenis from './hooks/useLenis';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      {/* ── Global overlays (always rendered) ── */}
      <CustomCursor />
      <NoiseTexture />
      <AmbientLights />
      <ScrollProgress />

      {/* ── Loading screen — unmounts when progress completes ── */}
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* ── Main site ── */}
      {loaded && (
        <div className="bg-[#0a0a0f] min-h-screen text-white relative">
          <Particles />
          <div className="relative z-10">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
