import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'blogs/published');

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  cluster: string;
  status: string;
  targetLength?: string;
  content: string;
  excerpt?: string;
}

export interface BlogCluster {
  name: string;
  posts: BlogPost[];
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from content (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    // Extract subtitle from frontmatter pattern
    const subtitleMatch = content.match(/\*\*Subtitle:\*\*\s+(.+)$/m);
    const subtitle = subtitleMatch ? subtitleMatch[1] : undefined;

    // Extract cluster from frontmatter pattern
    const clusterMatch = content.match(/\*\*Cluster:\*\*\s+(.+)$/m);
    const cluster = clusterMatch ? clusterMatch[1] : 'Uncategorized';

    // Extract status
    const statusMatch = content.match(/\*\*Status:\*\*\s+(.+)$/m);
    const status = statusMatch ? statusMatch[1] : 'Draft';

    // Extract target length
    const targetLengthMatch = content.match(/\*\*Target Length:\*\*\s+(.+)$/m);
    const targetLength = targetLengthMatch ? targetLengthMatch[1] : undefined;

    // Create excerpt (first paragraph after metadata)
    const contentWithoutMetadata = content
      .replace(/^#.+$/m, '')
      .replace(/\*\*Subtitle:\*\*.+$/m, '')
      .replace(/\*\*Cluster:\*\*.+$/m, '')
      .replace(/\*\*Status:\*\*.+$/m, '')
      .replace(/\*\*Target Length:\*\*.+$/m, '')
      .replace(/^---$/m, '')
      .trim();

    const firstParagraph = contentWithoutMetadata.split('\n\n')[0];
    const excerpt = firstParagraph?.substring(0, 200) + (firstParagraph?.length > 200 ? '...' : '');

    return {
      slug,
      title,
      subtitle,
      cluster,
      status,
      targetLength,
      content,
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map(slug => getBlogBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter(post => post.status !== 'Shell created - awaiting user content');

  return posts;
}

export function getBlogsByCluster(): BlogCluster[] {
  const allPosts = getAllBlogPosts();
  const clusterMap = new Map<string, BlogPost[]>();

  allPosts.forEach(post => {
    const cluster = post.cluster;
    if (!clusterMap.has(cluster)) {
      clusterMap.set(cluster, []);
    }
    clusterMap.get(cluster)!.push(post);
  });

  return Array.from(clusterMap.entries())
    .map(([name, posts]) => ({ name, posts }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllBlogPosts();

  // Prioritize posts from same cluster
  const sameCuster = allPosts
    .filter(post => post.slug !== currentSlug && post.cluster === currentPost.cluster);

  const otherPosts = allPosts
    .filter(post => post.slug !== currentSlug && post.cluster !== currentPost.cluster);

  return [...sameCuster, ...otherPosts].slice(0, limit);
}
