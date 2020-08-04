import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
`;

export const TextContent = styled.div`
  text-align: center;
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
  height: 680px;
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
    height: 580px;
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
