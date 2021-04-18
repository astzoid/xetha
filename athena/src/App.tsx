import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Loader from './Components/Loader';
import { userContext } from './Contexts/userContext';
import type { User } from './Typings';
import RequestHandler from './Api/RequestHandler';

const Discord = lazy(() => import('./Pages/Redirects/Discord'));
const Invite = lazy(() => import('./Pages/Redirects/Invite'));

const Commands = lazy(() => import('./Pages/Commands'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const Privacy = lazy(() => import('./Pages/Privacy'));
const Status = lazy(() => import('./Pages/Status'));
const Terms = lazy(() => import('./Pages/Terms'));

const NotFound = lazy(() => import('./Pages/Errors/NotFound'));

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    RequestHandler.request<User>('GET', { route: '/api/user' })
      .then((response) => setUser(response.body))
      .catch((err) => console.error(err))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <userContext.Provider value={{ user, loaded }}>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route path="/discord" component={Discord} />
          <Route path="/invite" component={Invite} />

          <Route path="/commands" component={Commands} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/status" component={Status} />
          <Route path="/terms" component={Terms} />

          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    </userContext.Provider>
  );
}
