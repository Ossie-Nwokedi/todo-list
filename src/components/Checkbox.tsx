import React, { ChangeEventHandler, Ref } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  width: 15px;
  height: 15px;
  min-width: 15px;
  position: relative;

  input {
    margin: 0;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .inner-checkbox {
    border: 1px solid #babcbc;
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }

  input:checked + .inner-checkbox {
    background: transparent;
    &:after {
      color: grey;
      position: absolute;
      top: -3px;
      left: 2px;
      font-size: 16px;
      content: "✔";
    }
  }

  input:focus + .inner-checkbox {
    border-color: #969899;
    background: #eef1f0;
  }
`;

type Props = {
  checked: boolean;
  onChange: ChangeEventHandler;
  title?: string;
};

const Checkbox = React.forwardRef(({ checked, onChange, title = "" }: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <StyledCheckbox>
      <input ref={ref} type="checkbox" checked={checked} onChange={onChange} title={title} />
      <div className="inner-checkbox" />
    </StyledCheckbox>
  );
});

export default Checkbox;
