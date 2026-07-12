import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/react";
import { Link, useLocation } from "react-router-dom";
import { client } from "@/lib/client";
import { MessageSquare, FileText, Trash2, Menu, X, LayoutDashboard } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  message: string;
  createdAt: string | null;
};

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
];

export default function AdminDashboard() {
  const { user } = useUser();
  const location = useLocation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    client.adminGetContacts().then((data) => setContacts(data as Contact[])).catch(() => {});
  }, []);

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await client.adminDeleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/admin" className="font-semibold text-lg">Dev-Pro Admin</Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-8">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.emailAddresses?.[0]?.emailAddress}</span>
            <UserButton />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{contacts.length}</p>
                  <p className="text-sm text-muted-foreground">Contact Submissions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-card border rounded-xl">
            <div className="px-6 py-4 border-b">
              <h2 className="font-semibold">Contact Submissions</h2>
            </div>
            {contacts.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No contacts yet.</p>
            ) : (
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div key={contact.id} className="px-6 py-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        {(contact.phone || contact.organisation) && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {[contact.phone, contact.organisation].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm mt-2 whitespace-pre-wrap">{contact.message}</p>
                        {contact.createdAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(contact.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        disabled={deleting === contact.id}
                        className="shrink-0 p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
