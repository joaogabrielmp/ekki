import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding-top: 20px;
  padding-left: 320px;

  h2 {
    text-align: center;
  }
`;

export const Card = styled.div`
  width: 350px;
  height: 170px;
  padding: 56px 30px;
  margin: 5px;
  border-radius: 10px;
  background: #F5F5F5;

  ${media.lessThan('huge')`
    /* width: 26%; */
  `}

  ${media.lessThan('large')`
    /* width: 50%; */
  `}

  ${media.lessThan('medium')`
    /* width: 50%; */
  `}

  ${media.lessThan('small')`
    /* width: 50%; */
  `}

  h4 {
    color: #000;
    font-size: 1.4rem;
    text-align: center;

    @media screen and (max-width: 1395px) {
      font-size: 1.2rem;
    }
  }

  p {
    color: #000;
    font-size: 1.4rem;
    text-align: center;
    line-height: 30px;
  }
`;

export const Button = styled.button`
  color: #000;
  font-size: 1.4rem;
  text-align: center;
  border: none;
  font-weight: bold;
  width: 350px;
  height: 170px;
  padding: 56px 30px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;

  transition: 0.3s ease all;

  &:hover {
    background: #ffa500;
    color: #f5f5f5;
  }
`;

export const TextContent = styled.div`
  text-align: center;
  padding-top: 20px;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
`;

export const TransferCardContent = styled.div`
  display: flex;
  justify-content: center;
`;

export const TransferCard = styled.div`
  width: 900px;
  height: 720px;
  /* padding: 60px 30px; */
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;

  h4 {
    color: #000;
    font-size: 1.4rem;
    text-align: center;

    @media screen and (max-width: 1395px) {
      font-size: 1.2rem;
    }
  }

  p {
    color: #000;
    font-size: 1.4rem;
    text-align: center;
    line-height: 30px;
  }
`;
