import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Target } from "lucide-react";

const expertiseAreas = [
  {
    title: "Research, Monitoring & Evaluation",
    description: "Evidence-Driven Solutions for Measurable Impact",
    icon: Shield,
  },
  {
    title: "Organisational Development",
    description: "Creating Performance Thinkers through Capacity Building",
    icon: Zap,
  },
  {
    title: "Integrated Decentralised Development",
    description: "Participatory. Responsive. Pro-Poor.",
    icon: Target,
  },
  {
    title: "Development Communications",
    description: "Communicating for Impact",
    icon: Shield,
  },
];

const values = [
  {
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our engagements.",
  },
  {
    title: "High Performance",
    description: "We deliver exceptional results that exceed expectations.",
  },
  {
    title: "Client-Oriented",
    description: "Your success is our priority. We tailor solutions to your unique needs.",
  },
];

const clientLogos = [
  "Academy for Educational Development",
  "European Union (EU)",
  "Gavi - The Vaccine Alliance",
  "USAID",
  "UNDP",
  "UNICEF",
  "The World Bank",
  "MTN",
  "Water Aid",
  "Action Aid",
  "KfW Development Bank",
  "Janssen",
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Delivering High Performance for Effective Social Change
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
              Empowering people, institutions and systems to thrive.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Expertise
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We offer tailor-made, evidence-based interventions to address your unique challenges. Our work is structured around four key pillars.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertiseAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="group bg-card border rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {area.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our Approach
            </h2>
            <p className="mt-2 text-primary font-medium">People. Process. Precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Trusted by Leading Organizations
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We are proud to have partnered with these organizations to deliver sustainable impact and organizational excellence.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {clientLogos.map((client) => (
              <div
                key={client}
                className="px-4 py-2 bg-card border rounded-lg text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
              >
                {client}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 transition-colors"
            >
              View Clients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Ready to Transform Your Organisation?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Let&apos;s work together to create sustainable impact.
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
