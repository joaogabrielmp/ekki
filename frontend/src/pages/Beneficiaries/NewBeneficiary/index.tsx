import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import swal from 'sweetalert';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import Header from '../../../components/Header';
import getValidationErrors from '../../../helpers/getValidationErrors';
import { cpfMask, cellphoneMask, onlyNumber } from '../../../helpers/mask';
import { useUser } from '../../../hooks/user';
import api from '../../../services/api';

import * as S from './styles';

interface BeneficiaryFormData {
  name: string;
  cpf: string;
  cellphone: string;
}

const NewBeneficiary: React.FC = () => {
  const { user } = useUser();
  const [cpfState, setCPFState] = useState('');
  const [cellphoneState, setCellPhoneState] = useState('');
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

        const { name, cpf, cellphone } = data;

        const formData = {
          name,
          cpf: onlyNumber(cpf),
          cellphone: onlyNumber(cellphone),
          user_id: user.id,
        };

        await schema.validate(formData, {
          abortEarly: false,
        });

        // await api.post('/users', data);

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
            'Erro',
            'Ocorreu uma falha ao cadastrar o favorecido. Entre em contato com o suporte.',
            'error',
          );
        }
      }
    },
    [history, user.id],
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
          <h2>Novo favorecido</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <br />
            <button type="submit">Cadastrar favorecido</button>
            <button type="button">Voltar</button>
            <br /> <br />
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
        </S.Content>
      </S.Container>
    </>
  );
};

export default NewBeneficiary;
