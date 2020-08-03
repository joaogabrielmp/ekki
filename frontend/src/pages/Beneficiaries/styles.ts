import styled from 'styled-components';
import media from 'styled-media-query';
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
    display: inline-block;

    width: 100%;
    border-bottom: 2px solid;
  }

  tbody {
    display: inline-block;

    height: 580px;
    width: 100%;
    overflow: auto;
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
