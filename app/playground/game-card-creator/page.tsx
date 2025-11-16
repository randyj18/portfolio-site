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

export default function GameCardCreatorDemo() {
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
                Game Card <span className="gradient-text">Creator</span>
              </h1>
              <p className="text-lg lg:text-xl text-beige/80 leading-relaxed mb-8">
                An agentic AI workflow that transforms unstructured card ideas into professional game assets.
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
              {/* Overview */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-navy mb-4">Automated Game Development</h2>
                <p className="text-slate leading-relaxed mb-6">
                  This agentic AI workflow streamlines the entire game card creation process, from initial concept
                  to production-ready assets. The system intelligently handles rule validation, art generation,
                  and template-based design—all while maintaining game balance and design consistency.
                </p>
                <div className="bg-beige/50 rounded-sm border border-slate/20 p-6">
                  <h3 className="text-xl font-bold text-navy mb-4">Workflow Pipeline</h3>
                  <ul className="space-y-3 text-slate">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">1.</span>
                      <span>Convert unstructured card ideas into structured JSON files</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">2.</span>
                      <span>Validate against game rules and design specifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">3.</span>
                      <span>Send clarification requests via VOICE-Relay when needed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">4.</span>
                      <span>Generate custom card artwork using AI image generation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">5.</span>
                      <span>Create printable cards following the physical game template</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">6.</span>
                      <span>Generate separate digital assets for the game&apos;s digital version</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Business Use Case */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-navy mb-4">Business Use Case</h2>
                <p className="text-slate leading-relaxed mb-4">
                  Game developers and content creators can leverage this agentic workflow to:
                </p>
                <ul className="space-y-3 text-slate">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Accelerate card game prototyping and iteration cycles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Maintain consistency across hundreds of game cards with automated rule checking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Reduce manual design work by automating art generation and template application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Streamline collaboration with intelligent clarification requests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Simultaneously produce print-ready and digital assets from a single workflow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Scale content creation without proportionally increasing team size</span>
                  </li>
                </ul>
              </div>

              {/* Demo Interface */}
              <div className="bg-white rounded-sm border border-slate/20 p-8">
                <h2 className="text-3xl font-bold text-navy mb-6">Interactive Demo</h2>

                <div className="bg-beige/50 rounded-sm border border-slate/20 p-8 text-center">
                  <div className="text-6xl mb-4">🃏</div>
                  <h3 className="text-xl font-bold text-navy mb-3">Demo Coming Soon</h3>
                  <p className="text-slate leading-relaxed mb-6">
                    The interactive game card creation interface is being prepared for demonstration.
                    This demo will showcase:
                  </p>
                  <ul className="text-left max-w-2xl mx-auto space-y-2 text-slate mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Submit unstructured card ideas in natural language</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>View real-time rule validation and error correction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Interact with the agent via VOICE-Relay for clarifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Watch AI-generated card art creation in progress</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Download both printable and digital card assets</span>
                    </li>
                  </ul>
                  <div className="inline-flex items-center gap-2 text-sm text-slate/60 bg-slate/10 px-4 py-2 rounded-full">
                    <span>⏳</span>
                    <span>Currently in development</span>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mt-8">
                <h2 className="text-3xl font-bold text-navy mb-4">Technical Implementation</h2>
                <div className="space-y-4 text-slate">
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Agentic AI Architecture</h4>
                    <p className="leading-relaxed">
                      Utilizes autonomous AI agents that make decisions, validate data, and coordinate complex
                      multi-step workflows. Each agent specializes in different aspects of card creation,
                      from rule validation to art generation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Structured Data Conversion</h4>
                    <p className="leading-relaxed">
                      Transforms natural language card descriptions into strictly-typed JSON schemas that
                      adhere to game design specifications. Includes intelligent parsing and error handling
                      for ambiguous inputs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">VOICE-Relay Integration</h4>
                    <p className="leading-relaxed">
                      Leverages the VOICE-Relay system for secure, encrypted communication when clarifications
                      are needed. Enables voice or text responses to resolve design ambiguities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">AI Image Generation</h4>
                    <p className="leading-relaxed">
                      Integrates with image generation APIs to create custom artwork matching the game&apos;s
                      art style and thematic requirements. Includes prompt engineering for consistent results.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Template-Based Design System</h4>
                    <p className="leading-relaxed">
                      Applies professional card templates with proper typography, layout, and visual hierarchy.
                      Automatically generates both print-ready PDFs and digital game assets from the same source.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate/20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">AI Agents</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">LLMs</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Image Generation</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Python</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">VOICE-Relay</span>
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
                Ready to Automate Your Workflow?
              </h2>
              <p className="text-lg text-beige/80 leading-relaxed mb-12">
                This game card creator demonstrates how agentic AI can streamline complex creative workflows.
                Let&apos;s discuss how to build similar automation for your content creation needs.
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
