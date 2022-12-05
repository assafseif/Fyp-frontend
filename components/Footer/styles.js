import styled from "styled-components";

export const SectionContainer = styled.section`
  background-color: #b4813f;
  text-align: Center;
  h1 {
    color: white;
    font-size: 40px;
    font-family: Cursive;
  }
  span {
    letter-spacing: 1px;
    color: white;
    white-space: pre-line;
  }
  input {
    height: 50px;
    background-color: #b4813f;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-color: white;
    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 4px;
    box-sizing: border-box;
    font-color: Red;
  }
  input,
  select,
  input:focus,
  input::placeholder {
    color: white;
    font-size: 16px;
    letter-spacing: 1px;
  }

  i {
    position: Absolute;
    justify-content: center;
    color: white;
    padding-top: 20px;
  }
  div {
    color: white;
  }
`;
