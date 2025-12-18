import { useState } from "react";
import { db } from "../firebase"; // Make sure this path is correct
import { collection, addDoc } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      alert("Thank you for your message! It has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mangalam WiFi Zone Support</h1>
      <p>Phone / WhatsApp: +91 8276077990</p>
      <p>Service Area: Abantipur, Panchpota, Kolkata - 700152</p>
      <p>Support Hours: 24x7</p>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 15px" }}>
          Send Message
        </button>
      </form>
    </div>
  );
}
