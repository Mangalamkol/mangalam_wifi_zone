import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PaymentSuccess from "./pages/PaymentSuccess";
import AccessCode from "./pages/AccessCode";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/access-code/:code/:validity" element={<AccessCode />} />
    </Routes>
  );
}