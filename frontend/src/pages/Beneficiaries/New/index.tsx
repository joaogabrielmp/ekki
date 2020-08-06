import React, { useCallback } from 'react';

import * as S from './styles';

const Delete: React.FC = ({ location }: any) => {
  const { beneficiary_id } = location.state;
  const { name } = location.state;

  const handleDeleteBeneficiary = useCallback(async (id: string) => {
    try {
      alert(id);

      // open second modal

      // const response = await api.delete(`/users/beneficiaries/${id}1`);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <S.Container>
      <S.Content>
        <h2>Deseja remover {name} da lista de favorecidos?</h2>
        <S.ButtonContent>
          <S.Button
            type="button"
            onClick={() => handleDeleteBeneficiary(beneficiary_id)}
          >
            Sim
          </S.Button>
          <S.Button type="button">Não</S.Button>
        </S.ButtonContent>
      </S.Content>
    </S.Container>
  );
};

export default Delete;
