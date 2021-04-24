import { Component } from 'react';
import Logger from '../functions/Logger';
import type { ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  error: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error) {
    Logger.error(error);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
