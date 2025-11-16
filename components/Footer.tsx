export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-beige py-12 border-t border-slate/20">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-slate">
              © {currentYear} Randy Jones. All rights reserved.
            </p>
          </div>

          {/* Center: Tagline */}
          <div className="text-center">
            <p className="text-sm font-medium text-slate/80">
              AI Leadership • Strategy • Execution
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex gap-6">
            <a
              href="/playground"
              className="text-sm text-slate hover:text-gold-light transition-colors duration-300"
            >
              Playground
            </a>
            <a
              href="mailto:randyjones87@gmail.com"
              className="text-sm text-slate hover:text-gold-light transition-colors duration-300"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/randy-jones-73583229/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate hover:text-gold-light transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
