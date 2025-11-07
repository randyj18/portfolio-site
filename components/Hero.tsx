"use client";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-navy via-gray-dark to-navy relative overflow-hidden flex items-center">
      {/* Animated background elements (inspired by Extropic's organic approach) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-green-forest/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-bronze/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-10 w-72 h-72 bg-orange-burnt/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow statement */}
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-1 bg-gradient-to-r from-gold-light to-orange-burnt rounded-full" />
            <span className="text-sm font-semibold uppercase tracking-widest text-beige">Strategy Meets Execution</span>
          </div>

          {/* Main headline - bold, minimal */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight text-beige mb-8 max-w-5xl">
            AI Leadership
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-orange-burnt to-red-medium">
              for the Real World
            </span>
          </h1>

          {/* Subheading - sophisticated, no marketing fluff */}
          <p className="text-lg lg:text-xl text-beige leading-relaxed max-w-2xl mb-12">
            Strategic vision + technical depth + enterprise experience. Building scalable AI systems and governance frameworks that actually work at organizational scale.
          </p>

          {/* Key metrics - minimal, left-aligned */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-16 pt-4 border-t border-slate/20">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-gold-light mb-1">12+</div>
              <div className="text-sm uppercase tracking-widest text-beige">Years Leading AI/Tech</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-green-forest mb-1">50+</div>
              <div className="text-sm uppercase tracking-widest text-beige">Enterprise Engagements</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-burnt mb-1">6</div>
              <div className="text-sm uppercase tracking-widest text-beige">Figure Cost Savings Delivered</div>
            </div>
          </div>

          {/* CTA Buttons - minimal, elegant */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#philosophy"
              className="px-8 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 hover:scale-105"
            >
              Explore Approach →
            </a>
            <a
              href="/blog"
              className="px-8 py-4 border border-slate text-slate rounded-sm hover:bg-slate/10 transition-all duration-300 font-semibold"
            >
              Read Blog
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-slate text-slate rounded-sm hover:bg-slate/10 transition-all duration-300 font-semibold"
            >
              Start Conversation
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border border-slate/40 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-slate/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
