import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './shared/components/Authentication';
import ErrorBoundary from './shared/components/ErrorBoundary';
import NotFound from './pages/NotFound';
import WentWrong from './pages/WentWrong';

export default function App() {
  return (
    <Authentication>
      <Suspense fallback={null}>
        <Switch>
          <ErrorBoundary fallback={<WentWrong />}>
            <Route exact path="/" />
            <Route path="/home" />

            <Route path="/commands" />
            <Route path="/dashboard" />
            <Route path="/privacy" />

            <Route path="/discord" />
            <Route path="/github" />
            <Route path="/invite" />
            <Route path="/patreon" />

            <Route path="/servers" />
            <Route path="/status" />
            <Route path="/terms" />
            <Route path="*" component={NotFound} />
          </ErrorBoundary>
        </Switch>
      </Suspense>
    </Authentication>
  );
}
