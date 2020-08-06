import React from 'react';
import {
  Redirect,
  Route,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useUser } from '../hooks/user';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={props => {
        if (user.id) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
