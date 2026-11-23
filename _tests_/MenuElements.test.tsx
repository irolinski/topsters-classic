import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CollageSettings from "../src/Components/MenuElements/CollageSettings";
import Options from "../src/Components/MenuElements/Options";
import SelectDisplayChart from "../src/Components/MenuElements/SelectDisplayChart";
import SelectTableMode from "../src/Components/MenuElements/SelectTableMode";
import Title from "../src/Components/MenuElements/Title";

describe("menu element components", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("opens the title accordion and edits/erases the chart title", async () => {
    const user = userEvent.setup();
    const handleSetChartTitle = vi.fn();
    const handleOpenAccordion = vi.fn();

    render(
      <Title
        openAccordion="titles"
        chartTitle="Old Title"
        handleSetChartTitle={handleSetChartTitle}
        handleOpenAccordion={handleOpenAccordion}
      />,
    );

    const titleInput = screen.getByLabelText("Set chart header title");
    expect(titleInput).toHaveValue("Old Title");

    await user.type(titleInput, "!");
    expect(handleSetChartTitle).toHaveBeenLastCalledWith("Old Title!");

    await user.click(screen.getByRole("button", { name: "Erase chart name" }));
    expect(handleSetChartTitle).toHaveBeenLastCalledWith("");

    await user.click(
      screen.getByRole("button", {
        name: "Open chart title settings accordion",
      }),
    );
    expect(handleOpenAccordion).toHaveBeenCalledWith("titles");
  });

  it("toggles the album-title and shadow options", async () => {
    const user = userEvent.setup();
    const handleSetHideAlbumTitles = vi.fn();
    const handleSetEnableShadows = vi.fn();

    render(
      <Options
        openAccordion="options"
        handleOpenAccordion={vi.fn()}
        hideAlbumTitles={false}
        handleSetHideAlbumTitles={handleSetHideAlbumTitles}
        enableShadows={true}
        handleSetEnableShadows={handleSetEnableShadows}
        exportOptions={{ format: "image/png", quality: 1 }}
        handleSetExportOptions={vi.fn()}
      />,
    );

    const hideAlbumTitles = screen.getByRole("checkbox", {
      name: /hide album titles/i,
    });
    const enableShadows = screen.getByRole("checkbox", {
      name: /enable shadows/i,
    });

    expect(hideAlbumTitles).not.toBeChecked();
    expect(enableShadows).toBeChecked();

    await user.click(hideAlbumTitles);
    expect(handleSetHideAlbumTitles).toHaveBeenCalledWith(true);

    await user.click(enableShadows);
    expect(handleSetEnableShadows).toHaveBeenCalledWith(false);
  });

  it("passes the parsed export quality to the parent", async () => {
    const user = userEvent.setup();
    const handleSetExportOptions = vi.fn();

    render(
      <Options
        openAccordion="options"
        handleOpenAccordion={vi.fn()}
        hideAlbumTitles={false}
        handleSetHideAlbumTitles={vi.fn()}
        enableShadows={false}
        handleSetEnableShadows={vi.fn()}
        exportOptions={{ format: "image/png", quality: 1 }}
        handleSetExportOptions={handleSetExportOptions}
      />,
    );

    const qualitySelect = screen.getByRole("combobox", {
      name: /export quality/i,
    });
    expect(qualitySelect).toHaveValue(
      JSON.stringify({ format: "image/png", quality: 1 }),
    );

    await user.selectOptions(
      qualitySelect,
      screen.getByRole("option", { name: "Medium (.jpeg)" }),
    );

    expect(handleSetExportOptions).toHaveBeenCalledWith({
      format: "image/jpeg",
      quality: 0.5,
    });
  });

  it("shows collage settings only for collage charts and reports numeric sizes", async () => {
    const user = userEvent.setup();
    const handleSetCollageRowNum = vi.fn();
    const handleSetCollageColNum = vi.fn();

    const props = {
      openAccordion: "collage-settings" as const,
      handleOpenAccordion: vi.fn(),
      collageRowNum: 4,
      collageColNum: 4,
      handleSetCollageRowNum,
      handleSetCollageColNum,
    };

    const { rerender } = render(
      <CollageSettings tableMode="top40" {...props} />,
    );
    expect(screen.queryByText("Collage parameters")).not.toBeInTheDocument();

    rerender(<CollageSettings tableMode="collage" {...props} />);

    expect(screen.getByText("Collage parameters")).toBeInTheDocument();
    const [rowsSelect, columnsSelect] = screen.getAllByRole("combobox");
    expect(rowsSelect).toHaveValue("4");
    expect(columnsSelect).toHaveValue("4");

    await user.selectOptions(rowsSelect, "6");
    expect(handleSetCollageRowNum).toHaveBeenCalledWith(6);

    await user.selectOptions(columnsSelect, "5");
    expect(handleSetCollageColNum).toHaveBeenCalledWith(5);
  });

  it("only lets a new chart switch between collage, top 40, and top 100", async () => {
    const user = userEvent.setup();
    const handleTableModeChange = vi.fn();

    const { rerender } = render(
      <SelectTableMode
        tableMode="top40"
        handleTableModeChange={handleTableModeChange}
      />,
    );
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();

    sessionStorage.setItem("selectedChart", "newChart");
    rerender(
      <SelectTableMode
        tableMode="top40"
        handleTableModeChange={handleTableModeChange}
      />,
    );

    const chartTypeSelect = screen.getByRole("combobox", {
      name: /chart type/i,
    });
    expect(chartTypeSelect).toHaveValue("top40");

    await user.selectOptions(chartTypeSelect, "top100");
    expect(handleTableModeChange).toHaveBeenCalledWith("top100");
  });

  it("lists saved charts and switches the displayed chart", async () => {
    const user = userEvent.setup();
    const changeDisplayedChart = vi.fn();

    localStorage.setItem("Chart A", "{}");
    localStorage.setItem("Chart B", "{}");
    sessionStorage.setItem("selectedChart", "Chart A");

    render(
      <SelectDisplayChart
        tableMode="top40"
        changeDisplayedChart={changeDisplayedChart}
      />,
    );

    const chartSelect = screen.getByLabelText("select chart to display");
    expect(chartSelect).toHaveValue("Chart A");
    expect(
      chartSelect.querySelector('option[value="Chart B"]'),
    ).not.toBeNull();

    await user.selectOptions(chartSelect, "Chart B");

    expect(changeDisplayedChart).toHaveBeenCalledWith("Chart B");
  });
});
