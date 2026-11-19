import { Link } from 'react-router-dom';
import { useState } from 'react';
import { profile } from '../data/profile.js';
import ThemeToggle from './ThemeToggle.jsx';

const links = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/#skills' },
];

export default function SiteHeader({ onOpenResume, onOpenPalette }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" to="/" onClick={closeMenu} aria-label={`${profile.name}, home`}>
          <span className="wordmark-monogram" aria-hidden="true">A</span>
          <span>Amaan Khojani</span>
        </Link>

        <button
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
          className={`primary-navigation ${isMenuOpen ? 'is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link key={link.label} to={link.to} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
          <Link className="mobile-contact-link" to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button className="command-shortcut" type="button" onClick={onOpenPalette}>
            <span>Search</span>
            <kbd>⌘K<span className="shortcut-other"> / Ctrl+K</span></kbd>
          </button>
          <button className="button button-small button-outline" type="button" onClick={onOpenResume}>
            Résumé
          </button>
          <Link className="button button-small button-solid header-contact" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
