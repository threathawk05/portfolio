import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile.js';
import { skillGroups } from '../data/skills.js';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!content) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute('content', content);
}

export default function SEO({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = `${title} · Amaan Akbar Khojani`;
    document.title = pageTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', description);

    let siteRoot = '';
    if (profile.siteUrl) {
      try {
        const siteUrl = new URL(profile.siteUrl);
        if (!['http:', 'https:'].includes(siteUrl.protocol)) {
          throw new Error('VITE_SITE_URL must use HTTP or HTTPS.');
        }
        siteRoot = `${siteUrl.origin}${siteUrl.pathname.replace(/\/+$/, '')}`;
      } catch (error) {
        console.warn('VITE_SITE_URL must be a valid absolute URL.', error);
      }
    }

    const pageUrl = siteRoot ? `${siteRoot}${location.pathname}` : '';
    setMeta('property', 'og:url', pageUrl);
    const socialImage = siteRoot
      ? `${siteRoot}/og-image.png`
      : `${import.meta.env.BASE_URL}og-image.png`;
    setMeta('property', 'og:image', socialImage);
    setMeta('property', 'og:image:type', 'image/png');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', `${profile.name} · ${profile.role}`);
    setMeta('name', 'twitter:image', socialImage);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (pageUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = pageUrl;
    } else {
      canonical?.remove();
    }

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.role,
      email: `mailto:${profile.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ingolstadt',
        addressCountry: 'DE',
      },
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: profile.institution,
      },
      knowsAbout: skillGroups.flatMap((group) => group.items),
      ...(siteRoot ? { url: `${siteRoot}/` } : {}),
      sameAs: [profile.links.github.href, profile.links.linkedin.href].filter(Boolean),
    };

    let structuredData = document.getElementById('person-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'person-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(person);
  }, [description, location.pathname, title]);

  return null;
}
