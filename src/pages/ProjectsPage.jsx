import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import SEO from '../components/SEO.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import { projects } from '../data/projects.js';

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Projects"
        description="Three résumé-documented projects by Amaan Akbar Khojani: a vendor risk assessment framework, secure file storage application, and railway reservation system."
      />
      <section className="page-intro container">
        <p className="eyebrow">Selected work</p>
        <h1>Projects</h1>
        <p>Project summaries are taken from my résumé. Case-study details not included there are clearly marked TODO.</p>
      </section>
      <SectionReveal as="section" className="container content-section" delay={40}>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </SectionReveal>
      <div className="container page-end-link">
        <Link className="text-link" to="/contact">Discuss a project <span aria-hidden="true">→</span></Link>
      </div>
    </>
  );
}
