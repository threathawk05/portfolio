import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found" description="The page you requested could not be found." />
      <section className="page-intro container empty-state">
        <p className="eyebrow">404 · Not found</p>
        <h1>That page isn’t here.</h1>
        <p>The address may be outdated, or the page may not exist.</p>
        <Link className="button button-solid" to="/">Return home <span aria-hidden="true">→</span></Link>
      </section>
    </>
  );
}
