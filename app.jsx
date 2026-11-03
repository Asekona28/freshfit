
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Newsletter from "./pages/Newsletter.jsx";
import Analytics from "./pages/Analytics.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          FRESHFIT
        </NavLink>

        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/newsletter">Join our list</NavLink>
          <NavLink to="/analytics">Campaign dashboard</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="*"
            element={
              <section className="section">
                <h1>Page not found</h1>
                <p>Please use the navigation to return to FreshFit.</p>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>FreshFit — activewear for your everyday movement.</p>
        <p>
          Coursework demonstration. Sample data only; no real emails are sent.
        </p>
      </footer>
    </div>
  );
}
