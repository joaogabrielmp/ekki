import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0
  }

  body {
    background: #312E38;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  tbody::-webkit-scrollbar{
    width: .7em;
  }

  tbody::-webkit-scrollbar-track {
    background-color: #ffa500;
  }

  tbody::-webkit-scrollbar-thumb {
    background-color: #ff7700;
  }

  /* .swal-modal {
    background-color: #312E38;
    border-radius: 10px;
  }

  .swal-title {
    color: #f5f5f5;
  }

  .swal-text {
    color: #f5f5f5;
  }


  .swal-icon::before, .swal-icon::after, .swal-icon--success__hide-corners {
    background-color: #312E38;
  } */

`;
