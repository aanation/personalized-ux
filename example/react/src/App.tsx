import React from 'react';
import { Post } from "./components/Post";
import { createGlobalStyle } from "styled-components";
import "./observer";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: #34495e;
    --text-color: #fff;
    --base-font-size: 16px;
  }
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: var(--background);
  }
`

function App() {
  return (
    <div>
      <GlobalStyles />
      <Post />
    </div>
  );
}

export default App;
