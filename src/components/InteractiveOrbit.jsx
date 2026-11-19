import { useRef, useState } from 'react';

const focusAreas = [
  {
    id: 'assess',
    label: 'Assess',
    title: 'Map what is exposed.',
    description: 'Web and network assessment with clear risk documentation.',
  },
  {
    id: 'detect',
    label: 'Detect',
    title: 'Triage the signal.',
    description: 'SOC alert triage and threat-mitigation workflows.',
  },
  {
    id: 'respond',
    label: 'Respond',
    title: 'Understand the incident.',
    description: 'Digital forensics and incident response in Linux environments.',
  },
];

export default function InteractiveOrbit({ profile }) {
  const [activeId, setActiveId] = useState(focusAreas[0].id);
  const stageRef = useRef(null);
  const activeArea = focusAreas.find((area) => area.id === activeId) || focusAreas[0];

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty('--tilt-x', `${(y * -9).toFixed(2)}deg`);
    stage.style.setProperty('--tilt-y', `${(x * 12).toFixed(2)}deg`);
  }

  function resetPointerTilt() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--tilt-x', '0deg');
    stage.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div className="hero-visual">
      <div
        className="security-scene"
        data-focus={activeId}
        role="group"
        aria-labelledby="scene-heading"
        aria-describedby="scene-description"
      >
        <h2 className="sr-only" id="scene-heading">Interactive cybersecurity focus visual</h2>
        <p className="sr-only" id="scene-description">
          Select an area to explore vulnerability assessment, security operations, and incident response.
        </p>

        <div className="scene-overline" aria-hidden="true">
          <span>SECURITY / 01</span>
          <span className="scene-mode"><i /> INTERACTIVE</span>
        </div>

        <div
          className="scene-stage"
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointerTilt}
        >
          <div className="scene-floor" aria-hidden="true" />
          <div className="scene-sphere" aria-hidden="true">
            <span className="scene-orbit scene-orbit-one" />
            <span className="scene-orbit scene-orbit-two" />
            <span className="scene-orbit scene-orbit-three" />
            <svg className="scene-globe" viewBox="0 0 360 360" focusable="false">
              <defs>
                <radialGradient id="scene-globe-fill" cx="32%" cy="28%" r="80%">
                  <stop offset="0%" stopColor="var(--color-surface)" />
                  <stop offset="100%" stopColor="var(--color-soft)" />
                </radialGradient>
                <clipPath id="scene-globe-clip">
                  <circle cx="180" cy="180" r="140" />
                </clipPath>
              </defs>
              <circle cx="180" cy="180" r="140" fill="url(#scene-globe-fill)" />
              <circle cx="180" cy="180" r="140" fill="none" stroke="var(--color-scene-orbit)" />
              <g clipPath="url(#scene-globe-clip)" fill="none" stroke="var(--color-scene-grid)" strokeWidth="1">
                <path d="M40 180h280M52 130h256M52 230h256" />
                <ellipse cx="180" cy="180" rx="140" ry="48" />
                <ellipse cx="180" cy="180" rx="140" ry="96" />
                <path d="M180 40c-42 38-64 86-64 140s22 102 64 140M180 40c42 38 64 86 64 140s-22 102-64 140" />
                <path d="M180 40c-80 50-112 98-112 140s32 90 112 140M180 40c80 50 112 98 112 140s-32 90-112 140" />
              </g>
              <g fill="var(--color-accent)">
                <circle cx="83" cy="142" r="4" />
                <circle cx="265" cy="112" r="4" />
                <circle cx="245" cy="235" r="4" />
                <circle cx="134" cy="270" r="4" />
              </g>
              <g fill="none" stroke="var(--color-scene-orbit)" strokeWidth="1">
                <path d="m83 142 89-50 93 20-20 123-111 35-51-128Z" />
                <path d="m83 142 151 93M172 92l-38 178M265 112l-93-20" />
              </g>
            </svg>
            <span className="scene-node scene-node-one" />
            <span className="scene-node scene-node-two" />
            <span className="scene-node scene-node-three" />
          </div>

          <p className="scene-coordinate scene-coordinate-one" aria-hidden="true">WEB / NET</p>
          <p className="scene-coordinate scene-coordinate-two" aria-hidden="true">SOC / DFIR</p>

          <figure className="hero-portrait scene-portrait">
            <div className="portrait-frame">
              <img
                src={`${import.meta.env.BASE_URL}portrait.jpg`}
                width="1080"
                height="1456"
                alt={`Portrait of ${profile.name}`}
                fetchPriority="high"
              />
            </div>
            <figcaption>{profile.institution} <span>·</span> Ingolstadt</figcaption>
          </figure>

          <div className="scene-readout" aria-live="polite" aria-atomic="true">
            <p className="scene-readout-label">CURRENT FOCUS <span>0{focusAreas.indexOf(activeArea) + 1}</span></p>
            <h3>{activeArea.title}</h3>
            <p>{activeArea.description}</p>
          </div>
        </div>

        <div className="scene-controls" role="group" aria-label="Choose a cybersecurity focus">
          {focusAreas.map((area, index) => (
            <button
              className="scene-control"
              key={area.id}
              type="button"
              aria-pressed={activeId === area.id}
              onClick={() => setActiveId(area.id)}
            >
              <span className="scene-control-index" aria-hidden="true">0{index + 1}</span>
              <span>{area.label}</span>
            </button>
          ))}
        </div>
        <p className="scene-hint">Select a focus area to explore</p>
      </div>
    </div>
  );
}
