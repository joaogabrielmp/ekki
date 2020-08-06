import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import swal from 'sweetalert';

import Header from '../../components/Header';
import createPagination from '../../components/Pagination/createPagination.js';
import checkIsMobile from '../../helpers/checkIsMobile';
import formatMoney from '../../helpers/formatMoney';
import { useUser } from '../../hooks/user';
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

interface TransferData {
  account_number: string;
  beneficiary_id: string;
  name: string;
}

Modal.setAppElement('#root');

const Beneficiaries: React.FC = () => {
  // const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const { user } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    if (user.id) {
      api
        .get<Beneficiary>(`/users/beneficiaries/${user.id}`, {
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
    }
  }, [user.id, currentPage, refresh]);

  const { pagination } = createPagination({
    numberOfArticles: beneficiariesAndTotal.total,
    articlesPerPage: 10,
    numberOfButtons: checkIsMobile() ? 2 : 8,
    currentPage,
  });

  const handleModal = (value: boolean, data?: SelectBeneficiary): void => {
    if (data) {
      setSelectBeneficiary(data);
    }

    setModalIsOpen(value);
  };

  const handlePaginationClick = (page: number): void => setCurrentPage(page);

  const handleDelete = useCallback(async (id: string, beneficiary: string) => {
    handleModal(false);

    swal({
      title: 'Tem certeza?',
      text: `Deseja remover ${beneficiary} da lista de favorecidos?`,
      buttons: ['Não', 'Sim'],
      dangerMode: true,
    })
      .then(async willDelete => {
        if (willDelete) {
          await api.delete(`/users/beneficiaries/${id}`);

          setRefresh(state => !state);

          swal('Favorecido removido!', {
            icon: 'success',
          });
        }
      })
      .catch(err => {
        if (err) {
          swal(
            'Erro',
            'Ocorreu uma falha ao remover o favorecido. Entre em contato com o suporte.',
            'error',
          );
        }
      });
  }, []);

  const handleTransfer = useCallback(async (data: TransferData) => {
    handleModal(false);

    swal(`Quanto você deseja transferir para ${data.name}?`, {
      buttons: ['Cancelar', 'Confirmar'],
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Informe valor a ser transferido',
          value: 0,
          type: 'number',
        },
      },
    })
      .then(async value => {
        if (value > 0) {
          // input mask

          await api.post('/transfers', {
            receive_account_number: data.account_number,
            receive_user_id: data.beneficiary_id,
            send_account_number: user.account?.account_number,
            send_user_id: user.id,
            value: Number(value),
          });

          setRefresh(state => !state);

          swal('Valor transferido!', {
            icon: 'success',
          });
        }
      })
      .catch(err => {
        if (err) {
          swal(
            'Erro',
            'Ocorreu uma falha ao transferir o valor. Entre em contato com o suporte.',
            'error',
          );
        }
      });
  }, []);

  const { account_number, beneficiary_id, name } = selectBenficiary;

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
                  width: checkIsMobile() ? '350px' : '500px',
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
                  <S.ModalButton
                    type="button"
                    onClick={() => handleDelete(beneficiary_id, name)}
                  >
                    Excluir
                  </S.ModalButton>
                  <S.ModalButton
                    type="button"
                    onClick={() =>
                      handleTransfer({ account_number, beneficiary_id, name })}
                  >
                    Transferir
                  </S.ModalButton>
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
