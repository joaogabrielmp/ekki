import styled from 'styled-components';
import media from 'styled-media-query';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 20px;
`;

export const Content = styled.div``;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled(Link)`
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

export const BeneficiaryContent = styled.div`
  display: flex;
  justify-content: center;

  text-align: center;
`;

export const BeneficiaryCard = styled.div`
  width: 900px;
  height: 720px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;

  ${media.lessThan('large')`
    width: 760px;
    margin-bottom: 25px;
  `}

  ${media.lessThan('medium')`
    width: 660px;
  `}

  @media (max-width: 680px) {
    width: 560px;
  }

  @media (max-width: 575px) {
    width: 500px;
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

export const Table = styled.table`
  width: 100%;

  table-layout: fixed;
  color: #000;
  border: none;
  border-collapse: collapse;

  thead {
    width: 100%;
    border-bottom: 2px solid;
    font-size: 0.9rem;
  }

  tbody {
    height: 620px;
    width: 100%;
    font-size: 0.9rem;

    tr:hover {
      background-color: #ffa500;
    }
  }

  tr > th {
    width: 100%;
    height: 70px;
  }

  tr > td {
    width: 100%;
    height: 60px;
    cursor: pointer;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const Pagination = styled.div`
  display: flex;

  justify-content: center;
  padding-top: 4px;

  ul {
    display: flex;

    list-style: none;
    padding: 0px;
  }
`;

export const PaginationItem = styled.button`
  border: none;
  background: #ffa500;
  padding: 10px 14px;
  margin-right: 4px;
  border-radius: 4px;
  font-family: sans-serif;
  color: #000;
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
  user-select: none;

  &:last-child {
    margin-right: 0px;
  }

  &:not(.active):not(.disabled) {
    cursor: pointer;
  }

  &:not(.active):not(.disabled):hover {
    background: #ff4500;
  }

  &:not(.active):not(.disabled):active {
    background: #ff7f50;
  }

  &.active {
    background: #ff7700;
  }

  &.disabled {
    background: #dcdcdc;
    pointer-events: none;
  }
`;

export const ModalContent = styled.div``;

export const ModalTitle = styled.h2`
  text-align: center;

  padding-bottom: 20px;
`;

export const ModalButtonContent = styled.div``;

export const ModalButton = styled.button`
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
