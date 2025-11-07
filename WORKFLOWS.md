# Portfolio Site Workflows

This document describes the deployment and operational workflows for the portfolio site within the ai-hub ecosystem.

## Workflow Types

### 1. Development (Manual)

**Purpose:** Local development and testing

**Steps:**
1. Clone ai-hub repository
2. Navigate to `projects/portfolio-site`
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000
6. Edit components, save, hot-reload

**Tools:** Node.js 18+, npm

**Duration:** Ongoing during development

**Example:**
```bash
cd c:\VSCode\ai-hub\projects\portfolio-site
npm install
npm run dev
```

### 2. Build & Test (Semi-Automated)

**Purpose:** Validate build quality before deployment

**Steps:**
1. Install dependencies: `npm ci`
2. Type check: `npx tsc --noEmit`
3. Lint: `npm run lint`
4. Build: `npm run build`
5. Start production server: `npm start`
6. Manual testing: Navigate site, verify all sections render
7. Container build: `docker build -t portfolio-site .`

**Manual Interventions:**
- Fix type errors or linting issues
- Verify rendering in browser
- Check build output for warnings
- Approve Docker image creation

**Example:**
```bash
npm ci
npx tsc --noEmit
npm run lint
npm run build
npm start  # Test at http://localhost:3000

# In new terminal
docker build -t portfolio-site .
docker run -p 3001:3000 portfolio-site  # Test at http://localhost:3001
```

### 3. Docker Deployment (Full-Automated)

**Purpose:** Run portfolio site as ai-hub service

**Steps:**
1. Build Docker image from `Dockerfile`
2. Start service via docker-compose
3. Wait for health check (30s startup period)
4. Verify at http://localhost:3000

**No manual intervention required** - service starts automatically.

**Example:**
```bash
# From ai-hub root
docker-compose build portfolio-site
docker-compose up portfolio-site

# Verify health
curl http://localhost:3000
```

### 4. Continuous Deployment (CI/CD - Future)

**Purpose:** Auto-deploy on Git push

**Planned workflow:**
1. Push to main branch
2. GitHub Actions runs test suite
3. Build Docker image
4. Push to container registry
5. Orchestrator pulls and restarts service

**Status:** Not implemented yet

## Orchestration Modes

### Manual Mode (Development)

Used during active development:
- **Control:** Full manual (npm scripts)
- **Automation:** None
- **Use Case:** Feature development, debugging
- **Start:** `npm run dev`

### Semi-Automated Mode (Build Testing)

Used before Docker deployment:
- **Control:** Manual approvals at checkpoints
- **Automation:** Type-checking, linting, building
- **Use Case:** Quality gates before production
- **Start:** `npm run build` followed by manual verification

### Full-Automated Mode (Docker)

Production deployment:
- **Control:** None (fully automated)
- **Automation:** Docker build, health checks, service startup
- **Use Case:** Running as ai-hub service
- **Start:** `docker-compose up portfolio-site`

## Data Flow

### Development → Docker

```
Source Code
    ↓
npm install (dependencies)
    ↓
npm run build (Next.js compilation)
    ↓
.next/ (compiled output)
    ↓
Docker build (multi-stage)
    ↓
Container image
    ↓
docker-compose up (orchestration)
    ↓
http://localhost:3000 (running service)
```

### Component Changes

```
Edit components/Hero.tsx
    ↓
npm run dev (hot reload)
    ↓
Browser refresh (automatic)
    ↓
Visual verification
    ↓
Commit changes
    ↓
Rebuild Docker for production
```

## Health Checks

### Development

No automated health checks. Verify manually:
- Page loads at http://localhost:3000
- No console errors
- Components render correctly

### Docker

Automated health check (every 30s after 30s startup):
```bash
curl -f http://localhost:3000
```

**Status:**
- ✅ Healthy: HTTP 200 response
- ❌ Unhealthy: No response or error

## Environment Variables

### Development
```bash
NODE_ENV=development  # Next.js dev mode
```

### Docker
```bash
NODE_ENV=production   # Optimized builds, no source maps
```

## Scaling

### Single Instance (Current)
- One container running on port 3000
- Suitable for personal portfolio
- No load balancing needed

### Future: Multi-Instance
```yaml
portfolio-site:
  deploy:
    replicas: 3
    placement:
      constraints: [node.role == worker]
```

## Rollback

### Development
```bash
git checkout HEAD~1  # Revert last commit
npm install          # Restore dependencies
npm run dev          # Restart
```

### Docker
```bash
docker-compose pull  # Get latest image
docker-compose up --force-recreate portfolio-site
```

Or restore previous version:
```bash
docker run -p 3000:3000 portfolio-site:v1.0.0
```

## Monitoring

### Development
- Manual inspection at http://localhost:3000
- Browser DevTools for performance/errors
- npm logs in terminal

### Docker
- Docker health check (curl http://localhost:3000)
- Container logs: `docker logs ai-hub-portfolio`
- Service status: `docker-compose ps`

```bash
# View logs
docker logs -f ai-hub-portfolio

# Check status
docker-compose ps portfolio-site

# Health details
docker inspect --format='{{json .State.Health}}' ai-hub-portfolio
```

## Maintenance

### Update Dependencies
```bash
npm update                    # Update to latest compatible
npm install next@latest       # Update specific package
npm audit fix               # Fix vulnerabilities
npm run build               # Verify build succeeds
```

### Code Updates
1. Edit components/styles
2. Verify locally: `npm run dev`
3. Type-check: `npx tsc --noEmit`
4. Build test: `npm run build`
5. Commit to git
6. Rebuild Docker: `docker-compose build portfolio-site`
7. Redeploy: `docker-compose up -d portfolio-site`

## Integration Points

### Future: Hub API Integration

When portfolio needs dynamic content:

```typescript
// components/Projects.tsx
import { useEffect, useState } from 'react'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('http://hub:8080/api/projects')  // Hub service
      .then(r => r.json())
      .then(data => setProjects(data))
  }, [])

  return (
    // Render projects from hub API
  )
}
```

**Requirements:**
- Hub service running at http://hub:8080
- docker-compose networking (same network)
- Hub API endpoints exposed

## Troubleshooting Workflows

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
docker run -p 3001:3000 portfolio-site
```

### Build Fails
```bash
# Clean rebuild
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

### Docker Build Fails
```bash
# No cache rebuild
docker build --no-cache -t portfolio-site .

# Check logs
docker build -t portfolio-site . 2>&1 | tail -50
```

### Health Check Failing
```bash
# Check if container is running
docker-compose ps portfolio-site

# View logs
docker logs ai-hub-portfolio

# Test manually
curl -v http://localhost:3000

# Rebuild and restart
docker-compose build --no-cache portfolio-site
docker-compose up --force-recreate portfolio-site
```

## Performance Optimization

### Build Optimization
- Next.js handles static generation automatically
- CSS is optimized via Tailwind
- No image optimization configured yet (future: next/image)

### Runtime Optimization
- Production build mode (NODE_ENV=production)
- Multi-stage Docker build (minimal final image)
- No database (stateless)

### Future
- Image optimization with next/image
- API route caching
- CDN integration (Vercel or cloudflare)
