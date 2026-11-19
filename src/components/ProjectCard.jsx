import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card" data-project-card>
      <div className="project-card-art" aria-hidden="true">
        <span className="project-art-index">CASE STUDY</span>
        <span className="project-art-orbit project-art-orbit-one" />
        <span className="project-art-orbit project-art-orbit-two" />
        <span className="project-art-node" />
        <span className="project-art-label">{project.category}</span>
        <span className="project-art-stack">{project.stack.slice(0, 2).join(' · ')}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-top">
          <p className="eyebrow">{project.category}</p>
          <span className="project-mark" aria-hidden="true">↗</span>
        </div>
        <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p className="project-summary">{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies and areas`}>
          {project.stack.map((item) => <li className="tag" key={item}>{item}</li>)}
        </ul>
        <Link className="text-link" to={`/projects/${project.slug}`}>
          Read case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
