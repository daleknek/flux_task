import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { LocalContextProvider } from "./LocalContext";

describe("Header", () => {
  it("switches to edit mode when clicking on the board name input", () => {
    const props = {
      boardName: "Test Board",
      isEditingBoardName: false,
      editBoardName: jest.fn(),
    };

    render(
      <BrowserRouter>
        <LocalContextProvider>
          <Header {...props} />
        </LocalContextProvider>
      </BrowserRouter>
    );

    const boardNameText = screen.getByText("Test Board");
    fireEvent.click(boardNameText);
    expect(props.editBoardName).toHaveBeenCalledTimes(1);
  });

  it("tests interaction with board name input for text entry and submission", async () => {
    const props = {
      boardName: "Test Board",
      isEditingBoardName: true,
      handleBoardNameChange: jest.fn(),
      handleKeyDownBoardName: jest.fn(),
    };

    render(
      <BrowserRouter>
        <LocalContextProvider>
          <Header {...props} />
        </LocalContextProvider>
      </BrowserRouter>
    );

    const boardNameInput = screen.getByPlaceholderText("Enter board name");
    userEvent.type(boardNameInput, "Test Board");
    expect(boardNameInput.value).toBe("Test Board");
    userEvent.keyboard("{enter}");
    await waitFor(() => {
      expect(props.handleKeyDownBoardName).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(props.handleBoardNameChange).toHaveBeenCalled();
    });
  });
});
