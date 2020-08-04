import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 10px 0;
  background: #ff7700;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 120px;

    ${media.lessThan('huge')`
      width: 110px;
    `}

    ${media.lessThan('large')`
      width: 90px;
    `}

    ${media.lessThan('medium')`
      width: 70px;
    `}

    ${media.lessThan('small')`
      width: 60px;
    `}
  }
`;
