import React, { createContext, useCallback, useContext, useState } from 'react';

import formatMoney from '../helpers/formatMoney';
import api from '../services/api';

interface User {
  id: string;
  cellphone: string;
  cpf: string;
  name: string;
  account: {
    id: string;
    account_number: string;
    balance: number;
    balanceFormatted: string;
    limit: number;
    limitFormatted: string;
  };
}

interface UserContextData {
  user: User;
  fetchUser(): Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider: React.FC = ({ children }) => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [user, setUser] = useState<User>({} as User);

  const fetchUser = useCallback(async () => {
    const userFetch = await api
      .get<User>(`/users/${user_id}`)
      .then(response => {
        const userFormatted = {
          id: response.data.id,
          name: response.data.name.split(' ').slice(0, 1).join(' '),
          cpf: response.data.cpf,
          cellphone: response.data.cellphone,
          account: {
            id: response.data.account.id,
            account_number: response.data.account.account_number,
            balance: response.data.account.balance,
            balanceFormatted: formatMoney(response.data.account.balance),
            limit: response.data.account.limit,
            limitFormatted: formatMoney(response.data.account.limit),
          },
        };

        return userFormatted;
      });

    setUser(userFetch);
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserContextData {
  const context = useContext(UserContext);

  return context;
}

export { UserProvider, useUser };
