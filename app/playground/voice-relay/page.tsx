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

export default function VoiceRelayDemo() {
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
                <span className="gradient-text">VOICE</span>-Relay
              </h1>
              <p className="text-lg lg:text-xl text-beige/80 leading-relaxed mb-8">
                The fastest, simplest, and most secure relay for voice conversations between AI agents and users.
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
              {/* What is VOICE */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-navy mb-4">What is VOICE?</h2>
                <p className="text-slate leading-relaxed mb-6">
                  VOICE Relay enables end-to-end encrypted communication between an AI agent and a user&apos;s phone.
                  Users receive encrypted prompts, respond via voice or text, and send encrypted replies—all without
                  the server ever seeing the plaintext.
                </p>
                <div className="bg-beige/50 rounded-sm border border-slate/20 p-6">
                  <h3 className="text-xl font-bold text-navy mb-4">VOICE Acronym</h3>
                  <ul className="space-y-3 text-slate">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">V</span>
                      <span><span className="font-semibold">Voice</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">O</span>
                      <span><span className="font-semibold">Operated</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">I</span>
                      <span><span className="font-semibold">Interface for</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">C</span>
                      <span><span className="font-semibold">Context</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark font-bold min-w-[24px]">E</span>
                      <span><span className="font-semibold">Engines</span></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Business Use Case */}
              <div className="bg-white rounded-sm border border-slate/20 p-8 mb-8">
                <h2 className="text-3xl font-bold text-navy mb-4">Business Use Case</h2>
                <p className="text-slate leading-relaxed mb-4">
                  Organizations can leverage VOICE-Relay for secure, private AI interactions:
                </p>
                <ul className="space-y-3 text-slate">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Enable AI agents to collect sensitive information without server-side data exposure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Provide hands-free voice interactions for customer service and support applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Maintain zero-knowledge architecture for privacy-critical workflows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Create compliant AI interactions for healthcare, financial services, and legal industries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-dark mt-1">•</span>
                    <span>Build trust with users by ensuring their conversations remain private</span>
                  </li>
                </ul>
              </div>

              {/* Demo Interface */}
              <div className="bg-white rounded-sm border border-slate/20 p-8">
                <h2 className="text-3xl font-bold text-navy mb-6">Interactive Demo</h2>

                <div className="bg-beige/50 rounded-sm border border-slate/20 p-8 text-center">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-xl font-bold text-navy mb-3">Demo Coming Soon</h3>
                  <p className="text-slate leading-relaxed mb-6">
                    The interactive VOICE-Relay demonstration is being prepared for deployment.
                    This demo will showcase:
                  </p>
                  <ul className="text-left max-w-2xl mx-auto space-y-2 text-slate mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>End-to-end encryption setup and key exchange</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Voice and text input options for encrypted responses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Real-time AI agent communication via encrypted relay</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold-dark mt-1">✓</span>
                      <span>Zero server-side plaintext data storage verification</span>
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
                    <h4 className="font-semibold text-navy mb-2">End-to-End Encryption</h4>
                    <p className="leading-relaxed">
                      Implements client-side encryption where only the user and AI agent possess decryption keys.
                      The relay server handles encrypted data transmission without access to plaintext content.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Voice & Text Processing</h4>
                    <p className="leading-relaxed">
                      Supports both voice input (with speech-to-text) and text input modes. All processing
                      happens client-side before encryption, ensuring maximum privacy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Zero-Knowledge Architecture</h4>
                    <p className="leading-relaxed">
                      Server infrastructure is designed with zero-knowledge principles—encrypted data passes
                      through relay servers without any ability to decrypt or inspect the contents.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-2">Phone Integration</h4>
                    <p className="leading-relaxed">
                      Seamless integration with mobile devices enables users to receive encrypted prompts
                      and respond via their preferred input method (voice or text).
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate/20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">E2E Encryption</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Voice AI</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">Zero-Knowledge</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">WebSockets</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-xs font-semibold text-navy bg-beige px-3 py-1 rounded-full">React Native</span>
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
                Need Secure AI Communication?
              </h2>
              <p className="text-lg text-beige/80 leading-relaxed mb-12">
                VOICE-Relay demonstrates cutting-edge privacy-preserving AI interaction patterns.
                Let&apos;s discuss how to implement secure AI communications for your organization.
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
