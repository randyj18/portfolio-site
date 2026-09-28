# Randy Jones - Portfolio Site

Personal portfolio showcasing AI strategy, product leadership, and enterprise transformation expertise.

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Production (Docker)

```bash
# Build from ai-hub root
cd ../..
docker-compose build portfolio-site

# Run with ai-hub services
docker-compose up portfolio-site

# Or run standalone
docker build -t portfolio-site ./projects/portfolio-site
docker run -p 3000:3000 portfolio-site
```

## Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, with design tokens as CSS variables (light and dark)
- **Content:** Markdown with YAML front matter in `blogs/published/` and `research/published/`
- **Fonts:** Barlow Condensed (headings) and Source Serif 4 (long-form text) through `next/font`; system sans for interface text

### Project Structure
```
app/
  layout.tsx              # Root layout and default metadata
  (site)/                 # Public pages: home, /blog, /blog/topics, /research, /about
  playground/             # Playground index and demos
  feed.xml/, sitemap.ts, robots.ts, not-found.tsx
components/site/          # Site shell, post lists, Markdown renderer, contents list
lib/                      # Content loading (blog.ts, research.ts), topics.ts, site.ts
blogs/published/          # Posts (blogs/drafts/ is never rendered)
research/published/       # Research notes
tools/check-content.mjs   # npm run check:content
```

### Design System

Tokens live in `app/globals.css` and `tailwind.config.ts`: `paper`, `surface`, `ink`, `muted`, `accent`, `accent-ink` and `night`, built on the site's navy (#192332), warm off-white and burnt orange. The older palette tokens (navy, beige, gold, bronze and so on) are still defined because /gphl, /playoffhockey, /workouts and the playground demos use them.

## Integration with AI-Hub

This is a **PROJECT** in the ai-hub ecosystem:

- **Isolated:** Runs in its own Docker container
- **Stateless:** No database dependencies
- **Composable:** Part of docker-compose orchestration
- **Extensible:** Can integrate hub APIs for dynamic content

### Future Hub Integrations

Projects could add dynamic content via hub services:

```typescript
// Example (not implemented yet)
const projects = await fetch('http://hub:8080/api/projects')
const caseStudies = await fetch('http://hub:8080/api/blog')
```

## Development Workflow

### Content Updates

- **Posts and research notes:** follow the writing conventions in `CLAUDE.md`, then run `npm run check:content`.
- **Topic hubs, reading order, homepage picks:** `lib/topics.ts`
- **Name, email, LinkedIn, navigation:** `lib/site.ts`
- **Home and About copy:** `app/(site)/page.tsx` and `app/(site)/about/page.tsx`
- **Redirects for moved or merged posts:** `next.config.js`

### Building & Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Docker Container

The project includes:
- **Dockerfile:** Multi-stage build (builder + production)
- **.dockerignore:** Clean image (excludes node_modules, .git, .next, etc.)

### Local Docker

```bash
# Build
docker build -t portfolio-site .

# Run
docker run -p 3000:3000 portfolio-site

# With docker-compose (from ai-hub root)
docker-compose up portfolio-site
```

### Vercel (Direct Deploy)

Portfolio site is configured for Vercel deployment. To deploy:

1. Push to GitHub
2. Import repo in Vercel
3. Configure custom domain (randyjones.ca)
4. Deploy on push

**Note:** Direct Vercel deploys are separate from ai-hub orchestration. For ai-hub integration, use Docker.

## File Reference

### Key Files
- [app/layout.tsx](app/layout.tsx) - Metadata & root layout
- [app/(site)/page.tsx](app/(site)/page.tsx) - Home page
- [lib/topics.ts](lib/topics.ts) - Topic hubs and reading order
- [tailwind.config.ts](tailwind.config.ts) - Design system config
- [Dockerfile](Dockerfile) - Container definition
- [docker-compose.yml](../../docker-compose.yml) - Hub orchestration

## Troubleshooting

**Port 3000 already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Docker build fails:**
```bash
docker build --no-cache -t portfolio-site .
```

## Future Features

- [x] Blog with Markdown
- [ ] Case study deep-dives
- [ ] Project showcase gallery
- [ ] GitHub project feed
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Dark mode refinements
- [ ] Hub API integration (dynamic projects, articles)
- [ ] Contact form backend
