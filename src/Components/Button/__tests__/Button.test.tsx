import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("handleClick function", () => {
  it("is called when the button is clicked", () => {
    const mockHandleClick = jest.fn();

    render(
      <Button
        buttonType="button"
        value="Click me"
        handleClick={mockHandleClick}
        type="primary"
      />
    );
    const buttonElement = screen.getByText("Click me");

    fireEvent.click(buttonElement);

    expect(mockHandleClick).toHaveBeenCalled();
  });

  it("is called with the correct arguments", () => {
    const mockHandleClick = jest.fn();

    render(
      <Button
        buttonType="button"
        value="Click me"
        handleClick={mockHandleClick}
        type="primary"
      />
    );
    const buttonElement = screen.getByText("Click me");

    fireEvent.click(buttonElement);

    expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object));
  });

});
