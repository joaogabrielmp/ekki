import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
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
      cellphone: string;
      cpf: string;
      limit: number;
      limitFormatted: string;
    },
  ];
}

interface SelectBeneficiary {
  beneficiary_id: string;
  account_id: string;
  account_number: string;
  cellphone: string;
  cpf: string;
  name: string;
}

interface TransferData {
  account_number: string;
  beneficiary_id: string;
  name: string;
}

Modal.setAppElement('#root');

const Beneficiaries: React.FC = () => {
  const { user, fetchUser } = useUser();
  const history = useHistory();

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
        cellphone: '',
        cpf: '',
        limit: 0,
        limitFormatted: '',
      },
    ],
  });

  const [selectBenficiary, setSelectBeneficiary] = useState<SelectBeneficiary>(
    {} as SelectBeneficiary,
  );

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

  useEffect(() => {
    fetchUser();
  }, [fetchUser, refresh]);

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

  const handleEdit = (data: SelectBeneficiary): void => {
    history.push({
      pathname: '/beneficiaries/edit',
      state: {
        beneficiary_id: data.beneficiary_id,
        cellphone: data.cellphone,
        cpf: data.cpf,
        name: data.name,
      },
    });
  };

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

  const handleTransfer = useCallback(
    async (data: TransferData) => {
      handleModal(false);

      swal(`Quanto você deseja transferir para ${data.name}?`, {
        buttons: ['Cancelar', 'Confirmar'],
        content: {
          element: 'input',
          attributes: {
            placeholder: 'R$ 0.00',
            type: 'number',
          },
        },
      }).then(value => {
        if (Number(value) > 0) {
          let message = `Seu saldo atual é ${user.account?.balanceFormatted}.`;

          if (Number(value) > user.account?.balance) {
            message = `${message} Será usado seu limite para completar a a transação. Limite atual: ${user.account?.limitFormatted}`;
          }

          swal({
            title: 'Confirma a transferência?',
            text: message,
            buttons: ['Cancelar', 'Tudo bem, transferir!'],
          })
            .then(async isConfirmed => {
              if (isConfirmed) {
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
                if (err.response.data.message === 'Balance not available') {
                  swal(
                    '',
                    'Saldo indisponível. A transação foi cancelada',
                    'error',
                  );
                } else {
                  swal(
                    'Erro',
                    'Ocorreu uma falha na transferência. Entre em contato com o suporte.',
                    'error',
                  );
                }
              }
            });
        }
      });
    },
    [user],
  );

  const { account_number, beneficiary_id, name } = selectBenficiary;

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.ButtonContent>
            <S.Button to="/beneficiaries/new">Novo</S.Button>
            <S.Button to="/">Voltar</S.Button>
          </S.ButtonContent>

          <S.BeneficiaryContent>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => handleModal(false)}
              style={{
                content: {
                  backgroundColor: '#312E38',
                  width: '300px',
                  height: '350px',
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
                    onClick={() => handleEdit(selectBenficiary)}
                  >
                    Alterar
                  </S.ModalButton>
                  <S.ModalButton
                    type="button"
                    onClick={() => handleDelete(beneficiary_id, name)}
                  >
                    Excluir
                  </S.ModalButton>
                  <S.ModalButton
                    type="button"
                    onClick={() =>
                      handleTransfer({ account_number, beneficiary_id, name })
                    }
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
