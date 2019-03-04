import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ApolloClient, {  Operation } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Login from './Authentication/Login/Login';
import Register from './Authentication/Create/Register';
import RequestReset from './Authentication/RequestReset/RequestReset';
import Reset from './Authentication/Reset/Reset';
import Logout from './Authentication/Logout';
import Home from './Home';
import TokenViewer from './Authentication/TokenViewer';
import { getAuthHeaders } from '../utils/Authentication';
import Authenticate from './Authentication/Authenticate';

const client = new ApolloClient({
  request: (operation: Operation): Promise<void> => {
    operation.setContext({ headers: getAuthHeaders() });
    return Promise.resolve();
  },
  clientState: {
    defaults: {
      projectId: null,
    },
    resolvers: {
      Mutation: {
        setCurrentProjectId(_: any, { projectId }, { cache }) {
          cache.writeData({ data: { projectId }});
          return null;
        }
      }
    }
  }
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register/:token" component={Register} />
        <Route path="/request-reset" component={RequestReset} />
        <Route path="/reset/:token" component={Reset} />
        <Route path="/authenticate/:token" component={Authenticate} />
        <Route path="/logout" component={Logout} />
        <Route path="/token" component={TokenViewer} />
        <Route path="/" component={Home} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
