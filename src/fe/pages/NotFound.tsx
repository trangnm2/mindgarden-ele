// KHONG SUA KHI DOI GAME
const NotFound = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem", fontSize: "2rem", fontWeight: "bold" }}>404</h1>
        <p style={{ marginBottom: "1rem", fontSize: "1.25rem", color: "#666" }}>Page not found</p>
        <a href="/" style={{ color: "#3b82f6", textDecoration: "underline" }}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
