import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from '@shared/components/Authentication';
import ErrorBoundary from '@shared/components/ErrorBoundary';
import Navbar from '@shared/components/Navbar';
import NotFound from '@pages/NotFound';
import WentWrong from '@pages/WentWrong';

const Home = lazy(() => import('@routes/Home'));

const Invite = lazy(() => import('@routes/Redirects/Invite'));
const Patreon = lazy(() => import('@routes/Redirects/Patreon'));

const Discord = lazy(() => import('@routes/Redirects/Discord'));

export default function App() {
    return (
        <Authentication>
            <Navbar />
            <Suspense fallback={null}>
                <ErrorBoundary fallback={<WentWrong />}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/servers" />
                        <Route path="/commands" />
                        <Route path="/dashboard" />

                        <Route path="/invite" component={Invite} />
                        <Route path="/status" />
                        <Route path="/terms" />
                        <Route path="/privacy" />
                        <Route path="/patreon" component={Patreon} />

                        <Route path="/discord" component={Discord} />
                        <Route path="/suggest" />
                        <Route path="/bug-report" />
                        <Route path="/report" />
                        <Route path="/appeal" />

                        <Route path="*" component={NotFound} />
                    </Switch>
                </ErrorBoundary>
            </Suspense>
        </Authentication>
    );
}
