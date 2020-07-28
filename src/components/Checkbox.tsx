import React, { ChangeEventHandler, Ref } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  width: 15px;
  height: 15px;
  top: 0;
  border: 1px solid #babcbc;
  border-radius: 4px;
  overflow:hidden;
  box-sizing:border-box;

  position: relative;
  input {
    margin: 0;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    z-index: 1;
  }

  input:checked + .inner-checkbox {
    &:after {
      color: grey;
      position: absolute;
      top: -5px;
      left: 0px;
      font-size: 16px;
      content: "✔";
    }
  }
`;

type Props = {
  checked: boolean;
  onChange: ChangeEventHandler;
};

const Checkbox = React.forwardRef(
  ({ checked, onChange }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <StyledCheckbox>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label className="inner-checkbox" />
      </StyledCheckbox>
    );
  }
);

export default Checkbox;
