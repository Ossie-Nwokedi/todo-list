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
  color: #333333;
  :before {
    content: '🗑';
  }

  :hover, :focus {
    background: #eeeeee;
    transition: 600ms;
    color:black;
  }
`;

export default DeleteButton;
