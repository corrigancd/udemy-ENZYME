import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import App from "./App";
import { getSecretWord as mockGetSecretWord } from "./actions";

// activate global mock to make sure getSecretWord doesn't make network call
// notice that we pass the path that contains a __mocks__ folder
jest.mock("./actions");

/**
 * Setup function for App component
 * @returns {Wrapper}
 */
const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent).toHaveLength(1);
});

describe("get secret word", () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear();
  });
  test("getSecretWord runs on app mount", () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() doesn't trigger useEffect
    // https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
