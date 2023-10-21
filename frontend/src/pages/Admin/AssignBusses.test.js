import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AssignBusses from "./AssignBusses";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// 01 Testing Component Rendering
test("renders AssignBusses component and checks form fields", () => {
  render(<AssignBusses />);

  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/driver/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/bus number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of seats/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/start location/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/arrival location/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/arrival time/i)).toBeInTheDocument();
});

// 02. Testing Form Interaction
test("fills out the form", () => {
  render(<AssignBusses />);

  userEvent.type(screen.getByLabelText(/date/i), "2023-10-16");
  userEvent.type(screen.getByLabelText(/driver/i), "John Doe");
  userEvent.type(screen.getByLabelText(/bus number/i), "ND5445");
  userEvent.type(screen.getByLabelText(/number of seats/i), "54");
  userEvent.type(screen.getByLabelText(/start location/i), "Kaduwela");
  userEvent.type(screen.getByLabelText(/arrival location/i), "Malabe");
  userEvent.type(screen.getByLabelText(/start time/i), "10:00 am");
  userEvent.type(screen.getByLabelText(/arrival time/i), "10:30 am");

  expect(screen.getByLabelText(/date/i)).toHaveValue("2023-10-16");
  expect(screen.getByLabelText(/driver/i)).toHaveValue("John Doe");
  expect(screen.getByLabelText(/bus number/i)).toHaveValue("ND5445");
  expect(screen.getByLabelText(/number of seats/i)).toHaveValue("54");
  expect(screen.getByLabelText(/start location/i)).toHaveValue("Kaduwela");
  expect(screen.getByLabelText(/arrival location/i)).toHaveValue("Malabe");
  expect(screen.getByLabelText(/start time/i)).toHaveValue("10:00 am");
  expect( screen.getByLabelText( /arrival time/i ) ).toHaveValue( "10:30 am" );
  
} );

// 03. Testing Form Submission
global.fetch = jest.fn((url, options) => {
  if (url === "http://localhost:5000/buses/add-bus") {
    return Promise.resolve({
      ok: true, 
      json: () => Promise.resolve({ message: "Bus added successfully" }),
    });
  }
});

beforeEach(() => {
  fetch.mockClear();
});

test("Submits the form successfully", async () => {
  render(<AssignBusses />);

  userEvent.type(screen.getByLabelText(/date/i), "2023-10-16");
  userEvent.type(screen.getByLabelText(/driver/i), "John Doe");
  userEvent.type(screen.getByLabelText(/bus number/i), "ND5445");
  userEvent.type(screen.getByLabelText(/number of seats/i), "54");
  userEvent.type(screen.getByLabelText(/start location/i), "Kaduwela");
  userEvent.type(screen.getByLabelText(/arrival location/i), "Malabe");
  userEvent.type(screen.getByLabelText(/start time/i), "10:00 am");
  userEvent.type(screen.getByLabelText(/arrival time/i), "10:30 am");

  expect(screen.getByLabelText(/date/i)).toHaveValue("2023-10-16");
  expect(screen.getByLabelText(/driver/i)).toHaveValue("John Doe");
  expect(screen.getByLabelText(/bus number/i)).toHaveValue("ND5445");
  expect(screen.getByLabelText(/number of seats/i)).toHaveValue("54");
  expect(screen.getByLabelText(/start location/i)).toHaveValue("Kaduwela");
  expect(screen.getByLabelText(/arrival location/i)).toHaveValue("Malabe");
  expect(screen.getByLabelText(/start time/i)).toHaveValue("10:00 am");
  expect(screen.getByLabelText(/arrival time/i)).toHaveValue("10:30 am");

  fireEvent.click(screen.getByText("Assign"));

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    "http://localhost:5000/buses/add-bus",
    expect.anything()
  );
});
