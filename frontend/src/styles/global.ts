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

  .ReactModal__Overlay {
      z-index: 99;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(255,255,255,0.75);
  }

  .ReactModal__Content {
      position: absolute;
      left: 2.5rem;
      right: 2.5rem;
      top: 2.5rem;
      bottom: 2.5rem;
      background-color: #fff;
      box-shadow: 0 0 10px 0 rgba(0,0,97,0.5);
      overflow: auto;
      border-radius: 4px;
      outline: none;
  }
`;
