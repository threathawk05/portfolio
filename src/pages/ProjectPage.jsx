import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import { projects } from '../data/projects.js';

function TodoPanel({ label, text }) {
  return (
    <article className="case-study-block todo-panel">
      <p className="eyebrow">{label}</p>
      <p>{text}</p>
    </article>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <>
        <SEO title="Project not found" description="This project is not listed in Amaan Akbar Khojani’s portfolio." />
        <section className="page-intro container">
          <p className="eyebrow">404 · Project</p>
          <h1>That project isn’t here.</h1>
          <Link className="text-link" to="/projects">Return to all projects <span aria-hidden="true">→</span></Link>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO title={project.title} description={project.summary} />
      <section className="page-intro container project-intro">
        <Link className="back-link" to="/projects">← All projects</Link>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="Project stack">
          {project.stack.map((item) => <li className="tag" key={item}>{item}</li>)}
        </ul>
      </section>

      <SectionReveal as="section" className="container case-study-grid" delay={40}>
        <div className="case-study-main">
          <article className="case-study-block">
            <p className="eyebrow">What I built</p>
            <p>{project.built}</p>
          </article>
          <TodoPanel label="Problem" text={project.todos.problem} />
          <TodoPanel label="Decisions & trade-offs" text={project.todos.decisions} />
          <TodoPanel label="Result" text={project.todos.result} />
        </div>
        <aside className="case-study-aside" aria-label="Project links">
          <div className="case-study-block">
            <p className="eyebrow">Stack</p>
            <ul className="stack-list">
              {project.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="case-study-block case-links">
            <p className="eyebrow">Links</p>
            {project.codeUrl ? (
              <a className="text-link" href={project.codeUrl} target="_blank" rel="noopener noreferrer">Code repository ↗</a>
            ) : <p className="todo-inline">{project.todos.code}</p>}
            {project.demoUrl ? (
              <a className="text-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
            ) : <p className="todo-inline">{project.todos.demo}</p>}
          </div>
        </aside>
      </SectionReveal>
    </>
  );
}
