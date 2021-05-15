import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import WebSocketProvider from '@auth/ws/WebSocketProvider';

import ErrorBoundary from '@components/ErrorBoundary';
import Navbar from '@components/Navbar';

import NotFound from '@pages/NotFound';
import ServerDown from '@pages/ServerDown';
import WentWrong from '@pages/WentWrong';

const Home = lazy(() => import('@routes/Home'));

const Invite = lazy(() => import('@routes/Redirects/Invite'));
const Patreon = lazy(() => import('@routes/Redirects/Patreon'));
const Discord = lazy(() => import('@routes/Redirects/Discord'));

export default function App() {
    return (
        <WebSocketProvider fallback={<ServerDown />}>
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
        </WebSocketProvider>
    );
}
