import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import InputField from "./InputField";

describe("Layout", () => {
  it("has input item", () => {
    const { container } = render(<InputField />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("displays the label provided in props", () => {
    render(<InputField label="Test label" />);
    const label = screen.getByText("Test label");
    expect(label).toBeInTheDocument();
  });

  it("does not displays the label when no label provided in props", () => {
    const { container } = render(<InputField />);
    const label = container.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });

  it("has text type for input when type is not provided as props", () => {
    const { container } = render(<InputField />);
    const input = container.querySelector("input");
    expect(input.type).toBe("text");
  });

  it("has password type for input password type is provided as props", () => {
    const { container } = render(<InputField type="password" />);
    const input = container.querySelector("input");
    expect(input.type).toBe("password");
  });

  it("displays placeholder when it is provided as props", () => {
    const { container } = render(<InputField placeholder="Test placeholder" />);
    const input = container.querySelector("input");
    expect(input.placeholder).toBe("Test placeholder");
  });

  it("has value for input when it is provided as props", () => {
    const { container } = render(<InputField value="Test value" />);
    const input = container.querySelector("input");
    expect(input.value).toBe("Test value");
  });

  it("has name for input when it is provided as props", () => {
    const { container } = render(<InputField name="Test name" />);
    const input = container.querySelector("input");
    expect(input.name).toBe("Test name");
  });

  it("has onChange callback when it is provided as props", () => {
    const onChange = jest.fn();
    const { container } = render(<InputField onChange={onChange} />);
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "new-input" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("has default style when there is no validation error or success", () => {
    const { container } = render(<InputField />);
    const input = container.querySelector("input");
    expect(input.className).toBe("form-control");
  });

  it("has success style when hasError property is false", () => {
    const { container } = render(<InputField hasError={false} />);
    const input = container.querySelector("input");
    expect(input.className).toBe("form-control is-valid");
  });

  it("has style for error case when there is error", () => {
    const { container } = render(<InputField hasError={true} />);
    const input = container.querySelector("input");
    expect(input.className).toBe("form-control is-invalid");
  });

  it("displays the error text when it is provided", () => {
    const { container } = render(
      <InputField hasError={true} errorMessage="Cannot be null" />
    );
    const spanErrorMessage = container.querySelector(".invalid-feedback");
    expect(spanErrorMessage).toBeInTheDocument();
  });

  it("does not display the error text when hasError not provided", () => {
    const { container } = render(<InputField errorMessage="Cannot be null" />);
    const spanErrorMessage = container.querySelector(".invalid-feedback");
    expect(spanErrorMessage).not.toBeInTheDocument();
  });
});
