# connorhanify.com

Personal site built with [Astro](https://astro.build) and deployed on Netlify.

## Develop

```sh
npm install
npm run dev        # site only, http://localhost:4321
npm run build      # production build to dist/
```

To run the Strava function locally, use the Netlify CLI. It loads `.env`:

```sh
npx netlify-cli@latest dev   # http://localhost:8889/.netlify/functions/strava-stats
```

`.env` (gitignored) needs `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET` and `STRAVA_REFRESH_TOKEN`. The same variables are set in Netlify.

## Layout

- `src/pages/`: pages (`about`, `ai`, `links`, `security`, `blog`)
- `posts/`: blog posts (Markdown)
- `netlify/functions/`: serverless functions
- `public/`: static files served as-is

## Deploy

Pushing to `main` deploys to Netlify.
