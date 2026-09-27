import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { formatMonth } from '@/lib/dates';

interface PostListProps {
  posts: BlogPost[];
  /** Show the description under each title. */
  withDescription?: boolean;
  /** Show the topic name in the meta line. */
  withTopic?: boolean;
  /** Number the items (for reading paths). */
  numbered?: boolean;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

export function PostMeta({ post, withTopic = false }: { post: BlogPost; withTopic?: boolean }) {
  const parts: string[] = [];
  if (withTopic) parts.push(post.cluster);
  parts.push(`${post.readingMinutes} min read`);
  if (post.updated) parts.push(`Updated ${formatMonth(post.updated)}`);
  return <p className="mt-2 text-sm text-muted">{parts.join(' · ')}</p>;
}

export default function PostList({
  posts,
  withDescription = true,
  withTopic = false,
  numbered = false,
  headingLevel = 'h3',
}: PostListProps) {
  const Heading = headingLevel;
  const List = numbered ? 'ol' : 'ul';
  return (
    <List className="divide-y divide-ink/10 border-y border-ink/10">
      {posts.map((post, i) => (
        <li key={post.slug} className="group relative flex gap-4 py-5">
          {numbered && (
            <span aria-hidden className="font-heading text-2xl font-extrabold leading-none text-accent tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
          )}
          <div className="min-w-0">
            <Heading className="font-sans text-lg font-semibold leading-snug text-ink sm:text-xl">
              <Link
                href={`/blog/${post.slug}`}
                className="decoration-accent-ink/50 decoration-2 underline-offset-4 after:absolute after:inset-0 group-hover:underline"
              >
                {post.title}
              </Link>
            </Heading>
            {withDescription && (
              <p className="mt-1.5 max-w-2xl text-[0.975rem] leading-relaxed text-muted text-pretty">{post.description}</p>
            )}
            <PostMeta post={post} withTopic={withTopic} />
          </div>
        </li>
      ))}
    </List>
  );
}
