import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 700px;
  height: 240px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;
  color: #000;

  h2 {
    text-align: center;
    font-weight: bold;
  }

  ${media.lessThan('large')`
    width: 680px;
  `}

  ${media.lessThan('medium')`
    width: 600px;
  `}

  @media (max-width: 680px) {
    width: 560px;
  }

  @media (max-width: 590px) {
    width: 500px;
    height: 260px;
  }

  @media (max-width: 525px) {
    width: 480px;
  }

  ${media.lessThan('small')`
    width: 380px;
  `}

  @media only screen and (max-width: 376px) {
    width: 350px;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 20px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #f5f5f5;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  font-weight: bold;
  width: 140px;
  height: 50px;
  margin: 5px;
  border-radius: 10px;
  background: #006400;

  transition: 0.3s ease all;

  &:nth-child(2) {
    background: #8b0000;
  }

  &:hover {
    background: #228b22;
  }

  &:nth-child(2):hover {
    background: #b80f0a;
  }
`;
