import styled from 'styled-components';
import media from 'styled-media-query';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

export const Content = styled.div``;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 700px;
  height: 340px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;
  color: #000;

  h2 {
    text-align: center;
    font-weight: bold;
    padding-bottom: 20px;
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

export const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #000;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  font-weight: bold;
  width: 140px;
  height: 50px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;

  transition: 0.3s ease all;

  &:hover {
    background: #ffa500;
    color: #f5f5f5;
  }

  @media (max-width: 680px) {
    width: 120px;
  }

  @media (max-width: 575px) {
    width: 110px;
  }

  @media (max-width: 525px) {
    width: 100px;
  }

  ${media.lessThan('small')`
    width: 80px;
    height: 40px;
    font-size: 0.8rem;
  `}
`;

export const Button = styled.button`
  color: #000;
  font-size: 1rem;
  text-decoration: none;
  border: none;
  font-weight: bold;
  width: 140px;
  height: 50px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;

  transition: 0.3s ease all;

  &:hover {
    background: #ffa500;
    color: #f5f5f5;
  }

  @media (max-width: 680px) {
    width: 120px;
  }

  @media (max-width: 575px) {
    width: 110px;
  }

  @media (max-width: 525px) {
    width: 100px;
  }

  ${media.lessThan('small')`
    width: 80px;
    height: 40px;
    font-size: 0.8rem;
  `}
`;
