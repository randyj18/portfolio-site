import Link from 'next/link';
import { getBlogsByCluster } from '@/lib/blog';
import ClusterDiagram from '@/components/ClusterDiagram';

export const metadata = {
  title: 'Blog | Randy Johnson',
  description: 'Insights on AI leadership, strategy, and implementation',
};

export default function BlogPage() {
  const clusters = getBlogsByCluster();
  const allPosts = clusters.flatMap(c => c.posts);

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy via-gray-dark to-navy">
      {/* Back to Home - Top Navigation */}
      <section className="section-container pt-12 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate hover:text-gold-light transition-colors duration-300 group mb-8"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </section>

      {/* Hero Section */}
      <section className="section-container py-20 lg:py-32 border-b border-slate/20">
        <div className="max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-gold-light to-orange-burnt rounded-full" />
            <span className="text-sm font-semibold uppercase tracking-widest text-beige">Insights & Analysis</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-beige mb-6">
            Systems Thinking
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-orange-burnt to-red-medium">
              In Practice
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate leading-relaxed max-w-2xl">
            Deep dives into AI strategy, governance, and implementation. Each post explores the interconnected systems shaping how organizations adopt and scale AI.
          </p>

          <div className="flex gap-4 mt-8 text-sm">
            <div>
              <span className="text-3xl font-bold text-gold-light">{clusters.length}</span>
              <span className="text-slate ml-2">Clusters</span>
            </div>
            <div className="border-l border-slate/20 pl-4">
              <span className="text-3xl font-bold text-orange-burnt">{allPosts.length}</span>
              <span className="text-slate ml-2">Posts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cluster Diagram - Desktop */}
      <section className="hidden lg:block section-container py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-beige mb-2">Explore by Theme</h2>
          <p className="text-slate text-sm">Click on any cluster to see related posts</p>
        </div>
        <ClusterDiagram clusters={clusters} />
      </section>

      {/* Mobile/Tablet List View */}
      <section className="lg:hidden section-container py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-beige mb-2">All Posts by Theme</h2>
          <p className="text-slate text-sm">Organized by topic clusters</p>
        </div>

        <div className="space-y-8">
          {clusters.map((cluster) => (
            <div key={cluster.name} className="border-l-4 border-gold-light pl-6">
              <h3 className="text-xl font-bold text-gold-light mb-4 flex items-center gap-3">
                {cluster.name}
                <span className="text-xs font-normal text-slate bg-slate/10 px-2 py-1 rounded-sm">
                  {cluster.posts.length} {cluster.posts.length === 1 ? 'post' : 'posts'}
                </span>
              </h3>

              <div className="space-y-3">
                {cluster.posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-4 bg-navy/40 border border-slate/20 rounded-sm hover:border-gold-light/50 hover:bg-navy/60 transition-all duration-300 group"
                  >
                    <h4 className="text-lg font-semibold text-beige group-hover:text-gold-light transition-colors duration-300 mb-2">
                      {post.title}
                    </h4>
                    {post.subtitle && (
                      <p className="text-sm text-slate line-clamp-2">
                        {post.subtitle}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Posts Grid - Desktop Alternative View */}
      <section className="hidden lg:block section-container py-16 border-t border-slate/20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-beige mb-2">All Posts</h2>
          <p className="text-slate">Browse the complete collection</p>
        </div>

        <div className="space-y-12">
          {clusters.map((cluster) => (
            <div key={cluster.name}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gold-light">{cluster.name}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-light/30 to-transparent" />
                <span className="text-sm text-slate">
                  {cluster.posts.length} {cluster.posts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cluster.posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group p-6 bg-navy/40 border border-slate/20 rounded-sm hover:border-gold-light/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/10"
                  >
                    <h4 className="text-lg font-bold text-beige mb-3 group-hover:text-gold-light transition-colors duration-300">
                      {post.title}
                    </h4>
                    {post.subtitle && (
                      <p className="text-sm text-slate line-clamp-3 mb-4">
                        {post.subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gold-light/70 group-hover:text-gold-light transition-colors duration-300">
                      Read more
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home */}
      <section className="section-container py-12 border-t border-slate/20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-beige hover:text-gold-light transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </section>
    </main>
  );
}
