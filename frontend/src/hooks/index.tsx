import React from 'react';

import { UserProvider } from './user';

const AppProvider: React.FC = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

export default AppProvider;
