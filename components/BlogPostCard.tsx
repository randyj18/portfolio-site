'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="border border-burnt-orange/20 rounded-lg p-6 hover:border-burnt-orange/60 transition-all duration-300 hover:shadow-lg hover:shadow-burnt-orange/10 bg-off-white/50">
          {/* Cluster Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-lake-blue/10 text-lake-blue border border-lake-blue/20">
              {post.cluster}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-charcoal group-hover:text-burnt-orange transition-colors duration-300">
            {post.title}
          </h2>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-sm text-warm-gray-600 mb-3 italic">
              {post.subtitle}
            </p>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-base text-warm-gray-700 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-warm-gray-500">
            {post.status && post.status !== 'Draft' && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.status}
              </span>
            )}
          </div>

          {/* Read More Arrow */}
          <div className="mt-4 flex items-center text-burnt-orange font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
            Read more
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
