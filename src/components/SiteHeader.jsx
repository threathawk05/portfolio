import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';
import { trapFocus } from '../lib/focus.js';
import ThemeToggle from './ThemeToggle.jsx';

const links = [
  { label: 'Experience', to: '/#experience' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Writing', to: '/#writing' },
  { label: 'About', to: '/#about' },
];

export default function SiteHeader({ onOpenResume, onOpenPalette }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (isMenuOpen) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    document.body.classList.add('nav-open');
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      } else {
        trapFocus(event, navRef.current);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('nav-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button
          ref={menuButtonRef}
          className="icon-button menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{isMenuOpen ? '×' : '☰'}</span>
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav
          ref={navRef}
          className={`primary-navigation ${isMenuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link key={link.label} to={link.to} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
          <div className="navigation-tools">
            <button
              className="command-shortcut"
              type="button"
              onClick={() => {
                closeMenu();
                onOpenPalette();
              }}
            >
              Search <kbd>⌘K / Ctrl+K</kbd>
            </button>
            <button
              className="button button-small button-outline"
              type="button"
              onClick={() => {
                closeMenu();
                onOpenResume();
              }}
            >
              Preview résumé
            </button>
            <ThemeToggle />
          </div>
        </nav>

        <div className="header-actions">
          <a className="button button-small button-solid header-contact" href={`mailto:${profile.email}`} onClick={closeMenu}>
            Contact <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
