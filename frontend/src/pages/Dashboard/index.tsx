import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';

import api from '../../services/api';
import formatMoney from '../../helpers/formatMonye';

import Header from '../../components/Header';
// import Pagination from '../../components/Pagination';

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

const Dashboard: React.FC = () => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    api.get(`/users/${user_id}`).then(response => {
      setUser(response.data);
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

          <S.Button>Meus dados</S.Button>

          <S.Button>Ver lista de favorecidos</S.Button>
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
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Ernst Handel</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Island Trading</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>R$ 100,00</td>
                    <td>03/08/2020</td>
                  </tr>
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
