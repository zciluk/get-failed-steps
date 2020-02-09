import React from "react";
import renderer from "react-test-renderer";
import StepsTable from "../StepsTable";
const mockData = ["Step 1", "Step2", "Step other", "Step4", "Step 1", "Step 1"];
test("should render table with mocked data", () => {
  const component = renderer.create(<StepsTable displayedData={mockData} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
