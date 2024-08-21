import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "./Home";

test("renders search input", () => {
  render(<Home />);
  const input = screen.getByPlaceholderText("Search accommodation...");
  expect(input).toBeInTheDocument();
});
