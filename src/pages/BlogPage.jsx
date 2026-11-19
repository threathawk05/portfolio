import SEO from '../components/SEO.jsx';

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Blog"
        description="A future home for writing by Amaan Akbar Khojani. No articles have been added yet."
      />
      <section className="page-intro container empty-state">
        <p className="eyebrow">Notes & writing</p>
        <h1>Blog</h1>
        <p className="todo-notice">TODO: Add a first post. There are no published articles yet.</p>
      </section>
    </>
  );
}
