import styled from 'styled-components';
import media from 'styled-media-query';
import { Link } from 'react-router-dom';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #000;
  font-size: 1.4rem;
  text-decoration: none;
  border: none;
  font-weight: bold;
  width: 350px;
  height: 170px;
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
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;
`;

export const Table = styled.table`
  width: 100%;

  table-layout: fixed;
  color: #000;
  border: none;
  border-collapse: collapse;

  th,
  td {
    padding: 10px 80px;
  }

  thead {
    width: 100%;
    border-bottom: 2px solid;
  }

  tbody {
    height: 620px;
    width: 100%;
  }

  tr > th {
    width: 100%;
    height: 70px;
  }

  tr > td {
    width: 100%;
    height: 60px;
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
  padding: 10px 15px;
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
