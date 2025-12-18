export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/918276077990"
      target="_blank"
      rel="noopener noreferrer"
      style={styles.btn}
    >
      WhatsApp Support
    </a>
  );
}

const styles = {
  btn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25D366",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,.3)",
    zIndex: 2000
  }
};