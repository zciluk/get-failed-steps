import React from "react";
import { errorStrings } from "../../data/errorStrings.js";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "../App";

test("should return error when called with empty API key", async () => {
  const component = render(<App />);
  fireEvent.change(component.getByPlaceholderText("API key"), {
    target: { value: "" }
  });
  fireEvent.click(component.getByText("Get results"));
  const messageBox = await waitForElement(() =>
    component.getByTestId("messageBox")
  );
  expect(messageBox.textContent).toBe(errorStrings.getResultsError);
});

test("should return error when called with empty projet ID", async () => {
  const component = render(<App />);
  fireEvent.change(component.getByPlaceholderText("Project ID"), {
    target: { value: "1" }
  });
  fireEvent.click(component.getByText("Get results"));
  const messageBox = await waitForElement(() =>
    component.getByTestId("messageBox")
  );
  expect(messageBox.textContent).toBe(errorStrings.getResultsError);
});

// add test with filled records
