import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { trapFocus } from '../lib/focus.js';

export default function CommandPalette({ onOpenResume, isOpen, setIsOpen }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const previousFocus = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const commands = useMemo(
    () => [
      { id: 'home', label: 'Home', detail: 'Return to the introduction', to: '/' },
      { id: 'about', label: 'About', detail: 'Profile and education', to: '/#about' },
      { id: 'experience', label: 'Experience', detail: 'Internship timeline', to: '/#experience' },
      { id: 'projects', label: 'Projects', detail: 'View all projects', to: '/projects' },
      { id: 'skills', label: 'Skills', detail: 'Tools and focus areas', to: '/#skills' },
      { id: 'education', label: 'Education', detail: 'Academic background', to: '/#education' },
      { id: 'credentials', label: 'Certifications & languages', detail: 'Credentials and spoken languages', to: '/#credentials' },
      { id: 'contact', label: 'Contact', detail: 'Get in touch', to: '/contact' },
      ...projects.map((project) => ({
        id: project.slug,
        label: project.title,
        detail: 'Open project case study',
        to: `/projects/${project.slug}`,
      })),
      { id: 'resume', label: 'Open résumé', detail: 'Preview or download the PDF', action: onOpenResume },
    ],
    [onOpenResume],
  );

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.detail}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    const onGlobalKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        previousFocus.current = document.activeElement;
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', onGlobalKeyDown);
    return () => document.removeEventListener('keydown', onGlobalKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      if (!previousFocus.current) previousFocus.current = document.activeElement;
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.classList.add('dialog-open');
      return () => document.body.classList.remove('dialog-open');
    }
    if (previousFocus.current?.isConnected) previousFocus.current.focus();
    previousFocus.current = null;
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash, setIsOpen]);

  const chooseCommand = (command) => {
    if (command.action) command.action();
    else navigate(command.to);
    setIsOpen(false);
  };

  const onDialogKeyDown = (event) => {
    trapFocus(event, event.currentTarget);
    if (event.key === 'Escape') {
      event.stopPropagation();
      setIsOpen(false);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % Math.max(filteredCommands.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (event.key === 'Enter' && filteredCommands[activeIndex]) {
      event.preventDefault();
      chooseCommand(filteredCommands[activeIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop command-backdrop" onMouseDown={() => setIsOpen(false)}>
      <section
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onDialogKeyDown}
      >
        <label className="sr-only" id="command-title" htmlFor="command-input">Search this portfolio</label>
        <input
          ref={inputRef}
          id="command-input"
          className="command-input"
          type="search"
          placeholder="Search pages, sections, and projects…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
        />
        <ul className="command-list" role="listbox" aria-label="Portfolio destinations">
          {filteredCommands.length ? filteredCommands.map((command, index) => (
            <li key={command.id}>
              <button
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={`command-option ${index === activeIndex ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseCommand(command)}
              >
                <span>{command.label}</span>
                <small>{command.detail}</small>
              </button>
            </li>
          )) : <li className="command-empty">No matching destinations.</li>}
        </ul>
        <p className="command-hint"><kbd>↑</kbd><kbd>↓</kbd> to navigate <kbd>↵</kbd> to open <kbd>esc</kbd> to close</p>
      </section>
    </div>
  );
}
