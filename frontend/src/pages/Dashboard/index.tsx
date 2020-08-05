import React, { useEffect, useState } from 'react';
import { format, parseISO, subHours } from 'date-fns';

import formatMoney from '../../helpers/formatMoney';
import api from '../../services/api';

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
    balanceFormatted: string;
    limit: number;
    limitFormatted: string;
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

  useEffect(() => {
    api.get<User>(`/users/${user_id}`).then(response => {
      const userFormatted = {
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

      setUser(userFormatted);
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

  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  const { pagination } = createPagination({
    numberOfArticles: transfersAndTotal.total,
    articlesPerPage: 10,
    numberOfButtons: isMobile ? 2 : 8,
    currentPage,
  });

  const handlePaginationClick = (page: number): void => setCurrentPage(page);

  return (
    <>
      <Header />
      <S.Container>
        <S.ResumeContent>
          <S.Title>Resumo</S.Title>

          <S.CardContent>
            <S.Card>
              <h4>
                <b>{user?.name}</b>
              </h4>
              <p>Conta: {user?.account.account_number}</p>
            </S.Card>

            <S.Card>
              <h4>
                <b>Saldo atual</b>
              </h4>
              <p>{user?.account.balanceFormatted}</p>
            </S.Card>

            <S.Card>
              <h4>
                <b>Limite</b>
              </h4>
              <p>{user?.account.limitFormatted}</p>
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

              {transfersAndTotal.total > 0 && (
                <S.Pagination>
                  <ul>
                    <S.PaginationItem
                      className={`${
                        pagination[0] === currentPage && 'disabled'
                      }`}
                      onClick={() => {
                        handlePaginationClick(currentPage - 1);
                      }}
                    >
                      Anterior
                    </S.PaginationItem>
                    {pagination.map(page => (
                      <S.PaginationItem
                        className={`${currentPage === page && 'active'}`}
                        onClick={() => {
                          handlePaginationClick(page);
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
                        handlePaginationClick(currentPage + 1);
                      }}
                    >
                      Próximo
                    </S.PaginationItem>
                  </ul>
                </S.Pagination>
              )}
            </S.TransferCard>
          </S.TransferCardContent>
        </S.TransferContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
