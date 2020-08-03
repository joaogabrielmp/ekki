import React, { useState } from 'react';

import createPagination from './createPagination.js';

import * as S from './styles';

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfArticles = 100;
  const articlesPerPage = 10;
  const numberOfButtons = 8;

  const { pagination } = createPagination({
    numberOfArticles,
    articlesPerPage,
    numberOfButtons,
    currentPage,
  });

  const handleClick = (page: number): void => setCurrentPage(page);

  return (
    <S.Pagination>
      <ul>
        <S.PaginationItem
          className={`${pagination[0] === currentPage && 'disabled'}`}
          onClick={() => {
            handleClick(currentPage - 1);
          }}
        >
          Anterior
        </S.PaginationItem>
        {pagination.map(page => (
          <S.PaginationItem
            className={`${currentPage === page && 'active'}`}
            onClick={() => {
              handleClick(page);
            }}
          >
            {page}
          </S.PaginationItem>
        ))}
        <S.PaginationItem
          className={`${pagination.reverse()[0] === currentPage && 'disabled'}`}
          onClick={() => {
            handleClick(currentPage + 1);
          }}
        >
          Próximo
        </S.PaginationItem>
      </ul>
    </S.Pagination>
  );
};

export default Pagination;
