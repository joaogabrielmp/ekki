import styled from 'styled-components';
import media from 'styled-media-query';

interface PaginationItemProps {
  isSelect?: boolean;
}

export const Container = styled.div``;

export const Pagination = styled.div`
  display: flex;
  min-width: 500px;
  max-width: 900px;
  justify-content: space-between;
  margin-top: 10px;

  background: #135155;
`;

export const PaginationButton = styled.div`
  display: flex;
`;

export const PaginationItem = styled.div<PaginationItemProps>`
  margin: 0 10px;
  cursor: pointer;
  ${props =>
    props.isSelect && {
      background: '#6d6d6d',
      padding: '0 5px',
    }}
`;
