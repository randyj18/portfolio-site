import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogBySlug, getRelatedPosts } from '@/lib/blog';
import BlogLayout from '@/components/BlogLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/atom-one-dark.css';

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Randy Johnson`,
    description: post.subtitle || post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug);

  // Clean content: remove metadata and title
  let contentToRender = post.content;

  // Remove title (first heading)
  contentToRender = contentToRender.replace(/^#[^\n]+\n+/, '');

  // Remove metadata fields
  contentToRender = contentToRender
    .replace(/\*\*Subtitle:\*\*[^\n]+\n*/g, '')
    .replace(/\*\*Target Length:\*\*[^\n]+\n*/g, '')
    .replace(/\*\*Cluster:\*\*[^\n]+\n*/g, '')
    .replace(/\*\*Status:\*\*[^\n]+\n*/g, '')
    .replace(/\*\*Word Count:\*\*[^\n]+\n*/g, '')
    .replace(/\*\*Published:\*\*[^\n]+\n*/g, '')
    .replace(/^---+\s*\n/gm, '')
    .replace(/^##\s+The Draft\s*\n+/m, '');

  // Extract TLDR section (marked with **TLDR:** in markdown)
  const tldrSectionMatch = contentToRender.match(/\*\*TLDR:\*\*\s*(.+?)(?=\n\n---|\n\n\*\*|$)/s);
  let tldr = '';

  if (tldrSectionMatch) {
    // Clean up the extracted TLDR text
    tldr = tldrSectionMatch[1]
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\*\*/g, '') // Remove markdown bold markers
      .trim();

    // Remove the TLDR section from content to avoid duplication
    contentToRender = contentToRender.replace(/\n*\*\*TLDR:\*\*[\s\S]*?(?=\n\n---|\n\n\*\*|$)/, '').trim();
  } else {
    // Fallback to excerpt if no TLDR section found
    tldr = post.excerpt || '';
  }

  return (
    <BlogLayout post={post} tldr={tldr} relatedPosts={relatedPosts}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
        {contentToRender}
      </ReactMarkdown>
    </BlogLayout>
  );
}
