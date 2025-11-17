import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const researchDirectory = path.join(process.cwd(), 'research/published');

export interface ResearchPaper {
  slug: string;
  title: string;
  tier: string;
  published?: string;
  arxiv?: string;
  authors?: string;
  impact: string;
  content: string;
  excerpt?: string;
}

export interface ResearchTier {
  name: string;
  papers: ResearchPaper[];
}

export function getAllResearchSlugs(): string[] {
  const fileNames = fs.readdirSync(researchDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getResearchBySlug(slug: string): ResearchPaper | null {
  try {
    const fullPath = path.join(researchDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from content (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    // Extract tier from frontmatter pattern
    const tierMatch = content.match(/\*\*Tier:\*\*\s+(.+)$/m);
    const tier = tierMatch ? tierMatch[1] : 'Uncategorized';

    // Extract published date
    const publishedMatch = content.match(/\*\*Published:\*\*\s+(.+)$/m);
    const published = publishedMatch ? publishedMatch[1] : undefined;

    // Extract arXiv link
    const arxivMatch = content.match(/\*\*arXiv:\*\*\s+\[([^\]]+)\]\(([^)]+)\)/m);
    const arxiv = arxivMatch ? arxivMatch[2] : undefined;

    // Extract authors
    const authorsMatch = content.match(/\*\*Authors:\*\*\s+(.+)$/m);
    const authors = authorsMatch ? authorsMatch[1] : undefined;

    // Extract impact
    const impactMatch = content.match(/\*\*Impact:\*\*\s+(.+)$/m);
    const impact = impactMatch ? impactMatch[1] : 'TBD';

    // Create excerpt (first paragraph after metadata)
    const contentWithoutMetadata = content
      .replace(/^#.+$/m, '')
      .replace(/\*\*Tier:\*\*.+$/m, '')
      .replace(/\*\*Published:\*\*.+$/m, '')
      .replace(/\*\*arXiv:\*\*.+$/m, '')
      .replace(/\*\*Authors:\*\*.+$/m, '')
      .replace(/\*\*Impact:\*\*.+$/m, '')
      .replace(/^---$/m, '')
      .trim();

    const firstParagraph = contentWithoutMetadata.split('\n\n')[0];
    const excerpt = firstParagraph?.substring(0, 200) + (firstParagraph?.length > 200 ? '...' : '');

    return {
      slug,
      title,
      tier,
      published,
      arxiv,
      authors,
      impact,
      content,
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading research paper: ${slug}`, error);
    return null;
  }
}

export function getAllResearchPapers(): ResearchPaper[] {
  const slugs = getAllResearchSlugs();
  const papers = slugs
    .map(slug => getResearchBySlug(slug))
    .filter((paper): paper is ResearchPaper => paper !== null);

  return papers;
}

export function getResearchByTier(): ResearchTier[] {
  const allPapers = getAllResearchPapers();
  const tierMap = new Map<string, ResearchPaper[]>();

  // Define tier order
  const tierOrder = [
    'Market-Defining Transformation',
    'Paradigm Shifter (3-5 year horizon)',
    'Major Market Enabler (2-4 year horizon)',
  ];

  allPapers.forEach(paper => {
    const tier = paper.tier;
    if (!tierMap.has(tier)) {
      tierMap.set(tier, []);
    }
    tierMap.get(tier)!.push(paper);
  });

  // Sort by predefined tier order
  return tierOrder
    .filter(tier => tierMap.has(tier))
    .map(tier => ({ name: tier, papers: tierMap.get(tier)! }));
}

export function getRelatedPapers(currentSlug: string, limit: number = 3): ResearchPaper[] {
  const currentPaper = getResearchBySlug(currentSlug);
  if (!currentPaper) return [];

  const allPapers = getAllResearchPapers();

  // Prioritize papers from same tier
  const sameTier = allPapers
    .filter(paper => paper.slug !== currentSlug && paper.tier === currentPaper.tier);

  const otherPapers = allPapers
    .filter(paper => paper.slug !== currentSlug && paper.tier !== currentPaper.tier);

  return [...sameTier, ...otherPapers].slice(0, limit);
}
