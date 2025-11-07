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
- **Styling:** Tailwind CSS + custom design system
- **Animations:** Framer Motion
- **Fonts:** System font stack (Inter body, sans-serif headings)

### Project Structure
```
app/
  layout.tsx          # Root layout with metadata
  page.tsx            # Home page
  globals.css         # Global styles & Tailwind config
components/
  Hero.tsx            # Hero section with intro
  Philosophy.tsx      # Approach & methodology
  Capabilities.tsx    # Skills & expertise areas
  Contact.tsx         # Contact & CTAs
  Footer.tsx          # Site footer
public/               # Static assets (future)
```

### Design System

**Color Palette** (Canadian nature-inspired):
- **Lake Blue:** `#2B5F75` (primary, brand)
- **Forest Green:** `#3A5F4A` (secondary accent)
- **Aurora Green:** `#6FC49C` (highlights, CTAs)
- **Granite Gray:** `#4A5568` (text, borders)
- **Birch White:** `#F8F9FA` (backgrounds)

**Typography:**
- **Display:** Space Grotesk, bold, large scale
- **Body:** Inter, regular/medium, comfortable line height

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

Edit these files to customize:
- **Hero stats:** `components/Hero.tsx` (lines 33-43)
- **Philosophy principles:** `components/Philosophy.tsx`
- **Capabilities:** `components/Capabilities.tsx`
- **Contact info:** `components/Contact.tsx`

### Adding New Sections

1. Create new component in `components/`
2. Import in `app/page.tsx`
3. Add to Home component render
4. Style with Tailwind + custom colors from `tailwind.config.ts`

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
- [app/page.tsx](app/page.tsx) - Home page structure
- [components/Hero.tsx](components/Hero.tsx) - Hero section
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

- [ ] Blog with MDX
- [ ] Case study deep-dives
- [ ] Project showcase gallery
- [ ] GitHub project feed
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Dark mode refinements
- [ ] Hub API integration (dynamic projects, articles)
- [ ] Contact form backend
