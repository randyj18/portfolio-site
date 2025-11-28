'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';

interface BlogLayoutProps {
  post: BlogPost;
  tldr?: string;
  relatedPosts?: BlogPost[];
  children: ReactNode;
}

export default function BlogLayout({ post, tldr, relatedPosts, children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-off-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-40 right-10 w-64 h-64 bg-orange-burnt/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-green-bright/10 rounded-full blur-3xl" />
        <div className="absolute top-96 left-1/3 w-64 h-64 bg-gold-dark/8 rounded-full blur-3xl" />
      </div>

      {/* Header with back button */}
      <header className="border-b border-orange-burnt/20 bg-navy backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-orange-burnt hover:text-gold-light transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Dark Hero Section */}
      <section className="bg-navy py-16 relative overflow-hidden border-b border-orange-burnt/20">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-burnt/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-dark/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Cluster Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-gold-dark/20 text-gold-light border border-gold-dark/40">
                {post.cluster}
              </span>
            </div>

            {/* Title with gradient */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-beige">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-burnt via-gold-light to-orange-burnt">
                {post.title}
              </span>
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-beige/90 mb-8 italic font-light">
                {post.subtitle}
              </p>
            )}

            {/* TLDR Section - enhanced for dark background */}
            {tldr && (
              <div className="border-l-4 border-orange-burnt pl-6 bg-orange-burnt/10 p-6 rounded-r-lg">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-burnt mb-4">
                  TL;DR
                </h3>
                <p className="text-lg text-beige leading-relaxed font-medium">
                  {tldr}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Content */}
          <div className="blog-prose">
            {children}
          </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-navy py-16 border-t border-orange-burnt/20">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-orange-burnt mb-8">Related Posts</h3>
            {/* Scroll container for responsive layout */}
            <div className="overflow-x-auto -mx-4 px-4 pb-4">
              <div className="flex gap-6 min-w-min md:grid md:grid-cols-3 md:overflow-visible">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex-shrink-0 w-80 md:w-auto p-6 bg-slate/10 border border-orange-burnt/20 rounded-lg hover:border-orange-burnt/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-burnt/10"
                  >
                    <div className="text-xs uppercase tracking-widest text-gold-light mb-3 font-semibold">
                      {relatedPost.cluster}
                    </div>
                    <h4 className="text-lg font-bold text-beige mb-2 group-hover:text-orange-burnt transition-colors duration-300">
                      {relatedPost.title}
                    </h4>
                    {relatedPost.subtitle && (
                      <p className="text-sm text-slate line-clamp-2">
                        {relatedPost.subtitle}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            {/* Scroll hint for mobile */}
            {relatedPosts.length > 2 && (
              <p className="text-xs text-beige/50 text-center mt-4 md:hidden">
                ← Swipe to see more →
              </p>
            )}
          </div>
        </section>
      )}

      {/* Dark CTA Section */}
      <section className="bg-navy py-20 relative overflow-hidden border-t border-orange-burnt/20">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-burnt/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-dark/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-orange-burnt mb-6">
              Continue Reading
            </h3>
            <p className="text-beige text-xl leading-relaxed mb-10">
              Explore more insights on organizational intelligence, AI strategy, and enterprise transformation.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-burnt hover:bg-gold-dark text-beige font-bold rounded-lg transition-all duration-300 hover:gap-4 text-lg shadow-lg hover:shadow-orange-burnt/20"
            >
              View All Posts
              <svg
                className="w-6 h-6"
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
            </Link>
          </div>

          <div className="flex justify-between items-center text-beige text-sm border-t border-orange-burnt/30 pt-8">
            <span className="font-medium">Published in {post.cluster}</span>
            <Link
              href="/"
              className="hover:text-orange-burnt transition-colors duration-300 font-medium"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
