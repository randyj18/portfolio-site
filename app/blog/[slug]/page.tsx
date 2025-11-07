import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogBySlug, getRelatedPosts } from '@/lib/blog';
import BlogLayout from '@/components/BlogLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
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

  // Extract TLDR (complete paragraph before first double newline or heading)
  // Using alternative to 's' flag for compatibility
  const tldrMatch = contentToRender.match(/^([^\n#][\s\S]*?)(?=\n\n|\n#|$)/);
  const tldr = tldrMatch ? tldrMatch[1].trim() : post.excerpt || '';

  // Remove the TLDR from content to avoid duplication
  if (tldr) {
    contentToRender = contentToRender.replace(tldr, '').trimStart();
  }

  return (
    <BlogLayout post={post} tldr={tldr} relatedPosts={relatedPosts}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {contentToRender}
      </ReactMarkdown>
    </BlogLayout>
  );
}
