import React from "react";
import { Component } from "react";
import { Button } from "../button";
import { Result } from "../result";

type ErrorBoundaryProps = {
  title?: string;
  subTitle?: string;
  reloadPageText?: string;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  constructor(properties: ErrorBoundaryProps) {
    super(properties);
  }

  state: { hasError: boolean } = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("front/") || key.startsWith("frontend/")) {
        localStorage.removeItem(key);
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          type="error"
          title={this.props.title || "error"}
          sub_title={this.props.subTitle || "sorry_something_went_wrong"}
          extra={
            <Button style="primary" rounded onClick={this.reloadPage}>
              {this.props.reloadPageText || "reload_page"}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}
