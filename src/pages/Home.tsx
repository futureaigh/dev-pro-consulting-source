import { Link } from "react-router-dom";
import { ChevronRight, ChartColumn, Users, Target, MessageSquare, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const expertiseAreas = [
  {
    title: "Research, Monitoring & Evaluation",
    description: "Evidence-Driven Solutions for Measurable Impact",
    Icon: ChartColumn,
  },
  {
    title: "Organisational Development",
    description: "Creating Performance Thinkers through Capacity Building",
    Icon: Users,
  },
  {
    title: "Integrated Decentralised Development",
    description: "Participatory. Responsive. Pro-Poor.",
    Icon: Target,
  },
  {
    title: "Development Communications",
    description: "Communicating for Impact",
    Icon: MessageSquare,
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
  { name: "Academy for Educational Development", file: "client-01.png" },
  { name: "European Union (EU)", file: "client-02.png" },
  { name: "Gavi - The Vaccine Alliance", file: "client-04.png" },
  { name: "USAID", file: "client-09.png" },
  { name: "UNDP", file: "client-13.png" },
  { name: "UNICEF", file: "client-19.png" },
  { name: "The World Bank", file: "client-21.png" },
  { name: "MTN", file: "client-07.png" },
  { name: "Water Aid", file: "client-08.png" },
  { name: "Action Aid", file: "client-28.png" },
  { name: "KfW Development Bank", file: "client-27.png" },
  { name: "Janssen", file: "client-30.png" },
];

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const doubledLogos = [...clientLogos, ...clientLogos];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      setScrollPos((prev) => {
        const next = prev - 0.5;
        const halfWidth = el.scrollWidth / 2;
        if (Math.abs(next) >= halfWidth) return 0;
        return next;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="consulting-hero-with-image text-white py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(146, 39, 143, 0.8) 0%, rgba(4, 4, 4, 0.95) 100%), url('/hero-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Delivering High Performance for Effective Social Change
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Empowering people, institutions and systems to thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div tabIndex={0}>
              <Link
                to="/services"
                className="inline-flex items-center justify-center whitespace-nowrap sm:rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 border h-11 rounded-md px-8 micro-animation"
              >
                Explore Our Services
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div tabIndex={0}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap sm:rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-foreground h-11 rounded-md px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 micro-animation"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer tailor-made, evidence-based interventions to address your unique challenges. Our work is structured around four key pillars.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, i) => {
              const Icon = area.Icon;
              return (
                <FadeInSection key={area.title}>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm consulting-card h-full micro-animation">
                    <div className="flex flex-col space-y-1.5 p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-lg">{area.title}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground text-center mb-4">{area.description}</p>
                      <div tabIndex={0}>
                        <Link
                          to="/services"
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-xl sm:rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full micro-animation"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
            <p className="text-xl text-muted-foreground">People. Process. Precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <FadeInSection key={value.title}>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm consulting-card text-center micro-animation h-full">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">{value.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Leading Organizations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We are proud to have partnered with these organizations to deliver sustainable impact and organizational excellence.
            </p>
            <div tabIndex={0}>
              <Link
                to="/clients"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl sm:rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 micro-animation"
              >
                View Clients
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex space-x-8 md:space-x-12"
              style={{ transform: `translateX(${scrollPos}px)`, transition: "none" }}
            >
              {doubledLogos.map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 flex items-center justify-center bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  title={client.name}
                >
                  <img
                    src={`/clients/${client.file}`}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 consulting-gradient text-white">
        <div className="container mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Organisation?</h2>
            <p className="text-xl mb-8 opacity-90">Let&apos;s work together to create sustainable impact.</p>
            <div tabIndex={0}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap sm:rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 border h-11 rounded-md px-8 micro-animation"
              >
                Get In Touch
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
