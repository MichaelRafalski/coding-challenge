import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header Component", () => {
  it("renders without any props", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders with left content", () => {
    const leftContent = <div data-testid="left-content">Left Content</div>;
    render(<Header left={leftContent} />);

    expect(screen.getByTestId("left-content")).toBeInTheDocument();
    expect(screen.getByText("Left Content")).toBeInTheDocument();
  });
});
