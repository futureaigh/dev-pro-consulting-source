import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="md:col-span-1">
              <img
                src="/logo.png"
                alt="Dev-Pro Consulting"
                className="h-10 w-auto brightness-0 invert mb-4"
              />
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Delivering High Performance for Effective Social Change.
              </p>
              <p className="text-sm text-primary-foreground/60 mt-4">
                Established 2009
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {navLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Expertise
              </h4>
              <div className="space-y-2">
                <Link to="/services" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Research & M&E
                </Link>
                <Link to="/services" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Organisational Development
                </Link>
                <Link to="/services" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Integrated Development
                </Link>
                <Link to="/services" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Development Communications
                </Link>
              </div>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
                Contact
              </h4>
              <div className="space-y-3 text-sm text-primary-foreground/70">
                <p>
                  No. 110/3 Abokobi (Near the old GES Office)
                  <br />
                  P.O. Box AQ 231, Abokobi – Accra
                </p>
                <p>
                  +233 24 432 6834 / +233 24 064 9371
                </p>
                <p>info@devproconsulting.com</p>
                <p>www.devproconsulting.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm text-primary-foreground/60">
            &copy; 2025 Dev-Pro Consulting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
