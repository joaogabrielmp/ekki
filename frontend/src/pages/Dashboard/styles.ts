import styled from 'styled-components';
import media from 'styled-media-query';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;

  ${media.lessThan('large')`
    grid-template-columns: 100%;
  `}
`;

export const ResumeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-top: 20px;
  padding-left: 320px;

  @media (max-width: 1600px) {
    padding-left: 280px;
  }

  @media (max-width: 1550px) {
    padding-left: 240px;
  }

  @media (max-width: 1500px) {
    padding-left: 200px;
  }

  ${media.lessThan('huge')`
    padding-top: 10px;
    padding-left: 100px;
  `}

  ${media.lessThan('large')`
    padding-left: 0;
  `}
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.6rem;

  ${media.lessThan('small')`
  font-size: 1.4rem;
  `}
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  ${media.lessThan('large')`
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
  `}
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

  ${media.lessThan('large')`
    width: 350px;
  `}

  ${media.lessThan('medium')`
    width: 220px;
  `}

  ${media.lessThan('small')`
    width: 160px;
  `}

  h4 {
    color: #000;
    font-size: 1.4rem;

    ${media.lessThan('huge')`
      font-size: 1.2rem;
    `}

    ${media.lessThan('small')`
      font-size: 1.1rem;
    `}
  }

  p {
    color: #000;
    font-size: 1.4rem;
    text-align: center;
    line-height: 30px;

    ${media.lessThan('small')`
      font-size: 1.1rem;
    `}
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
  text-align: center;

  transition: 0.3s ease all;

  &:hover {
    background: #ffa500;
    color: #f5f5f5;
  }

  ${media.lessThan('large')`
    width: 350px;
  `}

  ${media.lessThan('medium')`
    font-size: 1.2rem;
    width: 220px;
  `}

  ${media.lessThan('small')`
    width: 160px;
    font-size: 1.1rem;
  `}
`;

export const TransferContent = styled.div`
  padding-top: 20px;

  ${media.lessThan('huge')`
    padding-right: 20px;
  `}

  ${media.lessThan('large')`
    padding-bottom: 30px;
    padding-right: 0px;
  `}
`;

export const TransferCardContent = styled.div`
  display: flex;
  justify-content: center;

  text-align: center;
`;

export const TransferCard = styled.div`
  width: 900px;
  height: 720px;
  margin: 5px;
  border-radius: 10px;
  background: #f5f5f5;

  ${media.lessThan('medium')`
    width: 700px;
  `}

  ${media.lessThan('small')`
    width: 350px;
  `}

  @media only screen and (max-width: 376px) {
    width: 320px;
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
