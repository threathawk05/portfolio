# Amaan Akbar Khojani — Portfolio

A responsive, CV-grounded portfolio built with React, Vite, and Tailwind CSS. All profile content is in `src/data/`; project case-study details not present in the résumé are visibly marked TODO rather than invented.

## Project files

```text
.
├── Amaan.png                       # Existing source image, retained but unused
├── index.html                      # Vite entry and no-flash theme bootstrap
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── netlify.toml
├── vercel.json
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── _redirects
│   ├── favicon.svg
│   ├── og-image.png                  # 1200×630 social card
│   ├── og-image.svg                  # Editable source artwork
│   ├── portrait.jpg
│   ├── resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── prerender-routes.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── CommandPalette.jsx
    │   ├── ProjectCard.jsx
    │   ├── ResumeDialog.jsx
    │   ├── SEO.jsx
    │   ├── SectionReveal.jsx
    │   ├── SiteFooter.jsx
    │   ├── SiteHeader.jsx
    │   ├── ThemeProvider.jsx
    │   └── ThemeToggle.jsx
    ├── data/
    │   ├── credentials.js
    │   ├── experience.js
    │   ├── profile.js
    │   ├── projects.js
    │   └── skills.js
    ├── lib/
    │   └── focus.js
    └── pages/
        ├── BlogPage.jsx
        ├── ContactPage.jsx
        ├── HomePage.jsx
        ├── NotFoundPage.jsx
        ├── ProjectPage.jsx
        └── ProjectsPage.jsx
```

The production build also emits route-specific HTML files and `dist/404.html`.

## Run locally

Use Node.js 20 or newer. From the project root:

```bash
npm install
npm run dev
```

Vite prints the local URL. To create and inspect a production build:

```bash
npm run build
npm run preview
```

The site runs locally without configuration. Before production deployment, set `VITE_SITE_URL` to the canonical site root. You can create a local environment file from the example:

```bash
cp .env.example .env.local
```

For GitHub Pages, use `VITE_SITE_URL=https://threathawk05.github.io/portfolio`. The production build creates static HTML metadata for every route, canonical links, and absolute sitemap/robots URLs from that value. The GitHub Actions workflow sets it automatically.

## Deploy

### GitHub Pages

The project site is `https://threathawk05.github.io/portfolio/`. The included workflow builds with the `/portfolio/` Vite base, publishes on pushes to `main`, and supports manual dispatch. Local and non-GitHub Pages builds keep the root `/` base.

The repository is currently **public** and Pages is enabled with the legacy source `main` / `/`. To publish this Vite build, a maintainer must merge the changes into `main` and change **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow token has explicit Pages deploy permissions. No visibility or Pages settings have been changed by this task.

### Vercel

Import the repository in Vercel, or use its CLI:

```bash
npx vercel login
npx vercel
npx vercel --prod
```

Set `VITE_SITE_URL` in the Vercel project’s Environment Variables before the production build. The included `vercel.json` sends known routes to their prerendered HTML and leaves unknown paths on the React 404 route.

### Netlify

Import the repository in Netlify, or use its CLI:

```bash
npx netlify-cli login
npx netlify-cli link
npx netlify-cli deploy --build --prod
```

Set `VITE_SITE_URL` in the Netlify site’s environment variables before deploying. `netlify.toml` uses `npm run build`, publishes `dist/`, and routes requests to the matching prerendered page where available.

## Updating content

- Edit `src/data/profile.js`, `experience.js`, `projects.js`, `skills.js`, or `credentials.js`.
- Add only verified public URLs to the GitHub, LinkedIn, project-code, or demo fields.
- Replace case-study TODOs in `src/data/projects.js` with verified context, decisions, trade-offs, and outcomes. Add result numbers only when supported by the résumé or other confirmed information.
- The contact form opens a prefilled `mailto:` draft; it does not transmit or store form submissions.
- The résumé PDF and portrait are local assets in `public/`.

The warm-neutral and evergreen theme tokens, typography, spacing, focus states, and reduced-motion behavior are in `src/styles.css`. DM Serif Display and Inter are loaded from Google Fonts, with local system fallbacks.
