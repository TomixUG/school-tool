import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import PageAlertContext from './vibe/components/utilities/ContextProviders';
import './vibe/scss/styles.scss';
import './style.css';

import authCookies from './util/authCookies';
import { AuthContext } from './util/AuthContext';

import Login from './views/pages/auth/Login';
import Register from './views/pages/auth/Register';

const GET_TOKEN_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

export default function App() {
  const [token, setToken] = useContext(AuthContext);

  const getNewToken = () => {
    return client
      .mutate({ mutation: GET_TOKEN_MUTATION, variables: { refreshToken: authCookies.getRefreshTokenCookie() } })
      .then((response) => {
        // extract your accessToken from your response data and return it
        const accessToken = response.data.refreshToken.token;
        const refreshToken = response.data.refreshToken.refreshToken;
        console.log(accessToken);

        setToken(accessToken); //set to state
        authCookies.setTokenCookie(accessToken); //set accessToken to cookies
        authCookies.setRefreshTokenCookie(refreshToken); //set refreshToken to cookies

        return;
      })
      .catch((err) => {
        //invalid refresh token
        console.log('invalid refresh token');
        console.log(err);
        authCookies.removeAuthCookies();
        setToken('emergency'); 
      });
  };

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'INVALID_TOKEN':
            console.log('invalid token');
            getNewToken().then(() => {
              return forward(operation);
            });
        }
      }
    }
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
    link: from([errorLink, httpLink]),
  });

  return (
    <PageAlertContext>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={DashboardLayout} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </PageAlertContext>
  );
}
