import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          fontFamily: "'Nunito', sans-serif",
        }}>
          <div style={{
            textAlign: "center",
            padding: "2rem",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "1rem",
            border: "1px solid rgba(255,255,255,0.15)",
            maxWidth: "400px",
          }}>
            <h2 style={{ color: "#ff6b6b", fontSize: "1.5rem", marginBottom: "0.8rem" }}>
              Đã xảy ra lỗi
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              {this.state.error?.message || "Vui lòng thử lại"}
            </p>
            <button
              onClick={this.handleRetry}
              style={{
                padding: "0.6rem 1.6rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Thử lại
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
