import styled from "styled-components";

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  width: 20x;
  height: 20px;
  padding: 0;
  outline: none;
  :before {
    content: '🗑';
  }

  :hover {
    background-color: #eef1f0;
  }
`;

export default DeleteButton;
