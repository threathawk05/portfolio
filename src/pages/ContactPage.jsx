import { useState } from 'react';
import SEO from '../components/SEO.jsx';
import { profile } from '../data/profile.js';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const submitMailto = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`,
    );
    setSubmitted(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <SEO
        title="Contact"
        description={`Contact Amaan Akbar Khojani in Ingolstadt, Germany about cybersecurity opportunities. Email: ${profile.email}.`}
      />
      <section className="page-intro container contact-intro">
        <p className="eyebrow">Contact</p>
        <h1>Let’s start a conversation.</h1>
        <p>For cybersecurity opportunities or questions about my résumé-documented work, reach me by email.</p>
      </section>
      <section className="container contact-layout">
        <div className="contact-details">
          <p className="eyebrow">Direct details</p>
          <a className="contact-detail" href={`mailto:${profile.email}`}>
            <span>Email</span><strong>{profile.email}</strong>
          </a>
          <a className="contact-detail" href={`tel:${profile.phone}`}>
            <span>Phone</span><strong>{profile.phone}</strong>
          </a>
          <div className="contact-detail">
            <span>Location</span><strong>{profile.location}</strong>
          </div>
          {profile.links.github.href ? (
            <a className="contact-detail" href={profile.links.github.href} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span><strong>github.com/threathawk05 ↗</strong>
            </a>
          ) : (
            <div className="contact-detail todo-contact">
              <span>GitHub</span><strong>{profile.links.github.todo}</strong>
            </div>
          )}
          {profile.links.linkedin.href ? (
            <a className="contact-detail" href={profile.links.linkedin.href} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span><strong>linkedin.com/in/amaan-khojani ↗</strong>
            </a>
          ) : (
            <div className="contact-detail todo-contact">
              <span>LinkedIn</span><strong>{profile.links.linkedin.todo}</strong>
            </div>
          )}
        </div>
        <form className="contact-form" onSubmit={submitMailto}>
          <p className="eyebrow">Write a message</p>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" required />
          <label htmlFor="contact-email">Your email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="5" required />
          <button className="button button-solid" type="submit">Open email draft <span aria-hidden="true">↗</span></button>
          <p className="form-note">
            This form opens your default email app with a draft addressed to {profile.email}; it does not send or store your message.
          </p>
          {submitted && <p className="form-note" role="status">Your email draft is being opened.</p>}
        </form>
      </section>
    </>
  );
}
