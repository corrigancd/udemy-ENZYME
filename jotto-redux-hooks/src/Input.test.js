import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps, storeFactory } from "../test/testUtils";
import { Provider } from "react-redux";
import { Input } from "./Input";

// how to mock destructured react hooks
// const mockSetCurrentGuess = jest.fn();
// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));

describe("Testing Input.js", () => {
  const setup = ({ success = false, secretWord = "party" }) => {
    const store = storeFactory({ success, secretWord });
    return mount(
      <Provider store={store}>
        <Input success={success} secretWord={secretWord} />
      </Provider>
    );
  };

  describe("render", () => {
    describe("Success is true", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({ success: true });
      });

      test("component should render without error", () => {
        const wrapper = setup({});
        const inputComponent = findByTestAttr(wrapper, "input-component");
        expect(inputComponent.length).toBe(1);
      });

      test("input box does not show", () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox.exists()).toBe(false);
      });

      test("submit button does not show", () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        expect(submitButton.exists()).toBe(false);
      });
    });

    describe("Success is false", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = setup({ success: false });
      });

      test("component should render without error", () => {
        const wrapper = setup({});
        const inputComponent = findByTestAttr(wrapper, "input-component");
        expect(inputComponent.length).toBe(1);
      });

      test("input box does not show", () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox.exists()).toBe(true);
      });

      test("submit button does not show", () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        expect(submitButton.exists()).toBe(true);
      });
    });
  });

  test("does not throw a warning with expected props", () => {
    checkProps(Input, { secretWord: "party" });
  });

  describe("state controlled input field", () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
    let originalUseState;

    beforeEach(() => {
      mockSetCurrentGuess.mockClear();
      originalUseState = React.useState;
      // jest.mock("react", () => ({
      //   ...jest.requireActual("react"),
      //   useState: jest.fn((initialState) => [
      //     initialState,
      //     mockSetCurrentGuess,
      //   ]),
      // }));
      React.useState = jest.fn((initialState) => [
        initialState,
        mockSetCurrentGuess,
      ]);
      wrapper = setup({});
    });

    afterEach(() => {
      React.useState = originalUseState;
    });

    test("state updates with value of input box upon change", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");

      const mockEvent = { target: { value: "train" } };
      inputBox.simulate("change", mockEvent);
      expect(mockSetCurrentGuess).toHaveBeenCalledWith(mockEvent.target.value);
    });

    test("state update gets called with empty string", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");

      const testString = "";
      const mockEvent = { target: { value: testString } };
      inputBox.simulate("change", mockEvent);

      expect(mockSetCurrentGuess).toHaveBeenCalledWith(testString);
    });

    test("state update gets called when submit button is clicked", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");

      const emptyStringAfterClickingSubmit = "";
      const mockEvent = {
        target: { value: emptyStringAfterClickingSubmit },
        preventDefault: () => {},
      };
      submitButton.simulate("click", mockEvent);

      expect(mockSetCurrentGuess).toHaveBeenCalledWith(
        emptyStringAfterClickingSubmit
      );
    });
  });
});
