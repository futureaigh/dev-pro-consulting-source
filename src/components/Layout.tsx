import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Award } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Expertise" },
  { to: "/clients", label: "Clients" },
  { to: "/publications", label: "Publications" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img
                src="/logo.png"
                alt="Dev-Pro Consulting Logo"
                className="h-10 md:h-14 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
            <div className="space-y-4 flex flex-col items-center justify-center">
              <div>
                <img
                  src="/logo.png"
                  alt="Dev-Pro Consulting Logo"
                  className="h-12 w-auto mb-2"
                />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Delivering High Performance for Effective Social Change.
              </p>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs">
                <Award className="h-3 w-3 mr-1" />
                Established 2009
              </div>
            </div>
            <div className="space-y-4 flex flex-col items-center justify-start">
              <h4 className="font-semibold">Quick Links</h4>
              <nav className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link to="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Expertise</Link>
                <Link to="/clients" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Clients</Link>
              </nav>
            </div>
            <div className="space-y-4 flex flex-col items-center justify-start">
              <h4 className="font-semibold">Expertise</h4>
              <nav className="space-y-2">
                <div className="text-sm text-muted-foreground">Research & M&E</div>
                <div className="text-sm text-muted-foreground">Organisational Development</div>
                <div className="text-sm text-muted-foreground">Integrated Development</div>
                <div className="text-sm text-muted-foreground">Development Communications</div>
              </nav>
            </div>
          </div>
          <div className="border-t mt-8 pt-8">
            <div className="text-sm text-muted-foreground text-center">
              &copy; 2025 Dev-Pro Consulting. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
