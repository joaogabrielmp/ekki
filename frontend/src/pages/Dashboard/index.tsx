import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';
import formatMoney from '../../helpers/formatMonye';

import Header from '../../components/Header';

import * as S from './styles';

interface UserData {
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

interface TransferData {
  id: string;
  balance: number;
  created_at: string;
  name: string;
  balanceFormatted: string;
  dateFormatted: string;
}

const Dashboard: React.FC = () => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [user, setUser] = useState<UserData>();
  const [transfers, setTransfers] = useState<TransferData[]>([]);

  useEffect(() => {
    api.get<UserData>(`/users/${user_id}`).then(response => {
      setUser(response.data);
    });
  }, [user_id]);

  useEffect(() => {
    api
      .get<TransferData[]>(`/transfers/${user_id}`, {
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
            dateFormatted: format(parseISO(transfer.created_at), 'dd/MM/yyyy'),
          };
        });

        setTransfers(transfersFormatted);
      });
  }, [user_id]);

  const userBalance = useMemo(() => {
    const balance = user?.account.balance || 0;

    return formatMoney(balance);
  }, [user]);

  const userLimit = useMemo(() => {
    const limit = user?.account.limit || 0;

    return formatMoney(limit);
  }, [user]);

  return (
    <>
      <Header />
      <S.Container>
        <S.CardContent>
          <S.Title>Resumo</S.Title>
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

          <S.Button to="/profile">Meus dados</S.Button>

          <S.Button to="/beneficiaries">Ver lista de favorecidos</S.Button>
        </S.CardContent>

        <S.TextContent>
          <S.Title>Histórico de transferências</S.Title>
          <S.TransferCardContent>
            <S.TransferCard>
              <S.Table>
                <thead>
                  <tr>
                    <th>Beneficiário</th>
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

              {/* <Pagination
                currentPage={currentPage}
                pages={pages}
                total={total}
              /> */}
            </S.TransferCard>
          </S.TransferCardContent>
        </S.TextContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
