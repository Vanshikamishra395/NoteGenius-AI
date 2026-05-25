import { useState } from "react";
import axios from "axios";

function App() {
  const [pdf, setPdf] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!pdf) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/upload", formData);

      setResponse(res.data.aiResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error uploading PDF");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "36px" }}>
        NoteGenius AI Study Assistant
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "40px auto",
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          style={{
            display: "block",
            marginTop: "20px",
            padding: "12px 24px",
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Upload PDF
        </button>

        {loading && (
          <div style={{ marginTop: "20px", fontSize: "16px" }}>
            ⏳ Generating AI Notes...
          </div>
        )}

        {response && (
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#334155",
              padding: "25px",
              borderRadius: "10px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;