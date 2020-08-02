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
              <b>Últ. transferência</b>
            </h4>
            <p>R$ 150,00</p>
          </S.Card>

          <S.Card>
            <h4>
              <b>Total recebido</b>
            </h4>
            <p>R$ 150,00</p>
          </S.Card>

          <S.Card>
            <h4>
              <b>Favorecidos</b>
            </h4>
            <p>4</p>
          </S.Card>
        </S.CardContent>

        <S.TextContent>
          <S.Title>Histórico de transferências</S.Title>
          <S.TransferCardContent>
            <S.TransferCard />
          </S.TransferCardContent>
        </S.TextContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
