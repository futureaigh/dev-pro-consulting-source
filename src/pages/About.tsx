import { Link } from "react-router-dom";
import { ArrowRight, Feather, Sparkles, Zap } from "lucide-react";

const qualities = [
  { title: "Flexible", icon: Feather },
  { title: "Efficient", icon: Zap },
  { title: "Results-driven", icon: Sparkles },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                About Dev-Pro Consulting
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                A leading management and development consultancy firm, established in 2009, with experience across all 16 regions and 150+ districts in Ghana. We provide sustainable strategies for organisational effectiveness and long-term impact.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/about-team.png"
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower clients with sustainable strategies for organisational effectiveness and long-term impact.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading one-stop shop for comprehensive management and development solutions in Ghana and the sub-region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Approach */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-6">
            Our Team & Approach
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            Our strength is rooted in people. We bring together a core team of seasoned consultants, a dynamic support system and a global pool of associate experts.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {qualities.map((q) => {
              const Icon = q.icon;
              return (
                <div key={q.title} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">{q.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Ready to Work Together?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Let&apos;s discuss how we can help transform your organisation and create sustainable impact.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors"
          >
            Get In Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
