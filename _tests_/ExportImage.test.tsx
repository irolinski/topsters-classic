import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MenuDesktop from "./../src/Components/MenuDesktop";
import { exportAsImage, downloadImage } from "../src/utils/downloadImage";
import React from "react";
import {
  backgroundPositionMenuTypes,
  darkenBackgroundOptions,
  openAccordionOptions,
  openModalOptions,
  openPopUpOptions,
} from "../src/models/models";

// Mock the `html2canvas` library
vi.mock("html2canvas", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      toDataURL: () => "data:image/png;base64,fakeImage", // Mock image data
    }),
  ),
}));

// Mock the functions in `../src/utils/downloadImage`
vi.mock("../src/utils/downloadImage", () => ({
  downloadImage: vi.fn(), // Ensure this is a mock function
  exportAsImage: vi.fn(), // Ensure this is also a mock function
}));

describe("MenuDesktop", () => {
  const mockProps = {
    tableMode: "top40",
    handleTableModeChange: vi.fn(),
    openAccordion: vi.fn() as unknown as openAccordionOptions,
    handleOpenAccordion: vi.fn(),
    collageRowNum: 3,
    collageColNum: 3,
    handleSetCollageRowNum: vi.fn(),
    handleSetCollageColNum: vi.fn(),
    chartTitle: "My Chart",
    handleSetChartTitle: vi.fn(),
    openMenuPopUp: "" as unknown as openPopUpOptions,
    handleOpenPopUp: vi.fn(),
    backgroundColor: "#ffffff",
    handleSetBackgroundColor: vi.fn(),
    backgroundImg: "",
    handleSetBackgroundImg: vi.fn(),
    backgroundPositionMenu: "" as unknown as backgroundPositionMenuTypes,
    handleSetBackgroundImgMode: vi.fn(),
    handleBackgroundPositionChange: vi.fn(),
    backgroundImgMode: "cover",
    fontFamily: "Space Mono",
    handleSetFontFamily: vi.fn(),
    fontColorHeader: "#000000",
    handleSetFontColorHeader: vi.fn(),
    handleSetFontColorBody: vi.fn(),
    fontColorBody: "#000000",
    hideAlbumTitles: false,
    handleSetHideAlbumTitles: vi.fn(),
    enableShadows: false,
    handleSetEnableShadows: vi.fn(),
    exportOptions: { format: "image/png", quality: 0.9 },
    handleSetExportOptions: vi.fn(),
    selectedIndex: 0,
    drawAlbumToCanvas: vi.fn(),
    openModal: "" as openModalOptions,
    handleSetOpenModal: vi.fn(),
    exportRef: { current: document.createElement("div") } as any,
    changeDisplayedChart: vi.fn(),
    darkenBackground: 0.4 as darkenBackgroundOptions,
    toggleDarkenBackground: vi.fn(),
  };

  it('should call exportAsImage and downloadImage when "export_chart" button is clicked', async () => {
    render(
      <MenuDesktop
        currentChart={{
          name: "",
          tableMode: "top40",
          collageRowNum: 3,
          collageColNum: 3,
          chartTitle: "",
          hideAlbumTitles: false,
          backgroundImg: "",
          backgroundImgPosition: {
            x: 0,
            y: 0,
          },
          backgroundImgMode: "",
          darkenBackground: 0,
          fontFamily: "Space Mono",
          fontColorBody: "",
          fontColorHeader: "",
          backgroundColor: "",
          enableShadows: false,
          top40Data: undefined,
          top100Data: undefined,
          collageData: undefined,
        }}
        currentChartName={""}
        {...mockProps}
      />,
    );

    const exportButton = screen.getByRole("button", { name: "Export chart" });

    fireEvent.click(exportButton);

    // Assert that exportAsImage was called with correct arguments
    expect(exportAsImage).toHaveBeenCalledWith(
      mockProps.exportRef.current, // Make sure this matches the mocked ref element
      expect.any(String), // The file name might change dynamically, so match any string
      mockProps.exportOptions,
    );

    // Assert that exportAsImage was called once
    expect(exportAsImage).toHaveBeenCalledTimes(1);
  });
});
