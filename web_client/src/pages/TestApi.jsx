import { useState } from "react";

export default function ApiTest() {
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/test");
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching API:", error);
      setResponse({ error: "Failed to fetch API" });
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🧪 API Test Route</h1>
      <button onClick={handleClick}>Fetch API</button>
      {response && (
        <pre
          style={{
            marginTop: 20,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 5,
            textAlign: "left",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
