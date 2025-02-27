import React, { useEffect, useState } from 'react';
import { format, parseISO, subHours } from 'date-fns';

import createPagination from '../../components/Pagination/createPagination.js';
import Header from '../../components/Header';
import checkIsMobile from '../../helpers/checkIsMobile';
import formatMoney from '../../helpers/formatMoney';
import { useUser } from '../../hooks/user';
import api from '../../services/api';

import * as S from './styles';

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
  const { user, fetchUser } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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

  useEffect(() => {
    if (user.id) {
      api
        .get<Transfer>(`/transfers/${user.id}`, {
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
    }
  }, [user.id, currentPage]);

  const { pagination } = createPagination({
    numberOfArticles: transfersAndTotal.total,
    articlesPerPage: 10,
    numberOfButtons: checkIsMobile() ? 2 : 8,
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
                <b>{user.name}</b>
              </h4>
              <p>Conta: {user.account?.account_number}</p>
            </S.Card>

            <S.Card>
              <h4>
                <b>Saldo atual</b>
              </h4>
              <p>{user.account?.balanceFormatted}</p>
            </S.Card>

            <S.Card>
              <h4>
                <b>Limite</b>
              </h4>
              <p>{user.account?.limitFormatted}</p>
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
