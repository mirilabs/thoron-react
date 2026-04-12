import React from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary
} from "react-error-boundary";

function ErrorFallback(props: FallbackProps) {
  const error = props.error as Error;

  return (
    <div className="h-full">
      <h1>Something went wrong</h1>
      {
        process.env.NODE_ENV === "development" &&
        <>
          <p>{error.message}</p>
          <p>{error.stack}</p>
        </>
      }
    </div>
  )
}

function ErrorBoundary({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary;