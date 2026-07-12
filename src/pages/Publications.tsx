import { ArrowRight, FileText, BookOpen, FolderOpen } from "lucide-react";

const publications = [
  {
    type: "Brochure",
    year: "2025",
    title: "Dev-Pro Consulting Company Brochure",
    description:
      "Comprehensive overview of Dev-Pro Consulting's services, expertise, team and track record. Features detailed information about our four key service pillars: Research & M&E, Organisational Development, Integrated Decentralised Development and Development Communications.",
    icon: FileText,
    link: "#",
  },
  {
    type: "Research Paper",
    year: "2024",
    title: "Local Government Decentralization and Organizational Performance",
    description:
      "Research article published in Taylor & Francis examining the relationship between local government decentralization and organizational performance in Ghana. This study provides insights into how decentralization affects public sector efficiency and service delivery.",
    icon: BookOpen,
    link: "#",
  },
  {
    type: "Resource",
    year: "2024",
    title: "Business Summit - Where the Small Business is the Big Idea",
    description:
      "Comprehensive business development resource focusing on Micro, Small and Medium Enterprises (MSMEs) in Ghana. Features capacity building programs, business development services, and educational content for entrepreneurs and small business owners.",
    icon: FolderOpen,
    link: "#",
  },
];

export default function Publications() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Publications
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover our research findings, insights and thought leadership in development consulting.
          </p>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="space-y-8">
            {publications.map((pub) => {
              const Icon = pub.icon;
              return (
                <div
                  key={pub.title}
                  className="bg-card border rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {pub.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{pub.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pub.description}
                      </p>
                      <a
                        href={pub.link}
                        className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Publication
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
