import React from "react";
import { errorStrings } from "../../data/errorStrings.js";
import App from "../App";
import {
  render,
  fireEvent,
  waitForElement,
  getByTestId
} from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
test("should return error when called with empty fields", async () => {
  const { getByText, getByTestId } = render(<App />);
  const input = getByTestId("apiKey");
  input.value = "xddd";
  Simulate.change(input);
  fireEvent.click(getByText("Get results"));
  const messageBox = await waitForElement(() => getByTestId("messageBox"));
  expect(messageBox.textContent).toBe(errorStrings.getResultsError);
});
