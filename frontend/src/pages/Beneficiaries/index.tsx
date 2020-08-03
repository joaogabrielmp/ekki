import React, { useEffect, useState } from 'react';
import { Money } from 'styled-icons/boxicons-regular';
import { Delete } from 'styled-icons/material';

import api from '../../services/api';

import Header from '../../components/Header';

import * as S from './styles';

interface Beneficiaries {
  beneficiary_id: string;
  name: string;
  account_id: string;
  account_number: string;
}

const Beneficiaries: React.FC = () => {
  const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';

  const [beneficiaries, setBeneficiaries] = useState<Beneficiaries[]>([]);

  useEffect(() => {
    api
      .get<Beneficiaries[]>(`/users/beneficiaries/${user_id}`, {
        params: {
          page: 1,
          per_page: 10,
        },
      })
      .then(response => {
        setBeneficiaries(response.data);
      });
  }, [user_id]);

  return (
    <>
      <Header />
      <S.Container>
        <S.TextContent>
          <S.ButtonContent>
            <S.Button to="/new">Novo</S.Button>
            <S.Button to="/">Voltar para home</S.Button>
          </S.ButtonContent>

          <S.TransferCardContent>
            <S.TransferCard>
              <S.Table>
                <thead>
                  <tr>
                    <th>Favorecido</th>
                    <th>Conta</th>
                    <th>Transferir</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {beneficiaries.map(beneficiary => (
                    <tr key={beneficiary.beneficiary_id}>
                      <td>{beneficiary.name}</td>
                      <td>{beneficiary.account_number}</td>
                      <td>
                        <Money style={{ color: '#000', width: '36px' }} />
                      </td>
                      <td>
                        <Delete style={{ color: '#000', width: '36px' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.TransferCard>
          </S.TransferCardContent>
        </S.TextContent>
      </S.Container>
    </>
  );
};

export default Beneficiaries;
