import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, Globe2, Megaphone } from "lucide-react";

const stats = [
  { label: "Years of Experience", value: "16+", suffix: "" },
  { label: "Completed Projects", value: "70+", suffix: "" },
  { label: "Service Areas", value: "4", suffix: "" },
  { label: "Clients Served", value: "35+", suffix: "" },
];

const services = [
  {
    title: "Research, Monitoring & Evaluation",
    subtitle: "Evidence-Driven Solutions for Measurable Impact",
    icon: BarChart3,
    items: [
      "National Surveys",
      "Formative Operations & Summative Research",
      "Situational Analysis & Needs Assessments",
      "Knowledge Skills & Abilities Assessments",
      "Outcome Mapping",
      "Project/Programme Monitoring & Evaluation",
    ],
  },
  {
    title: "Organisational Development",
    subtitle: "Creating Performance Thinkers through Capacity Building",
    icon: Building2,
    items: [
      "Strategy/Project Planning Development & Implementation",
      "Organisational Development Assessments & Interventions",
      "Human Resource Audits & Workload Analysis",
      "Change Management",
      "Capacity Building & Training",
      "Independent Verification Services",
      "Coaching, Mentoring & Shadowing",
    ],
  },
  {
    title: "Integrated Decentralised Development",
    subtitle: "Participatory. Responsive. Pro-Poor.",
    icon: Globe2,
    items: [
      "Decentralised Planning & Administration",
      "District Performance Assessments",
      "Integrated Rural Development",
      "Community Mobilisation",
      "Participatory Rural Appraisals",
      "Community Scorecards & Report Cards",
    ],
  },
  {
    title: "Development Communications",
    subtitle: "Communicating for Impact",
    icon: Megaphone,
    items: [
      "Communication Strategy Development & Implementation",
      "Organisational Communication",
      "Advocacy & Social Marketing",
    ],
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Our Expertise
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Comprehensive solutions across four key areas of expertise, backed by 16+ years of experience in delivering sustainable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container space-y-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mt-2">{service.subtitle}</p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Ready to Transform Your Organisation?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Let&apos;s work together to create sustainable impact through our proven expertise.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground px-8 py-3 rounded-lg font-medium text-sm backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
