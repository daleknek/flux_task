import React from "react";
import Board from "./Board";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { LocalContextProvider } from "./LocalContext";
import { render, screen } from "@testing-library/react";

describe("Board", () => {
  it("renders the board component", () => {
    render(
      <BrowserRouter>
        <LocalContextProvider>
          <Board />
        </LocalContextProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Add column")).toBeInTheDocument();
  });
});
