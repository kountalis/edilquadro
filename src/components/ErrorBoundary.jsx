import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Puoi anche loggare l'errore su un servizio esterno qui
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
          <h1 style={{ color: '#ff5252' }}>Si è verificato un errore nell&apos;applicazione</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#ffb300' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          {this.state.errorInfo && (
            <details style={{ color: '#fff', marginTop: '1rem' }}>
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
