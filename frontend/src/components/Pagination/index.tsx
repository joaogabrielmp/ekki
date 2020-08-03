import React, { useCallback } from 'react';

import * as S from './styles';

interface PaginationProps {
  total: number;
  pages: number[];
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pages,
  total,
}) => {
  const handleCurrentPage = useCallback(() => {
    // setCurrentPage(10);
  }, []);

  return (
    <S.Container>
      <S.Pagination>
        <div>Quantidade {total}</div>
        <S.PaginationButton>
          {currentPage > 1 && (
            <S.PaginationItem onClick={() => handleCurrentPage}>
              Anterior
            </S.PaginationItem>
          )}
          {pages.map(page => (
            <S.PaginationItem
              isSelect={page === currentPage}
              key={page}
              onClick={() => handleCurrentPage}
            >
              {page}
            </S.PaginationItem>
          ))}
          {currentPage < pages.length && (
            <S.PaginationItem onClick={() => handleCurrentPage}>
              Próxima
            </S.PaginationItem>
          )}
        </S.PaginationButton>
      </S.Pagination>
    </S.Container>
  );
};

export default Pagination;
