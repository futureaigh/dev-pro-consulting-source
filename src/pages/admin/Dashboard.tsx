import { useEffect, useState } from "react";
import { client } from "@/lib/client";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  message: string;
  createdAt: string | null;
};

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await client.adminGetContacts();
      setContacts(data as Contact[]);
    } catch {
      console.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this contact?")) return;
    await client.adminDeleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Contact Submissions ({contacts.length})</h2>

      {contacts.length === 0 ? (
        <p className="text-muted-foreground">No contacts yet.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                  {contact.phone && <p className="text-sm">{contact.phone}</p>}
                  {contact.organisation && <p className="text-sm">{contact.organisation}</p>}
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-sm text-destructive hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap">{contact.message}</p>
              {contact.createdAt && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
