import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    width: 100vw;
    font-family: 'Montserrat', sans-serif;
    background: ${(props) => (props.theme === "light" ? "white" : "#121212")};
    overflow-x: hidden;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

button {
    background: none;
    border: none;
    outline: none;
    font-family: 'Montserrat', sans-serif;
}

input {
    outline: none;
    border: none; 
    background: none;
}

svg {
    pointer-events:none;
    transition: ${(props) => (props.animationState ? "all 0.5s ease" : "")};
}

`;

export default GlobalStyles;
