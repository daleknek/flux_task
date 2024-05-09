import { render, screen, fireEvent } from "@testing-library/react";
import TaskModal from "./TaskModal";
import "@testing-library/jest-dom";

describe("TaskModal", () => {
  it("renders the modal with correct props", () => {
    const props = {
      openModal: true,
      taskTitle: "Test Task",
      taskDescription: "Test description",
      taskDate: "2023-11-30",
    };

    render(<TaskModal {...props} />);

    expect(screen.getByLabelText("Task Title")).toBeInTheDocument();
    expect(screen.getByText("Due Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("calls createTask when the 'Create Task' button is clicked", () => {
    const props = {
      openModal: true,
      createTask: jest.fn(),
    };

    render(<TaskModal {...props} />);

    const createTaskButton = screen.getByText("Create Task");
    fireEvent.click(createTaskButton);

    expect(props.createTask).toHaveBeenCalled();
  });

  it("calls updateTask when the 'Update Task' button is clicked", () => {
    const props = {
      openModal: true,
      updateTask: jest.fn(),
      taskId: "1",
      taskTitle: "Test Task",
      taskDescription: "Test description",
      taskDate: "2023-11-30",
    };

    render(<TaskModal {...props} />);

    const updateTaskButton = screen.getByText("Update Task");
    fireEvent.click(updateTaskButton);

    expect(props.updateTask).toHaveBeenCalledWith(
      props.taskId,
      props.taskTitle,
      props.taskDescription,
      props.taskDate
    );
  });
});
