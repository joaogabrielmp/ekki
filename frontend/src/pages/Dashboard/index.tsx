import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO, subHours } from 'date-fns';

import api from '../../services/api';
import formatMoney from '../../helpers/formatMoney';

import Header from '../../components/Header';
import createPagination from '../../components/Pagination/createPagination.js';

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
  total: number;
  transfers: [
    {
      id: string;
      balance: number;
      created_at: string;
      name: string;
      balanceFormatted: string;
      dateFormatted: string;
    },
  ];
}

const Dashboard: React.FC = () => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [user, setUser] = useState<User>();

  const [transfersAndTotal, setTransfersAndTotal] = useState({
    total: 0,
    transfers: [
      {
        id: '',
        balance: 0,
        created_at: '',
        name: '',
        balanceFormatted: '',
        dateFormatted: '',
      },
    ],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page: number): void => setCurrentPage(page);

  useEffect(() => {
    api.get<User>(`/users/${user_id}`).then(response => {
      setUser(response.data);
    });
  }, [user_id]);

  useEffect(() => {
    api
      .get<Transfer>(`/transfers/${user_id}`, {
        params: {
          page: currentPage,
          per_page: 10,
        },
      })
      .then(response => {
        const { total } = response.data;
        const allTransfers = response.data.transfers.map(transfer => {
          return {
            ...transfer,
            name: transfer.name.split(' ').slice(0, 1).join(' '),
            balanceFormatted: formatMoney(transfer.balance),
            dateFormatted: format(
              subHours(parseISO(transfer.created_at), 3),
              'dd/MM/yyyy',
            ),
          };
        });

        const transfersFormatted = {
          total,
          transfers: allTransfers,
        };

        setTransfersAndTotal(transfersFormatted);
      });
  }, [user_id, currentPage]);

  const { pagination } = createPagination({
    numberOfArticles: transfersAndTotal.total,
    articlesPerPage: 10,
    numberOfButtons: 8,
    currentPage,
  });

  const userName = useMemo(() => {
    const name = user?.name.split(' ').slice(0, 1).join(' ');

    return name || 'Usuário';
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

  return (
    <>
      <Header />
      <S.Container>
        <S.ResumeContent>
          <S.Title>Resumo</S.Title>

          <S.CardContent>
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
        </S.ResumeContent>

        <S.TransferContent>
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
                  {transfersAndTotal.transfers.map(transfer => (
                    <tr key={transfer.id}>
                      <td>{transfer.name}</td>
                      <td>{transfer.balanceFormatted}</td>
                      <td>{transfer.dateFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>

              <S.Pagination>
                <ul>
                  <S.PaginationItem
                    className={`${pagination[0] === currentPage && 'disabled'}`}
                    onClick={() => {
                      handleClick(currentPage - 1);
                    }}
                  >
                    Anterior
                  </S.PaginationItem>
                  {pagination.map(page => (
                    <S.PaginationItem
                      className={`${currentPage === page && 'active'}`}
                      onClick={() => {
                        handleClick(page);
                      }}
                      key={page}
                    >
                      {page}
                    </S.PaginationItem>
                  ))}
                  <S.PaginationItem
                    className={`${
                      pagination.reverse()[0] === currentPage && 'disabled'
                    }`}
                    onClick={() => {
                      handleClick(currentPage + 1);
                    }}
                  >
                    Próximo
                  </S.PaginationItem>
                </ul>
              </S.Pagination>
            </S.TransferCard>
          </S.TransferCardContent>
        </S.TransferContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
