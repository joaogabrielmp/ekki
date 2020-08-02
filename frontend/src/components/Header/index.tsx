import React from 'react';

import logoImg from '../../assets/logo.svg';

import * as S from './styles';

const Header: React.FC = () => {
  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <img src={logoImg} alt="Ekki" />
        </S.HeaderContent>
      </S.Header>
    </S.Container>
  );
};

export default Header;
