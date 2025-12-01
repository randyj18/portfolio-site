# Claude Assistant Instructions

## Project Overview
Personal portfolio site for Randy Jones, built with Next.js, Tailwind CSS, and TypeScript. It includes a blog system powered by Markdown files.

## Common Commands

- **Start Development Server:** `npm run dev`
- **Build Project:** `npm run build`
- **Lint Code:** `npm run lint`
- **Type Check:** `npx tsc --noEmit`

## Blog Creation Workflow

### 1. Research
- Conduct thorough research using `google_web_search`.
- Find credible sources (interviews, papers, tweets from primary sources).
- Key figures often cited: Ilya Sutskever, Yann LeCun, Richard Sutton, etc.

### 2. Structure & Formatting
Blog posts are Markdown files located in `blogs/published/`.

**Header Format (Pseudo-Frontmatter):**
The system uses regex to parse metadata from the content body, not standard YAML frontmatter.

```markdown
# Title of the Blog Post

**Subtitle:** A compelling subtitle
**Target Length:** e.g., 1800-2200 words
**Cluster:** e.g., Systems & Architecture, Governance & Implementation
**Status:** Complete

---

## Quick Navigation
- [Section 1](#section-1)
- [Section 2](#section-2)
...
```

### 3. Content Guidelines
- **Tone:** Nuanced, analytical, observational. Minimal hype.
- **Structure:**
    - **Quick Navigation:** Table of contents at the top.
    - **Internal Links:** Link to at least 3-4 other relevant blog posts using relative paths (e.g., `[Link Text](/blog/slug)`).
    - **TLDR:** A "TLDR" section at the very end summarizing the post.
    - **Metadata Footer:**
        ```markdown
        ---
        **Published:** Month Year
        **Word Count:** ~X,XXX words
        ```
- **Style:** Use "↑ Back to top" links at the end of major sections.

### 4. Saving
- Save the file to `blogs/published/<slug>.md`.
- Ensure the slug matches the filename.

### 5. Verification
- Run `npm run dev` to start the local server.
- Verify the post renders correctly at `http://localhost:3000/blog/<slug>`.

## Git Workflow
- **Commit Messages:** Concise, focused on "why" and "what".
- **Push:** Only push when explicitly asked.
