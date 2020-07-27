import React, { ChangeEventHandler, Ref } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  input {
    opacity: 0;
    cursor: pointer;
  }

  input:checked + .inner-checkbox {
    background-color: #b8b9ba;
    &:after {
      color: white;
      position: absolute;
      top: -4px;
      left: 1px;
      content: "✔";
      transition: all 0.2s;
    }
  }

  position: relative;
  .inner-checkbox {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 3px;
    left: 1px;
    border: 1px solid #828484;
    border-radius: 4px;
    background-color: white;
    z-index: -1;
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
