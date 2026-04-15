'use client';

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center w-full min-h-[200px] bg-black-100/50 rounded-lg border border-red-500/20 p-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                Something went wrong
              </h3>
              <p className="text-sm text-gray-400">
                We encountered an error loading this section. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-400">
                    Error details
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-900 text-xs text-gray-300 rounded overflow-auto max-h-32">
                    {this.state.error?.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
