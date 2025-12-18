import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Mangalam WiFi Zone</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/privacy" style={styles.link}>Privacy</Link>
        <Link to="/terms" style={styles.link}>Terms</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#0f172a",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  logo: { fontWeight: "bold" },
  links: { display: "flex", gap: "15px" },
  link: { color: "#fff", textDecoration: "none" }
};