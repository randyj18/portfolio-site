'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PlaygroundAuth from '@/components/PlaygroundAuth';

// Demo credentials - In production, this would use a secure backend API
const DEMO_CREDENTIALS = {
  username: 'demo',
  password: 'demo123'
};

export default function AudioSummaryDemo() {
  const handleAuthenticate = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    return username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
  };

  return (
    <PlaygroundAuth requireAuth={true} onAuthenticate={handleAuthenticate}>
      <main className="min-h-screen bg-navy">
        {/* Header */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-orange-burnt/8 rounded-full blur-3xl" />
          </div>

          <div className="section-container relative z-10">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 text-beige/60 hover:text-gold-light transition-colors duration-300 mb-8"
            >
              <span>← Back to Playground</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-beige mb-6 leading-tight">
                Audio Content <span className="gradient-text">Summaries</span>
              </h1>
              <p className="text-lg lg:text-xl text-beige/80 leading-relaxed mb-8">
                Transform written content into engaging audio summaries and podcast-style narratives using AI.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Demo Section */}
        <section className="py-16 lg:py-24 bg-beige">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Business Use Case */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-navy mb-4">Business Use Case</h2>
                <p className="text-slate leading-relaxed mb-4">
                  Companies can leverage AI-powered audio transformation to:
                </p>
                <ul className="space-y-3 text-slate">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Convert newsletters and blog posts into audio format for accessibility and engagement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Create podcast-style summaries of research papers and technical documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Generate audio briefings for executives from lengthy reports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Enhance content distribution by offering multi-format consumption options</span>
                  </li>
                </ul>
              </div>

              {/* Demo Interface */}
              <div className="bg-white rounded-sm border border-slate/20 p-8">
                <h2 className="text-3xl font-bold text-navy mb-6">Interactive Demo</h2>

                <div className="bg-beige/50 rounded-sm border border-slate/20 p-8 text-center">
                  <div className="text-6xl mb-4">🎙️</div>
                  <h3 className="text-xl font-bold text-navy mb-3">Demo Coming Soon</h3>
                  <p className="text-slate leading-relaxed mb-6">
                    The interactive audio generation interface is being migrated from local hosting
                    to cloud-based APIs. This demo will allow you to:
                  </p>
                  <ul className="text-left max-w-2xl mx-auto space-y-2 text-slate mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Paste or upload written content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Select voice style and narration format</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Generate AI-powered audio summaries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Download or stream the audio content</span>
                    </li>
                  </ul>
                  <div className="inline-flex items-center gap-2 text-sm text-slate/60 bg-slate/10 px-4 py-2 rounded-full">
                    <span>⏳</span>
                    <span>Currently migrating to cloud infrastructure</span>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mt-8">
                <h2 className="text-3xl font-bold text-navy mb-4">Technical Implementation</h2>
                <div className="space-y-4 text-slate">
                  <div>
                    <h4 className="font-semibold text-navy mb-2">AI-Powered Content Analysis</h4>
                    <p className="leading-relaxed">
                      Uses large language models to extract key points, generate summaries, and create
                      natural-sounding narrative scripts optimized for audio consumption.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Text-to-Speech Integration</h4>
                    <p className="leading-relaxed">
                      Leverages advanced TTS APIs with multiple voice options and natural prosody to
                      create engaging audio content that sounds human-like.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Cloud Infrastructure</h4>
                    <p className="leading-relaxed">
                      Built on scalable cloud architecture with API-based model access, enabling
                      cost-effective processing and reliable performance.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate/20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">AI/LLMs</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Text-to-Speech</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Cloud APIs</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Next.js</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">TypeScript</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-navy">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-beige mb-6 leading-tight">
                Interested in This Solution?
              </h2>
              <p className="text-lg text-beige/80 leading-relaxed mb-12">
                This demonstration showcases one of many AI-powered solutions that can be adapted
                for your business needs. Let&apos;s discuss how to implement this for your use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="px-8 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 hover:scale-105 text-center"
                >
                  Discuss Your Project
                </Link>
                <Link
                  href="/playground"
                  className="px-8 py-4 border border-beige/60 text-beige rounded-sm hover:bg-beige/10 transition-all duration-300 font-semibold text-center"
                >
                  View More Demos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PlaygroundAuth>
  );
}
