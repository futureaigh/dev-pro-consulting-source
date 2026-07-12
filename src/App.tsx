import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/react";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Clients from "@/pages/Clients";
import Publications from "@/pages/Publications";
import Contact from "@/pages/Contact";
import SignInPage from "@/pages/SignIn";
import AdminDashboard from "@/pages/admin/Dashboard";

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return null;
  const isAdmin = user?.publicMetadata?.role === "admin";
  if (!isAdmin) return <div className="p-8 text-center text-muted-foreground">Access denied.</div>;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
