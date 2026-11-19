import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import InteractiveOrbit from '../components/InteractiveOrbit.jsx';
import { certifications, education, languages } from '../data/credentials.js';
import { experience } from '../data/experience.js';
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';

function SectionHeading({ label, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

const practiceAreas = [
  {
    number: '01',
    title: 'Assess',
    description: 'Web application and network assessments, reconnaissance, scanning, and structured findings.',
    href: '#experience',
    link: 'Experience',
  },
  {
    number: '02',
    title: 'Operate',
    description: 'SOC alert triage, security tooling, ticketing, and threat-mitigation workflows.',
    href: '#experience',
    link: 'Experience',
  },
  {
    number: '03',
    title: 'Respond',
    description: 'Digital forensics and incident-response work in Linux environments.',
    href: '#experience',
    link: 'Experience',
  },
];

const marqueeItems = [
  ...skillGroups.find((group) => group.title === 'Tools & technology').items,
  ...skillGroups.find((group) => group.title === 'Risk frameworks').items.slice(0, 3),
];

export default function HomePage({ onOpenResume }) {
  const nameParts = profile.name.trim().split(/\s+/);
  const firstName = nameParts.shift() || profile.name;
  const familyName = nameParts.join(' ');

  return (
    <>
      <SEO
        title="Cybersecurity portfolio"
        description="Amaan Akbar Khojani is an MSc Sociotechnical Cybersecurity student with internship experience in vulnerability assessment, SOC alert triage, and digital forensics."
      />

      <section className="brand-hero" id="top" aria-labelledby="hero-title">
        <p className="brand-hero-label">{profile.role}</p>
        <div className="hero-art">
          <h1 className="hero-name" id="hero-title" aria-label={profile.name}>
            <span className="hero-name-upper" aria-hidden="true">{firstName}</span>
            <span className="hero-name-lower hero-name-lower-back" aria-hidden="true">{familyName}</span>
            <span className="hero-name-lower hero-name-lower-front" aria-hidden="true">{familyName}</span>
          </h1>
          <img
            className="hero-cutout"
            src={`${import.meta.env.BASE_URL}portrait-cutout.png`}
            width="1080"
            height="1456"
            alt={`Portrait of ${profile.name}`}
            fetchPriority="high"
          />
        </div>
        <p className="brand-hero-statement">{profile.headline}</p>
      </section>

      <SectionReveal as="section" className="ticker-band" delay={40} aria-label="CV-listed tools and frameworks">
        <div className="ticker-label"><span>TOOLS & METHODS</span><span aria-hidden="true">FROM THE RÉSUMÉ</span></div>
        <div className="ticker-viewport">
          <ul className="ticker-track">
            {marqueeItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <ul className="ticker-track ticker-track-clone" aria-hidden="true">
            {marqueeItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container practice-section" delay={60}>
        <div id="practice" className="anchor-target" />
        <SectionHeading
          label="What I do"
          title="Security work across assessment, operations, and response."
          description="Focus areas drawn from my internship experience and cybersecurity studies."
        />
        <div className="practice-grid">
          {practiceAreas.map((area) => (
            <article className="practice-card" key={area.number}>
              <p className="practice-number">{area.number}</p>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <a className="text-link" href={area.href}>{area.link} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <div className="orbit-feature">
          <div className="orbit-feature-copy">
            <p className="eyebrow">Working focus</p>
            <h3>Assess. Detect. Respond.</h3>
            <p>Explore the areas of cybersecurity I have worked in through the interactive visual.</p>
          </div>
          <InteractiveOrbit profile={profile} />
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container experience-section" delay={80}>
        <div id="experience" className="anchor-target" />
        <SectionHeading
          label="Experience"
          title="Learning by doing."
          description="Internship experience across assessment, security operations, and digital forensics."
        />
        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <div className="timeline-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="timeline-content">
                <div className="timeline-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-company">{item.company} <span>·</span> {item.location}</p>
                  </div>
                  <time>{item.period}</time>
                  <span className="timeline-arrow" aria-hidden="true">↗</span>
                </div>
                <ul className="detail-list">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container work-section" delay={100}>
        <div id="projects" className="anchor-target" />
        <div className="section-heading-row">
          <SectionHeading
            label="Selected work"
            title="Projects, grounded in the résumé."
            description="Three projects documented in my résumé; no outcomes or links have been added without evidence."
          />
          <Link className="text-link desktop-only" to="/projects">All projects <span aria-hidden="true">→</span></Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          <article className="project-card project-card-placeholder">
            <div className="project-card-art project-card-art-placeholder" aria-hidden="true">
              <span className="project-art-index">04</span>
              <span className="project-art-orbit" />
              <span className="project-art-label">TODO / CASE STUDY</span>
            </div>
            <div className="project-card-body">
              <p className="eyebrow">TODO</p>
              <h3>Additional project</h3>
              <p className="project-summary">Add another verified project from your résumé when one is ready to share.</p>
            </div>
          </article>
        </div>
        <Link className="text-link mobile-only" to="/projects">All projects <span aria-hidden="true">→</span></Link>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container skills-section" delay={120}>
        <div id="skills" className="anchor-target" />
        <SectionHeading label="Capabilities" title="Tools, methods, and frameworks." />
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container public-work-section" delay={140}>
        <div id="writing" className="anchor-target" />
        <SectionHeading label="Talks & writing" title="Public work." />
        <div className="public-work-card">
          <span className="public-work-index" aria-hidden="true">01</span>
          <div>
            <p className="eyebrow">TODO — add verified public work</p>
            <p>The résumé does not list talks, articles, or publications. Add verified entries here if available.</p>
          </div>
          <span className="public-work-mark" aria-hidden="true">↗</span>
        </div>
        <div className="proof-todos" aria-label="Details to add when verified">
          <p><span>IMPACT METRICS</span><strong>TODO: Add verified outcomes if available.</strong></p>
          <p><span>RECOMMENDATIONS</span><strong>TODO: Add an attributed testimonial with permission.</strong></p>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container credentials-section" delay={160}>
        <div id="education" className="anchor-target" />
        <div id="credentials" className="anchor-target" />
        <SectionHeading label="Background" title="Education & credentials." />
        <div className="credentials-grid">
          <div>
            <h3 className="subsection-title">Education</h3>
            <div className="education-list">
              {education.map((item) => (
                <article className="education-item" key={item.institution}>
                  <p className="eyebrow">{item.period}</p>
                  <h4>{item.degree}</h4>
                  <p>{item.institution} <span>·</span> {item.location}</p>
                  {item.result && <p className="education-result">{item.result}</p>}
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="subsection-title">Certifications</h3>
            <ul className="credential-list">
              {certifications.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
            <h3 className="subsection-title language-heading">Languages</h3>
            <ul className="language-list">
              {languages.map((language) => (
                <li key={language.name}><span>{language.name}</span><span>{language.level}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container about-section" delay={180}>
        <div id="about" className="anchor-target" />
        <SectionHeading label="About" title="Security shaped by systems and people." />
        <div className="about-brand-grid">
          <figure className="about-portrait">
            <img
              src={`${import.meta.env.BASE_URL}portrait.jpg`}
              width="1080"
              height="1456"
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
            />
            <figcaption>{profile.location} <span>·</span> {profile.institution}</figcaption>
          </figure>
          <div className="about-copy">
            <p>
              I’m pursuing an MSc in Sociotechnical Cybersecurity at {profile.institution}. My internship
              experience spans vulnerability assessment and penetration testing, SOC alert triage, and
              digital forensics and incident response.
            </p>
            <p>
              I’ve assessed web applications and network systems, documented findings for risk tracking,
              supported threat-mitigation workflows, and worked with cybersecurity tooling in Linux environments.
            </p>
            <dl className="profile-facts">
              <div><dt>Based in</dt><dd>{profile.location}</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
              <div>
                <dt>Profiles</dt>
                <dd>
                  <a href={profile.links.github.href} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                  <span aria-hidden="true"> · </span>
                  <a href={profile.links.linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                </dd>
              </div>
            </dl>
            <div className="about-actions">
              <button className="button button-outline" type="button" onClick={onOpenResume}>Preview résumé</button>
              <a className="text-link" href={profile.resumePath} download>Download résumé <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="contact-banner container" delay={200}>
        <div id="contact" className="anchor-target" />
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s talk about security.</h2>
          <p>For conversations about vulnerability assessment, security operations, or digital forensics, email me.</p>
        </div>
        <div className="contact-banner-actions">
          <a className="button button-light" href={`mailto:${profile.email}`}>Email Amaan <span aria-hidden="true">↗</span></a>
          <Link className="button button-banner-outline" to="/contact">Contact page</Link>
        </div>
      </SectionReveal>
    </>
  );
}
