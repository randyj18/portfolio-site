"use client";

export default function Capabilities() {
  const capabilities = [
    {
      category: "AI Strategy & Governance",
      skills: [
        "Enterprise AI Strategy & Roadmapping",
        "AI Governance Frameworks",
        "Responsible AI Implementation",
        "Center of Excellence Design",
        "AI Risk & Compliance Management",
      ],
    },
    {
      category: "Product Leadership",
      skills: [
        "Product Strategy & Vision",
        "Go-to-Market Planning",
        "Cross-Functional Team Leadership",
        "Agile & Lean Product Development",
        "User-Centered Design Thinking",
      ],
    },
    {
      category: "Enterprise Transformation",
      skills: [
        "Digital Workplace Modernization",
        "Process Automation & Optimization",
        "Change Management at Scale",
        "Knowledge Management Systems",
        "Stakeholder Alignment & Communication",
      ],
    },
    {
      category: "Technical Development",
      skills: [
        "Full-Stack Application Development",
        "AI/ML Integration & Implementation",
        "Voice User Interface Design",
        "Cloud Architecture & DevOps",
        "Enterprise System Integration",
      ],
    },
    {
      category: "Data & Analytics",
      skills: [
        "Business Intelligence & Dashboards",
        "Data Governance & Classification",
        "Analytics Strategy & Implementation",
        "Performance Metrics & KPIs",
        "Data-Driven Decision Making",
      ],
    },
    {
      category: "Teaching & Mentorship",
      skills: [
        "Curriculum Design for Emerging Tech",
        "Technical Training & Enablement",
        "Team Coaching & Development",
        "Knowledge Transfer Programs",
        "Public Speaking & Thought Leadership",
      ],
    },
  ];

  return (
    <section id="capabilities" className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-green-forest/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-bronze/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-orange-burnt mb-6">
            What I Do
          </h2>
          <p className="text-lg text-beige leading-relaxed">
            Over a decade of hands-on experience across strategy, product, technology, and organizational transformation. Everything below is built from real production work.
          </p>
        </div>

        {/* Capabilities Grid - minimal, clean */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {capabilities.map((capability, index) => (
            <div key={index} className="border-t border-slate/30 pt-6">
              <h3 className="text-lg font-bold text-gold-dark mb-6">
                {capability.category}
              </h3>
              <ul className="space-y-3">
                {capability.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="flex items-start gap-3 text-beige text-sm leading-relaxed"
                  >
                    <span className="text-gold-light flex-shrink-0 pt-1">▪</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-20 pt-16 border-t border-slate/30 text-center max-w-2xl mx-auto">
          <h4 className="text-xl font-bold text-orange-burnt mb-3">More Coming</h4>
          <p className="text-beige">Deep-dive case studies, technical breakdowns, and project retrospectives. Real work, real outcomes.</p>
        </div>
      </div>
    </section>
  );
}
