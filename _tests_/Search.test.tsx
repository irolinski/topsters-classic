import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Search from "../src/Components/Search";
import React from "react";
import "@testing-library/jest-dom";
// import { lastFmAlbum } from "../models/models";

describe("Search Component", () => {
  const mockDrawAlbumToCanvas = vi.fn();
  const mockHandleOpenAccordion = vi.fn();

  beforeEach(() => {
    // Clear mocks before each test to ensure independence between tests
    mockDrawAlbumToCanvas.mockClear();
    mockHandleOpenAccordion.mockClear();
  });

  test("renders Search component correctly", () => {
    render(
      <Search
        selectedIndex={0}
        drawAlbumToCanvas={mockDrawAlbumToCanvas}
        openAccordion={""}
        handleOpenAccordion={mockHandleOpenAccordion}
        openModal={""}
      />,
    );

    // Check for the presence of input and button elements
    const inputElement = screen.getByRole("textbox", {
      name: /search for albums/i,
    });
    const buttonElement = screen.getByRole("button", { name: /search input/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("updates input value correctly", () => {
    render(
      <Search
        selectedIndex={0}
        drawAlbumToCanvas={mockDrawAlbumToCanvas}
        openAccordion={""}
        handleOpenAccordion={mockHandleOpenAccordion}
        openModal={""}
      />,
    );

    const inputElement = screen.getByRole("textbox", {
      name: /search for albums/i,
    });

    fireEvent.change(inputElement, { target: { value: "Pink Floyd" } });

    expect(inputElement).toHaveValue("Pink Floyd");
  });

  test("triggers search on button click", async () => {
    const mockFetchResponse = {
      results: {
        albummatches: {
          album: [
            {
              name: "Test Album",
              artist: "Test Artist",
              image: [{}, { "#text": "test-image-url" }],
            },
          ],
        },
      },
    };

    // Mock the global fetch function
    //@ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchResponse),
      }),
    );

    render(
      <Search
        selectedIndex={0}
        drawAlbumToCanvas={mockDrawAlbumToCanvas}
        openAccordion={""}
        handleOpenAccordion={mockHandleOpenAccordion}
        openModal={""}
      />,
    );

    const inputElement = screen.getByRole("textbox", {
      name: /search for albums/i,
    });
    const buttonElement = screen.getByRole("button", { name: /search input/i });

    // Change input value and click button
    fireEvent.change(inputElement, { target: { value: "Test Album" } });
    fireEvent.click(buttonElement);

    // Wait for the search results to appear in the document
    await waitFor(() => {
      expect(screen.getByText(/test album/i)).toBeInTheDocument();
    });
  });

  test("displays API-generated error message on API failure", async () => {
    // Mock fetch to simulate an error response
    global.fetch = vi.fn(() => Promise.reject(new Error("Failed to fetch")));

    render(
      <Search
        selectedIndex={0}
        drawAlbumToCanvas={mockDrawAlbumToCanvas}
        openAccordion={""}
        handleOpenAccordion={mockHandleOpenAccordion}
        openModal={""}
      />,
    );

    const inputElement = screen.getByRole("textbox", {
      name: /search for albums/i,
    });
    const buttonElement = screen.getByRole("button", { name: /search input/i });

    fireEvent.change(inputElement, {
      target: { value: "Nonexistent Album 15000" },
    });
    fireEvent.click(buttonElement);

    // Wait for the error message to appear in the document
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('displays "No results. Try again!" when no search results are found', async () => {
    // Mock fetch to simulate a response with no search results
    //@ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: {
              albummatches: {
                album: [], // No albums found
              },
            },
          }),
      }),
    );

    render(
      <Search
        selectedIndex={0}
        drawAlbumToCanvas={mockDrawAlbumToCanvas}
        openAccordion={""}
        handleOpenAccordion={mockHandleOpenAccordion}
        openModal={""}
      />,
    );

    const inputElement = screen.getByRole("textbox", {
      name: /search for albums/i,
    });
    const buttonElement = screen.getByRole("button", { name: /search input/i });

    // Simulate user typing in search input and clicking search button
    fireEvent.change(inputElement, { target: { value: "Unknown Album" } });
    fireEvent.click(buttonElement);

    // Wait for the "No results. Try again!" message to appear
    await waitFor(() => {
      expect(screen.getByText(/no results\. try again!/i)).toBeInTheDocument();
    });

    // Check that the fetch call was made
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
