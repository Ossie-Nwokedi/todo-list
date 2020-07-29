import React, { FunctionComponent, ReactElement } from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../../state/Reducer";

/**
 * Utility to wrap component under test to react-redux Provider 
 */
const renderConnected = (component: ReactElement, { store = createStore(reducer), ...renderOptions } = {}) => {
  const Wrapper: FunctionComponent = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(component, { wrapper: Wrapper, ...renderOptions });
};

export default renderConnected;
