import styled from "styled-components";

export const DivContainer = styled.div`
  display: flex;
  justify-content: center;

  input,
  textarea {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    display: block;

    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input select,
  input:focus,
  input::placeholder,
  textarea select,
  textarea:focus,
  textarea::placeholder {
    color: #b4813f;
    font-size: 16px;
    letter-spacing: 1px;
  }
  Button {
    margin-left: 50px;
    border-color: #b4813f;
    background-color: #b4813f;
    color: white;

    cursor: pointer;
  }
  Button:hover {
    border-color: #b4813f;
    color: #b4813f;
    background-color: white;
  }
  p {
    text-align: center;
    color: Red;
  }
  //   input, select, textarea{
  //     color: #ff0000;
  // }
`;
