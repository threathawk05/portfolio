import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CommandPalette from './components/CommandPalette.jsx';
import ProjectCursor from './components/ProjectCursor.jsx';
import ResumeDialog from './components/ResumeDialog.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [hash, pathname]);

  return null;
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const openResume = useCallback(() => setIsResumeOpen(true), []);
  const closeResume = useCallback(() => setIsResumeOpen(false), []);
  const openPalette = useCallback(() => setIsPaletteOpen(true), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollToHash />
      <SiteHeader onOpenResume={openResume} onOpenPalette={openPalette} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage onOpenResume={openResume} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ProjectCursor />
      <SiteFooter />
      <CommandPalette
        isOpen={isPaletteOpen}
        setIsOpen={setIsPaletteOpen}
        onOpenResume={openResume}
      />
      <ResumeDialog isOpen={isResumeOpen} onClose={closeResume} />
    </>
  );
}
