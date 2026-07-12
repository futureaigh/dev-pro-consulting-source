import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Building2, Handshake } from "lucide-react";

const categories = [
  {
    title: "Publicly-owned companies",
    icon: Building2,
  },
  {
    title: "Ministries, Departments & Agencies",
    icon: Users,
  },
  {
    title: "International NGOs",
    icon: Handshake,
  },
  {
    title: "Development Partners",
    icon: Star,
  },
];

const benefits = [
  "Dedicated contact and attention",
  "Broad-based professional expertise",
  "Proactive and consistent service",
  "High-quality, timely outputs",
  "Total Satisfaction",
];

const clients = [
  { name: "Academy for Educational Development", logo: "client-01.png" },
  { name: "European Union (EU)", logo: "client-02.png" },
  { name: "Agricultural Development Bank (ADB)", logo: "client-03.png" },
  { name: "Gavi - The Vaccine Alliance", logo: "client-04.png" },
  { name: "Health Coalition", logo: "client-05.png" },
  { name: "Ministry of Finance", logo: "client-06.png" },
  { name: "MTN", logo: "client-07.png" },
  { name: "Water Aid", logo: "client-08.png" },
  { name: "USAID", logo: "client-09.png" },
  { name: "National Governance Programme", logo: "client-10.png" },
  { name: "Ghana Chamber of Mines", logo: "client-11.png" },
  { name: "Open Society Initiative for West Africa", logo: "client-12.png" },
  { name: "UNDP", logo: "client-13.png" },
  { name: "Catholic Relief Services", logo: "client-14.png" },
  { name: "Ministry of Education", logo: "client-15.png" },
  { name: "Public Services Commission", logo: "client-16.png" },
  { name: "World Education", logo: "client-17.png" },
  { name: "Ministry of Trade & Industry - Rural Enterprises Programme", logo: "client-18.png" },
  { name: "UNICEF", logo: "client-19.png" },
  { name: "Export Development and Agricultural Investment Fund", logo: "client-20.png" },
  { name: "The World Bank", logo: "client-21.png" },
  { name: "Ghana AIDS Commission", logo: "client-22.png" },
  { name: "Ghana Ports & Harbours Authority", logo: "client-23.png" },
  { name: "Society for AIDS in Africa", logo: "client-24.png" },
  { name: "Environmental Protection Agency", logo: "client-25.png" },
  { name: "Ministry of Local Government, Decentralization and Rural Development (MLGDRD)", logo: "client-26.png" },
  { name: "KfW Development Bank", logo: "client-27.png" },
  { name: "Action Aid", logo: "client-28.png" },
  { name: "State Interests Governance Authority", logo: "client-29.png" },
  { name: "Janssen", logo: "client-30.png" },
  { name: "National Health Insurance Scheme", logo: "client-31.png" },
  { name: "Public Financial Management Reform Secretariat", logo: "client-32.png" },
  { name: "Department for International Development", logo: "client-33.png" },
  { name: "Ghana Railway Development Authority", logo: "client-34.png" },
  { name: "International Labour Organisation", logo: "client-35.png" },
  { name: "International Cocoa Initiative", logo: "client-36.png" },
  { name: "National Institution Renewal Programme", logo: "client-37.png" },
  { name: "International Federation of Red Cross and Red Crescent Societies", logo: "client-38.png" },
];

export default function Clients() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Who We Serve
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            From ministries to multinationals&mdash;our client impact runs deep.
          </p>
        </div>
      </section>

      {/* Clientele Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
            Our Clientele
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            We work with a diverse range of organisations across sectors.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-foreground">{cat.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
            What Our Clients Enjoy
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            We provide comprehensive support and exceptional service.
          </p>
          <div className="max-w-2xl mx-auto space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 bg-card border rounded-lg px-5 py-3">
                <Star className="h-4 w-4 text-primary shrink-0 fill-primary" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-4">
            Trusted Partners
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We are proud to have partnered with these organisations to deliver sustainable impact and organisational excellence.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="bg-card border rounded-lg p-4 flex items-center justify-center hover:shadow-md hover:border-primary/20 transition-all group"
                title={client.name}
              >
                <img
                  src={`/clients/${client.logo}`}
                  alt={`${client.name} logo`}
                  className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Ready to Join Our Valued Clients?
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Experience the Dev-Pro difference with dedicated service and exceptional results.
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
              to="/services"
              className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground px-8 py-3 rounded-lg font-medium text-sm backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
