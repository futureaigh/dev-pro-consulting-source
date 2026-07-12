import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/react";
import { Link, useLocation } from "react-router-dom";
import { client } from "@/lib/client";
import { MessageSquare, Trash2, Menu, X, LayoutDashboard, CheckCircle, Archive } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  message: string;
  createdAt: string | null;
  attended: number | null;
  archived: number | null;
};

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
];

type Filter = "all" | "pending" | "attended" | "archived";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "attended", label: "Attended" },
  { key: "archived", label: "Archived" },
];

export default function AdminDashboard() {
  const { user } = useUser();
  const location = useLocation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

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

  async function handleUpdate(id: string, data: { attended?: number; archived?: number }) {
    await client.adminUpdateContactStatus(id, data);
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  }

  const filtered = contacts.filter((c) => {
    if (filter === "pending") return !c.attended && !c.archived;
    if (filter === "attended") return c.attended;
    if (filter === "archived") return c.archived;
    return true;
  });

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
            <div className="px-6 py-4 border-b flex items-center justify-between gap-4 flex-wrap">
              <h2 className="font-semibold">Contact Submissions</h2>
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      filter === f.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {contacts.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No contacts yet.</p>
            ) : filtered.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No {filter} contacts.</p>
            ) : (
              <div className="divide-y">
                {filtered.map((contact) => (
                  <div key={contact.id} className="px-6 py-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {contact.name}
                          <span className={`ml-2 inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                            contact.archived
                              ? "bg-gray-100 text-gray-500"
                              : contact.attended
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {contact.archived ? "Archived" : contact.attended ? "Attended" : "Pending"}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        {(contact.phone || contact.organisation) && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {[contact.phone, contact.organisation].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm mt-2 whitespace-pre-wrap">{contact.message}</p>
                        {contact.createdAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(contact.createdAt.replace(" ", "T") + "Z").toLocaleString()}
                          </p>
                        )}
                        <div className="flex gap-3 mt-3">
                          {contact.archived ? (
                            <button
                              onClick={() => handleUpdate(contact.id, { archived: 0 })}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
                            >
                              <Archive className="h-3 w-3" /> Unarchive
                            </button>
                          ) : (
                            <>
                              {contact.attended ? (
                                <button
                                  onClick={() => handleUpdate(contact.id, { attended: 0 })}
                                  className="inline-flex items-center gap-1 text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                                >
                                  <CheckCircle className="h-3 w-3" /> Mark Pending
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdate(contact.id, { attended: 1 })}
                                  className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                                >
                                  <CheckCircle className="h-3 w-3" /> Mark Attended
                                </button>
                              )}
                              <button
                                onClick={() => handleUpdate(contact.id, { archived: 1 })}
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
                              >
                                <Archive className="h-3 w-3" /> Archive
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(contact.id)}
                            disabled={deleting === contact.id}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive font-medium disabled:opacity-50"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
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
