import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import swal from 'sweetalert';
import * as Yup from 'yup';

import { isFirstDayOfMonth } from 'date-fns/esm/fp';
import Input from '../../../components/Input';
import Header from '../../../components/Header';
import getValidationErrors from '../../../helpers/getValidationErrors';
import { cpfMask, cellphoneMask, onlyNumber } from '../../../helpers/mask';
import { useUser } from '../../../hooks/user';
import api from '../../../services/api';

import * as S from './styles';

interface BeneficiaryFormData {
  cellphone: string;
  cpf: string;
  name: string;
}

interface BeneficiaryLocation {
  beneficiary_id: string;
  cellphone: string;
  cpf: string;
  name: string;
}

const EditBeneficiary: React.FC = () => {
  const { user } = useUser();
  const location = useLocation<BeneficiaryLocation>();
  const beneficiary = location?.state;
  const [cellphoneState, setCellPhoneState] = useState(
    cellphoneMask(beneficiary.cellphone),
  );
  const [cpfState, setCPFState] = useState(cpfMask(beneficiary.cpf));
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: BeneficiaryFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string()
            .length(11, 'Deve ter 11 dígitos')
            .required('CPF obrigatório'),
          cellphone: Yup.string()
            .length(11, 'Deve ter 11 dígitos')
            .required('Telefone obrigatório'),
        });

        const { cellphone, cpf, name } = data;

        const changedPhone = beneficiary.cellphone !== onlyNumber(cellphone);
        const changedCPF = beneficiary.cpf !== onlyNumber(cpf);
        const changedName = beneficiary.name !== name;

        const checkFormData = {
          cellphone: onlyNumber(cellphone),
          cpf: changedCPF ? onlyNumber(cpf) : beneficiary.cpf,
          name,
        };

        await schema.validate(checkFormData, {
          abortEarly: false,
        });

        let formData = {};

        if (changedPhone) {
          formData = { cellphone: onlyNumber(cellphone) };
        }

        if (changedCPF) {
          formData = { cpf: onlyNumber(cpf) };
        }

        if (changedName) {
          formData = { name };
        }

        if (changedPhone || changedCPF || changedName) {
          await api.put(`/users/${beneficiary.beneficiary_id}`, formData);
        }

        history.push('/beneficiaries');

        swal('Favorecido cadastrado!', {
          icon: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          swal(
            'Ocorreu uma falha ao cadastrar o favorecido',
            'Verifique os dados informados. Caso persista, etre em contato com o suporte.',
            'error',
          );
        }
      }
    },
    [history, beneficiary],
  );

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCPFState(cpfMask(e.target.value));
  };

  const handleCellphoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setCellPhoneState(cellphoneMask(e.target.value));
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <S.ButtonContent>
            <S.Button type="submit" form="formNewBeneficiary">
              Alterar
            </S.Button>
            <S.LinkButton to="/beneficiaries">Voltar</S.LinkButton>
          </S.ButtonContent>
          <S.Card>
            <h2>Alterar favorecido</h2>
            <Form
              ref={formRef}
              initialData={{
                name: beneficiary.name,
              }}
              onSubmit={handleSubmit}
              id="formNewBeneficiary"
            >
              <Input name="name" placeholder="Nome" />
              <Input
                name="cpf"
                maxLength={14}
                value={cpfState}
                onChange={handleCPFChange}
                placeholder="CPF"
              />
              <Input
                name="cellphone"
                maxLength={15}
                value={cellphoneState}
                onChange={handleCellphoneChange}
                placeholder="Telefone"
              />
            </Form>
          </S.Card>
        </S.Content>
      </S.Container>
    </>
  );
};

export default EditBeneficiary;
