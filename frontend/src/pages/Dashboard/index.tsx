import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import * as S from './styles';

const Dashboard: React.FC = () => {
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
            <p>R$ 1000,00</p>
          </S.Card>

          <S.Card>
            <h4>
              <b>Limite</b>
            </h4>
            <p>R$ 500,00</p>
          </S.Card>

          <S.Button>Meus dados</S.Button>

          <S.Button>Ver lista de favorecidos</S.Button>
        </S.CardContent>

        <S.TextContent>
          <S.Title>Histórico de transferências</S.Title>
          <S.TransferCardContent>
            <S.TransferCard>
              <S.Table>
                <tr>
                  <th>Beneficiário</th>
                  <th>Valor</th>
                  <th>Data</th>
                </tr>
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
              </S.Table>
            </S.TransferCard>
          </S.TransferCardContent>
        </S.TextContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
