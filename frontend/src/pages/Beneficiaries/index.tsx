import React, { useEffect, useMemo, useState } from 'react';

import formatMoney from '../../helpers/formatMoney';
import api from '../../services/api';

import Header from '../../components/Header';
import createPagination from '../../components/Pagination/createPagination.js';

import * as S from './styles';

interface Beneficiary {
  total: number;
  userBeneficiaries: [
    {
      beneficiary_id: string;
      name: string;
      account_id: string;
      account_number: string;
      balance: number;
      balanceFormatted: string;
      limit: number;
      limitFormatted: string;
    },
  ];
}

const Beneficiaries: React.FC = () => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [beneficiariesAndTotal, setBeneficiariesAndTotal] = useState({
    total: 0,
    userBeneficiaries: [
      {
        beneficiary_id: '',
        name: '',
        account_id: '',
        account_number: '',
        balance: 0,
        balanceFormatted: '',
        limit: 0,
        limitFormatted: '',
      },
    ],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  useEffect(() => {
    api
      .get<Beneficiary>(`/users/beneficiaries/${user_id}`, {
        params: {
          page: currentPage,
          per_page: 10,
        },
      })
      .then(response => {
        const { total } = response.data;
        const allBeneficiaries = response.data.userBeneficiaries.map(
          beneficiary => {
            return {
              ...beneficiary,
              name: beneficiary.name.split(' ').slice(0, 1).join(' '),
              balanceFormatted: formatMoney(beneficiary.balance),
              limitFormatted: formatMoney(beneficiary.balance),
            };
          },
        );

        const beneficiariesFormatted = {
          total,
          userBeneficiaries: allBeneficiaries,
        };

        setBeneficiariesAndTotal(beneficiariesFormatted);
      });
  }, [user_id, currentPage]);

  const { pagination } = createPagination({
    numberOfArticles: beneficiariesAndTotal.total,
    articlesPerPage: 10,
    numberOfButtons: isMobile ? 2 : 8,
    currentPage,
  });

  const handleClick = (page: number): void => setCurrentPage(page);

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.ButtonContent>
            <S.Button to="/new">Novo</S.Button>
            <S.Button to="/">Transferir</S.Button>
            <S.Button to="/">Excluir</S.Button>
            <S.Button to="/">Voltar</S.Button>
          </S.ButtonContent>

          <S.BeneficiaryContent>
            <S.BeneficiaryCard>
              <S.Table>
                <thead>
                  <tr>
                    <th>Favorecido</th>
                    <th>Conta</th>
                    <th>Saldo</th>
                    <th>Limite</th>
                  </tr>
                </thead>
                <tbody>
                  {beneficiariesAndTotal.userBeneficiaries.map(beneficiary => (
                    <tr key={beneficiary.beneficiary_id}>
                      <td>{beneficiary.name}</td>
                      <td>{beneficiary.account_number}</td>
                      <td>{beneficiary.balanceFormatted}</td>
                      <td>{beneficiary.limitFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>

              {beneficiariesAndTotal.total > 0 && (
                <S.Pagination>
                  <ul>
                    <S.PaginationItem
                      className={`${
                        pagination[0] === currentPage && 'disabled'
                      }`}
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
              )}
            </S.BeneficiaryCard>
          </S.BeneficiaryContent>
        </S.Content>
      </S.Container>
    </>
  );
};

export default Beneficiaries;
