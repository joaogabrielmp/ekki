import styled from 'styled-components';
// import media from 'styled-media-query';

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
