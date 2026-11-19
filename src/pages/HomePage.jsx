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

function TodoSocial({ label, item }) {
  return item.href ? (
    <a className="social-link" href={item.href} target="_blank" rel="noopener noreferrer">{label} ↗</a>
  ) : (
    <span className="todo-inline">{label} <small>{item.todo}</small></span>
  );
}

export default function HomePage({ onOpenResume }) {
  return (
    <>
      <SEO
        title="Cybersecurity portfolio"
        description="Amaan Akbar Khojani is an MSc Sociotechnical Cybersecurity student with internship experience in vulnerability assessment, SOC alert triage, and digital forensics."
      />

      <section className="hero container" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {profile.role} · {profile.location}</p>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <Link className="button button-solid" to="/contact">Contact me <span aria-hidden="true">↗</span></Link>
            <button className="button button-outline" type="button" onClick={onOpenResume}>Preview résumé</button>
          </div>
          <p className="hero-note">Vulnerability assessment · SOC operations · Digital forensics</p>
        </div>

        <InteractiveOrbit profile={profile} />
      </section>

      <div className="container">
        <SectionReveal as="section" className="intro-strip" delay={40}>
          <p className="intro-label">Current focus</p>
          <p>Web and network assessment, risk documentation, SOC alert triage, and incident-response workflows.</p>
          <a className="text-link" href="#about">Explore profile <span aria-hidden="true">↓</span></a>
        </SectionReveal>
      </div>

      <SectionReveal as="section" className="content-section container" delay={60}>
        <div id="about" className="anchor-target" />
        <SectionHeading label="Profile" title="Security work, grounded in systems and people." />
        <div className="about-grid">
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
          </div>
          <dl className="profile-facts">
            <div><dt>Based in</dt><dd>{profile.location}</dd></div>
            <div><dt>Studying</dt><dd>MSc Sociotechnical Cybersecurity</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:${profile.phone}`}>{profile.phone}</a></dd></div>
            <div className="profile-socials">
              <dt>Profiles</dt>
              <dd><TodoSocial label="GitHub" item={profile.links.github} /> <TodoSocial label="LinkedIn" item={profile.links.linkedin} /></dd>
            </div>
          </dl>
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container" delay={80}>
        <div id="experience" className="anchor-target" />
        <SectionHeading label="Experience" title="Learning by doing." description="Internship experience across assessment, operations, and incident response." />
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
                </div>
                <ul className="detail-list">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container" delay={100}>
        <div id="projects" className="anchor-target" />
        <div className="section-heading-row">
          <SectionHeading label="Selected work" title="Projects" description="Three projects documented in my résumé." />
          <Link className="text-link desktop-only" to="/projects">All projects <span aria-hidden="true">→</span></Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
        <Link className="text-link mobile-only" to="/projects">All projects <span aria-hidden="true">→</span></Link>
      </SectionReveal>

      <SectionReveal as="section" className="content-section container" delay={120}>
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

      <SectionReveal as="section" className="content-section container credentials-section" delay={140}>
        <div id="education" className="anchor-target" />
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
          <div id="credentials" className="anchor-target">
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

      <SectionReveal as="section" className="contact-banner container" delay={160}>
        <div id="contact" className="anchor-target" />
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s talk about security.</h2>
          <p>Get in touch about vulnerability assessment, SOC operations, or digital forensics work.</p>
        </div>
        <div className="contact-banner-actions">
          <a className="button button-light" href={`mailto:${profile.email}`}>Email Amaan <span aria-hidden="true">↗</span></a>
          <Link className="button button-banner-outline" to="/contact">Contact page</Link>
        </div>
      </SectionReveal>
    </>
  );
}
