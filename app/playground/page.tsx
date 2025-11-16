'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-orange-burnt/8 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-beige mb-8 leading-tight">
              Dev <span className="gradient-text">Playground</span>
            </h1>
            <p className="text-lg lg:text-xl text-beige/80 leading-relaxed mb-12 max-w-3xl">
              A curated collection of technical demonstrations, experimental projects, and AI-powered tools.
              Explore hands-on examples of my work with modern technologies, machine learning, and systems thinking.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gold-light hover:text-orange-burnt transition-colors duration-300"
            >
              <span>← Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Playground Grid Section */}
      <section className="py-24 lg:py-32 bg-beige relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-40 left-10 w-64 h-64 bg-green-forest/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-bronze/8 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
              Interactive Demos
            </h2>
            <p className="text-lg text-slate leading-relaxed max-w-3xl">
              Each demo showcases specific technical capabilities, from AI integrations to full-stack applications.
              More demos will be added as I continue building and learning.
            </p>
          </motion.div>

          {/* Demos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Demo Card Template - These will be populated with actual demos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-sm border border-slate/20 p-8 hover:shadow-lg hover:shadow-orange-burnt/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl font-bold text-gold-dark/30 group-hover:text-gold-dark transition-colors duration-300">
                  01
                </div>
                <span className="text-xs font-semibold text-slate/60 px-3 py-1 bg-slate/10 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors duration-300">
                Demo Placeholder
              </h3>
              <p className="text-slate text-sm leading-relaxed mb-4">
                This space is reserved for an interactive demonstration. Check back soon for live examples
                of technical implementations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-navy/60 bg-beige px-2 py-1 rounded">React</span>
                <span className="text-xs text-navy/60 bg-beige px-2 py-1 rounded">TypeScript</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-sm border border-slate/20 p-8 hover:shadow-lg hover:shadow-orange-burnt/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl font-bold text-gold-dark/30 group-hover:text-gold-dark transition-colors duration-300">
                  02
                </div>
                <span className="text-xs font-semibold text-slate/60 px-3 py-1 bg-slate/10 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors duration-300">
                Demo Placeholder
              </h3>
              <p className="text-slate text-sm leading-relaxed mb-4">
                This space is reserved for an interactive demonstration. Check back soon for live examples
                of technical implementations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-navy/60 bg-beige px-2 py-1 rounded">Next.js</span>
                <span className="text-xs text-navy/60 bg-beige px-2 py-1 rounded">AI</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-sm border border-slate/20 p-8 hover:shadow-lg hover:shadow-orange-burnt/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl font-bold text-gold-dark/30 group-hover:text-gold-dark transition-colors duration-300">
                  03
                </div>
                <span className="text-xs font-semibold text-slate/60 px-3 py-1 bg-slate/10 rounded-full">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors duration-300">
                Demo Placeholder
              </h3>
              <p className="text-slate text-sm leading-relaxed mb-4">
                This space is reserved for an interactive demonstration. Check back soon for live examples
                of technical implementations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-navy/60 bg-beige px-2 py-1 rounded">Full-Stack</span>
                <span className="text-xs text-navy/60 bg-beige px-2 py-1 rounded">API</span>
              </div>
            </motion.div>
          </div>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 max-w-3xl border-l-4 border-gold-dark pl-6"
          >
            <h4 className="text-xl font-bold text-navy mb-2">Access & Authentication</h4>
            <p className="text-slate leading-relaxed mb-4">
              The playground is currently open for exploration. In the future, certain demos may require
              authentication to access advanced features or personalized experiences. Usage limits will be
              managed through cloud provider quotas to ensure reliable access for all visitors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-forest/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-beige mb-6 leading-tight">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-beige/80 leading-relaxed mb-12">
              These demos represent just a fraction of what&apos;s possible. Let&apos;s discuss how these capabilities
              can be applied to your specific challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 hover:scale-105 text-center"
              >
                Start Conversation
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 border border-beige/60 text-beige rounded-sm hover:bg-beige/10 transition-all duration-300 font-semibold text-center"
              >
                Read Blog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
