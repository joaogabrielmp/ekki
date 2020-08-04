import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO, subHours } from 'date-fns';

import api from '../../services/api';
import formatMoney from '../../helpers/formatMoney';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

import * as S from './styles';

interface User {
  name: string;
  cpf: string;
  cellphone: string;
  account: {
    id: string;
    account_number: string;
    balance: number;
    limit: number;
  };
}

interface Transfer {
  id: string;
  balance: number;
  created_at: string;
  name: string;
  balanceFormatted: string;
  dateFormatted: string;
}

const Dashboard: React.FC = () => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [user, setUser] = useState<User>();
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    api.get<User>(`/users/${user_id}`).then(response => {
      setUser(response.data);
    });
  }, [user_id]);

  useEffect(() => {
    api
      .get<Transfer[]>(`/transfers/${user_id}`, {
        params: {
          page: 1,
          per_page: 10,
        },
      })
      .then(response => {
        const transfersFormatted = response.data.map(transfer => {
          return {
            ...transfer,
            balanceFormatted: formatMoney(transfer.balance),
            dateFormatted: format(
              subHours(parseISO(transfer.created_at), 3),
              'dd/MM/yyyy',
            ),
          };
        });

        setTransfers(transfersFormatted);
      });
  }, [user_id]);

  const userName = useMemo(() => {
    return user?.name || 'Usuário';
  }, [user]);

  const userAccount = useMemo(() => {
    return user?.account.account_number || '000000-0';
  }, [user]);

  const userBalance = useMemo(() => {
    const balance = user?.account.balance || 0;

    return formatMoney(balance);
  }, [user]);

  const userLimit = useMemo(() => {
    const limit = user?.account.limit || 0;

    return formatMoney(limit);
  }, [user]);

  // const numberOfArticles = transfers.length;
  const numberOfArticles = 11;

  return (
    <>
      <Header />
      <S.Container>
        <S.CardContent>
          <S.Title>Resumo</S.Title>
          <S.Card>
            <h4>
              <b>{userName}</b>
            </h4>
            <p>Conta: {userAccount}</p>
          </S.Card>

          <S.Card>
            <h4>
              <b>Saldo atual</b>
            </h4>
            <p>{userBalance}</p>
          </S.Card>

          <S.Card>
            <h4>
              <b>Limite</b>
            </h4>
            <p>{userLimit}</p>
          </S.Card>

          <S.Button to="/beneficiaries">Ver lista de favorecidos</S.Button>
        </S.CardContent>

        <S.TextContent>
          <S.Title>Histórico de transferências</S.Title>
          <S.TransferCardContent>
            <S.TransferCard>
              <S.Table>
                <thead>
                  <tr>
                    <th>Favorecido</th>
                    <th>Valor</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map(transfer => (
                    <tr key={transfer.id}>
                      <td>{transfer.name}</td>
                      <td>{transfer.balanceFormatted}</td>
                      <td>{transfer.dateFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
              <Pagination numberOfArticles={numberOfArticles} />
            </S.TransferCard>
          </S.TransferCardContent>
        </S.TextContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
