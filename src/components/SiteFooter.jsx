import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';

function ProfileLink({ label, link }) {
  return link.href ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer">{label}</a>
  ) : (
    <span className="todo-inline">{label} <small>{link.todo}</small></span>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <ProfileLink label="GitHub" link={profile.links.github} />
          <ProfileLink label="LinkedIn" link={profile.links.linkedin} />
          <Link to="/blog">Blog</Link>
        </div>
        <a className="back-to-top" href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
