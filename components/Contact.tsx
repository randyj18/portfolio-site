"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-beige relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-green-forest/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header - minimal */}
          <div className="mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
              Let&apos;s Talk
            </h2>
            <p className="text-lg text-slate leading-relaxed">
              Strategic conversations about AI, leadership, transformation, or just interesting problems you&apos;re solving.
            </p>
          </div>

          {/* Contact Options - clean, minimal */}
          <div className="space-y-8 mb-20 border-t border-slate/20 pt-12">
            <a
              href="mailto:randyjones87@gmail.com"
              className="group block hover:opacity-70 transition-opacity duration-300"
            >
              <div className="text-sm uppercase tracking-widest text-slate mb-2">Email</div>
              <div className="text-2xl font-semibold text-navy group-hover:text-orange-burnt transition-colors duration-300">
                randyjones87@gmail.com
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/randy-jones-73583229/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block hover:opacity-70 transition-opacity duration-300"
            >
              <div className="text-sm uppercase tracking-widest text-slate mb-2">LinkedIn</div>
              <div className="text-2xl font-semibold text-navy group-hover:text-orange-burnt transition-colors duration-300">
                linkedin.com/in/randy-jones-73583229 →
              </div>
            </a>
          </div>

          {/* CTA Block - elegant, minimal */}
          <div className="border border-slate/20 rounded-sm p-8 lg:p-12 bg-gradient-to-br from-navy/5 to-bronze/5">
            <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
              Full Resume
            </h3>
            <p className="text-slate mb-6 leading-relaxed">
              Detailed background with specific projects, companies, years, and quantified outcomes. Available upon request with context about what you&apos;re working on.
            </p>
            <a
              href="mailto:randyjones87@gmail.com?subject=Resume Request - [Your Project]"
              className="inline-block px-6 py-3 bg-navy text-beige font-semibold rounded-sm hover:bg-navy hover:shadow-lg hover:shadow-navy/30 transition-all duration-300"
            >
              Request Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
