import styled from "styled-components";

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  width: 20px;
  height: 25px;
  padding: 0;
  border-radius: 5px;
  outline: none;
  color: #aaaaaa;
  :before {
    content: '🗑';
  }

  :hover, :focus {
    transition: 600ms;
    color:black;
  }
`;

export default DeleteButton;
