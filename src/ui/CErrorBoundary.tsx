import React from "react";

interface State {
  hasError: boolean;
}

export interface CErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
  degug?: boolean;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

export class CErrorBoundary extends React.Component<
  CErrorBoundaryProps,
  State
> {
  constructor(props: CErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (this.props.degug) console.error(error, info.componentStack);
    if (this.props.onError) this.props.onError(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
