import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MenuDesktop from "../src/Components/MenuDesktop";
import { exportAsImage } from "../src/utils/downloadImage";
import { DesktopMenuPropTypes } from "../src/models/menuProps";
import { chartSavedData, lastFmAlbum } from "../src/models/models";

vi.mock("../src/utils/downloadImage", () => ({
  exportAsImage: vi.fn(),
  downloadImage: vi.fn(),
}));

const exportAsImageMock = vi.mocked(exportAsImage);

const currentChart: chartSavedData = {
  name: "",
  tableMode: "top40",
  collageRowNum: 4,
  collageColNum: 4,
  chartTitle: "",
  hideAlbumTitles: false,
  backgroundImg: "",
  backgroundImgPosition: { x: 0, y: 0 },
  backgroundImgMode: "cover",
  darkenBackground: 0,
  fontFamily: "Space Mono",
  fontColorBody: "",
  fontColorHeader: "",
  backgroundColor: "#ffffff",
  enableShadows: false,
  top40Data: undefined,
  top100Data: undefined,
  collageData: undefined,
};

const createProps = (
  overrides: Partial<DesktopMenuPropTypes> = {},
): DesktopMenuPropTypes => ({
  tableMode: "top40",
  handleTableModeChange: vi.fn(),
  openAccordion: "",
  handleOpenAccordion: vi.fn(),
  collageRowNum: 4,
  collageColNum: 4,
  handleSetCollageRowNum: vi.fn(),
  handleSetCollageColNum: vi.fn(),
  chartTitle: "",
  handleSetChartTitle: vi.fn(),
  openMenuPopUp: "",
  handleOpenPopUp: vi.fn(),
  backgroundColor: "#ffffff",
  handleSetBackgroundColor: vi.fn(),
  backgroundImg: "",
  handleSetBackgroundImg: vi.fn(),
  backgroundPositionMenu: {
    boxSizeXY: 190,
    dotSizeXY: 30,
    centerDot: 80,
  },
  handleBackgroundPositionChange: vi.fn(),
  backgroundImgMode: "cover",
  handleSetBackgroundImgMode: vi.fn(),
  fontFamily: "Space Mono",
  handleSetFontFamily: vi.fn(),
  fontColorHeader: "",
  handleSetFontColorHeader: vi.fn(),
  fontColorBody: "",
  handleSetFontColorBody: vi.fn(),
  hideAlbumTitles: false,
  handleSetHideAlbumTitles: vi.fn(),
  enableShadows: false,
  handleSetEnableShadows: vi.fn(),
  exportOptions: { format: "image/png", quality: 1 },
  handleSetExportOptions: vi.fn(),
  drawAlbumToCanvas: vi.fn(),
  exportRef: { current: document.createElement("div") },
  selectedIndex: 0,
  currentChart,
  currentChartName: "My Chart",
  changeDisplayedChart: vi.fn(),
  openModal: "",
  handleSetOpenModal: vi.fn(),
  darkenBackground: 0,
  toggleDarkenBackground: vi.fn(),
  ...overrides,
});

const renderMenu = (overrides: Partial<DesktopMenuPropTypes> = {}) => {
  const props = createProps(overrides);
  const view = render(<MenuDesktop {...props} />);
  return { ...view, props };
};

const makeAlbum = (name: string): lastFmAlbum => ({
  name,
  artist: "Test Artist",
  url: "https://www.last.fm/music/Test+Artist/Test+Album",
  image: [
    { "#text": "", size: "small" },
    { "#text": "https://example.com/album-64.png", size: "medium" },
    { "#text": "https://example.com/album-174.png", size: "large" },
  ],
});

describe("MenuDesktop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("exports the chart with the selected chart name and export options", async () => {
    const user = userEvent.setup();
    sessionStorage.setItem("selectedChart", "My Chart");
    const { props } = renderMenu();

    await user.click(screen.getByRole("button", { name: "Export chart" }));

    expect(exportAsImageMock).toHaveBeenCalledTimes(1);
    expect(exportAsImageMock).toHaveBeenCalledWith(
      props.exportRef.current,
      "topster_My_Chart",
      props.exportOptions,
    );
  });

  it('uses the fallback "title" filename when no chart is selected', async () => {
    const user = userEvent.setup();
    const { props } = renderMenu();

    await user.click(screen.getByRole("button", { name: "Export chart" }));

    expect(exportAsImageMock).toHaveBeenCalledWith(
      props.exportRef.current,
      "title",
      props.exportOptions,
    );
  });

  it("only offers the save action for a new, unsaved chart", () => {
    const { props, rerender } = renderMenu();

    expect(
      screen.queryByRole("button", { name: "Save chart in browser storage" }),
    ).not.toBeInTheDocument();

    sessionStorage.setItem("selectedChart", "newChart");
    rerender(<MenuDesktop {...props} />);

    expect(
      screen.getByRole("button", { name: "Save chart in browser storage" }),
    ).toBeInTheDocument();
  });

  it("opens the save modal when the save button is clicked", async () => {
    const user = userEvent.setup();
    sessionStorage.setItem("selectedChart", "newChart");
    const { props } = renderMenu();

    await user.click(
      screen.getByRole("button", { name: "Save chart in browser storage" }),
    );

    expect(props.handleSetOpenModal).toHaveBeenCalledWith("save");
  });

  it("opens the info modal from the footer", async () => {
    const user = userEvent.setup();
    const { props } = renderMenu();

    await user.click(screen.getByRole("button", { name: /open 'info' modal/i }));

    expect(props.handleSetOpenModal).toHaveBeenCalledWith("info");
  });

  it("changes the chart type only when editing a new chart", async () => {
    const user = userEvent.setup();
    sessionStorage.setItem("selectedChart", "newChart");
    const { props } = renderMenu();

    const chartTypeSelect = screen.getByRole("combobox", {
      name: /chart type/i,
    });
    expect(chartTypeSelect).toHaveValue("top40");

    await user.selectOptions(chartTypeSelect, "top100");

    expect(props.handleTableModeChange).toHaveBeenCalledWith("top100");
  });

  it("adds a searched album at the index selected in the parent", async () => {
    const user = userEvent.setup();
    const album = makeAlbum("Search Result Album");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          results: { albummatches: { album: [album] } },
        }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { props } = renderMenu({ selectedIndex: 5 });
    const input = screen.getByRole("textbox", { name: /search for albums/i });
    const searchButton = screen.getByRole("button", {
      name: /search input/i,
    });

    await user.type(input, "Search Result Album");
    await user.click(searchButton);

    const albumCard = await screen.findByLabelText(
      /Add album Search Result Album by Test Artist/,
    );
    await user.click(albumCard);

    expect(props.drawAlbumToCanvas).toHaveBeenCalledWith(5, album);
  });
});
