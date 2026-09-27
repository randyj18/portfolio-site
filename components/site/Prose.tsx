import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

type HastLike = { type?: string; value?: string; children?: HastLike[] };

function textOf(node: HastLike | undefined): string {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

const components: Components = {
  a({ node: _node, href = '', children, ...props }) {
    if (href.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href.startsWith('#')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  // A blockquote that starts with "Updated ..." or "Update ..." is an editorial
  // update note, not a quotation. Render it as a labelled note.
  blockquote({ node, children, ...props }) {
    const text = textOf(node as HastLike).trim();
    if (/^updated?\b/i.test(text)) {
      return (
        <div className="update-note" role="note">
          {children}
        </div>
      );
    }
    return <blockquote {...props}>{children}</blockquote>;
  },
  table({ node: _node, children, ...props }) {
    return (
      <div className="table-wrap">
        <table {...props}>{children}</table>
      </div>
    );
  },
  img({ node: _node, alt = '', ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} loading="lazy" {...props} />;
  },
};

/** Renders post and research Markdown with the site's reading styles. */
export default function Prose({ markdown, className = '' }: { markdown: string; className?: string }) {
  return (
    <div className={`prose-site ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
