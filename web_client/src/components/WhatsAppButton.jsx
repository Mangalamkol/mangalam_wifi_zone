export default function WhatsAppButton() {
  const phone = "918276077990";
  const message = encodeURIComponent(
    "Hello, I need help with Mangalam WiFi Zone"
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.button}
    >
      💬 WhatsApp Support
    </a>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#25D366",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: 30,
    fontSize: 14,
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    zIndex: 1000
  }
};