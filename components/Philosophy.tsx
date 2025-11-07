"use client";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-beige relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-40 left-10 w-64 h-64 bg-green-forest/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-bronze/8 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header - minimal */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
            Vision + Execution
          </h2>
          <p className="text-lg text-slate leading-relaxed">
            Sustainable AI transformation requires leaders who move fluidly between strategic thinking and technical implementation. No gap between vision and delivery.
          </p>
        </div>

        {/* The Problem - statement-focused */}
        <div className="mb-20 max-w-4xl">
          <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-10">
            The Problem with Enterprise AI
          </h3>

          <div className="space-y-6">
            <div className="border-l-4 border-orange-burnt pl-6">
              <h4 className="text-xl font-bold text-navy mb-2">Technology Velocity Exceeds Organizational Capacity</h4>
              <p className="text-slate leading-relaxed">AI tooling advances monthly. Most governance frameworks are built for 12-month cycles. The gap is widening.</p>
            </div>

            <div className="border-l-4 border-gold-dark pl-6">
              <h4 className="text-xl font-bold text-navy mb-2">Strategy Without Execution Depth</h4>
              <p className="text-slate leading-relaxed">Too many AI roadmaps are written by people who&apos;ve never shipped code. Implementation hits walls no one predicted.</p>
            </div>

            <div className="border-l-4 border-green-forest pl-6">
              <h4 className="text-xl font-bold text-navy mb-2">Transformation as Theater</h4>
              <p className="text-slate leading-relaxed">Impressive announcements that don&apos;t translate to measurable business outcomes. Millions spent, minimal impact realized.</p>
            </div>
          </div>
        </div>

        {/* The Approach - clean, minimal */}
        <div className="max-w-4xl">
          <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-10">
            How We Bridge This
          </h3>

          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="text-5xl font-bold text-gold-dark">01</div>
                <h4 className="text-lg font-bold text-navy">Strategic Technical Leadership</h4>
                <p className="text-slate text-sm leading-relaxed">Governance by day, shipping code at night. Decisions grounded in actual technical constraints and possibilities.</p>
              </div>

              <div className="space-y-3">
                <div className="text-5xl font-bold text-orange-burnt">02</div>
                <h4 className="text-lg font-bold text-navy">Startup Velocity in Enterprise Scale</h4>
                <p className="text-slate text-sm leading-relaxed">MVP thinking + enterprise discipline. Move fast with guardrails. Measurable progress every quarter.</p>
              </div>

              <div className="space-y-3">
                <div className="text-5xl font-bold text-bronze">03</div>
                <h4 className="text-lg font-bold text-navy">Theory Validated by Practice</h4>
                <p className="text-slate text-sm leading-relaxed">Every framework we build gets tested in production. Education + delivery + outcomes.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate/20">
              <div className="space-y-3">
                <div className="text-5xl font-bold text-gold-dark">04</div>
                <h4 className="text-lg font-bold text-navy">Long-term Strategy, Rapid Iteration</h4>
                <p className="text-slate text-sm leading-relaxed">Build for years, iterate by weeks. Sustainable change through continuous small wins.</p>
              </div>

              <div className="space-y-3">
                <div className="text-5xl font-bold text-orange-burnt">05</div>
                <h4 className="text-lg font-bold text-navy">Governance That Enables</h4>
                <p className="text-slate text-sm leading-relaxed">Frameworks that empower teams, not restrict them. Risk management designed for innovation.</p>
              </div>

              <div className="space-y-3">
                <div className="text-5xl font-bold text-bronze">06</div>
                <h4 className="text-lg font-bold text-navy">Global Thinking, Local Execution</h4>
                <p className="text-slate text-sm leading-relaxed">Patterns that scale across organizations. Validated through hands-on implementation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-24 max-w-3xl">
          <p className="text-xl lg:text-2xl text-navy font-medium leading-relaxed">
            <span className="text-orange-burnt">The best AI strategy</span> is one you&apos;ve already started executing. Real transformation happens in the gap between decision and delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
