import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 10px 0;
  background: #ff7700;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  ${media.lessThan('huge')`
    padding: 0 110px 0;
  `}

  > img {
    width: 120px;
  }
`;
