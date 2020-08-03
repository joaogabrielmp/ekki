import React from 'react';

const NotFound: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <h1 style={{ textAlign: 'center' }}>Not Found</h1>
    <button type="button">
      <a href="/" style={{ color: '#000', textDecoration: 'none' }}>
        Voltar para home
      </a>
    </button>
  </div>
);

export default NotFound;
