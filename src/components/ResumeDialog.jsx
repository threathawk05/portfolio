import { useEffect, useRef } from 'react';
import { profile } from '../data/profile.js';
import { trapFocus } from '../lib/focus.js';

export default function ResumeDialog({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      trapFocus(event, dialogRef.current);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('dialog-open');
    dialogRef.current?.querySelector('button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('dialog-open');
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        className="resume-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-header">
          <div>
            <p className="eyebrow">Résumé</p>
            <h2 id="resume-dialog-title">{profile.name}</h2>
          </div>
          <div className="dialog-actions">
            <a className="button button-small button-solid" href={profile.resumePath} download>
              Download PDF
            </a>
            <button className="icon-button" type="button" onClick={onClose} aria-label="Close résumé preview">
              ×
            </button>
          </div>
        </div>
        <iframe className="resume-frame" title={`${profile.name} résumé PDF`} src={profile.resumePath} />
      </section>
    </div>
  );
}
