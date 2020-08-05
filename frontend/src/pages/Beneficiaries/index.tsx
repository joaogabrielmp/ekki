import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import Header from '../../components/Header';
import createPagination from '../../components/Pagination/createPagination.js';
import formatMoney from '../../helpers/formatMoney';
import api from '../../services/api';

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

interface SelectBeneficiary {
  beneficiary_id: string;
  name: string;
  account_id: string;
  account_number: string;
}

Modal.setAppElement('#root');

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

  const [selectBenficiary, setSelectBeneficiary] = useState<SelectBeneficiary>({
    beneficiary_id: '',
    name: '',
    account_id: '',
    account_number: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

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
              balanceFormatted: formatMoney(beneficiary.balance),
              limitFormatted: formatMoney(beneficiary.limit),
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

  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  const { pagination } = createPagination({
    numberOfArticles: beneficiariesAndTotal.total,
    articlesPerPage: 10,
    numberOfButtons: isMobile ? 2 : 8,
    currentPage,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModal = (value: boolean, data?: SelectBeneficiary): void => {
    if (data) {
      setSelectBeneficiary(data);
    }

    setModalIsOpen(value);
  };

  const handlePaginationClick = (page: number): void => setCurrentPage(page);

  const { beneficiary_id } = selectBenficiary;

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.ButtonContent>
            <S.Button to="/">Novo</S.Button>
            <S.Button to="/">Voltar</S.Button>
          </S.ButtonContent>

          <S.BeneficiaryContent>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => handleModal(false)}
              style={{
                content: {
                  backgroundColor: '#312E38',
                  width: isMobile ? '350px' : '500px',
                  height: '35%',
                  margin: 'auto',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}
            >
              <S.ModalContent>
                <S.ModalTitle>Opções</S.ModalTitle>
                <S.ModalButtonContent>
                  <S.Button to="/beneficiaries/delete">Excluir</S.Button>
                  <S.Button to="/beneficiaries/transfer">Transferir</S.Button>
                  <S.ModalButton
                    type="button"
                    onClick={() => handleModal(false)}
                  >
                    Voltar
                  </S.ModalButton>
                </S.ModalButtonContent>
              </S.ModalContent>
            </Modal>

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
                    <tr
                      key={beneficiary.beneficiary_id}
                      onClick={() => handleModal(true, beneficiary)}
                    >
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
            </S.BeneficiaryCard>
          </S.BeneficiaryContent>
        </S.Content>
      </S.Container>
    </>
  );
};

export default Beneficiaries;
