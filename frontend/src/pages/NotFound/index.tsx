import React from 'react';

const NotFound: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    }}
  >
    <h1 style={{ textAlign: 'center' }}>Página não encontrada</h1>
    <br />
    <button type="button">
      <a href="/" style={{ color: '#000', textDecoration: 'none' }}>
        Voltar para home
      </a>
    </button>
  </div>
);

export default NotFound;
