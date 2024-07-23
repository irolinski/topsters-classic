import { DesktopMenuPropTypes } from "../models/menuProps";
import { exportAsImage } from "../utils/downloadImage";
import Logo from "./Logo";
import Background from "./MenuElements/Background";
import CollageSettings from "./MenuElements/CollageSettings";
import Footer from "./MenuElements/Desktop/Footer";
import Font from "./MenuElements/Font";
import Options from "./MenuElements/Options";
import SelectDisplayChart from "./MenuElements/SelectDisplayChart";
import SelectTableMode from "./MenuElements/SelectTableMode";
import Title from "./MenuElements/Title";
import Search from "./Search";

const MenuDesktop = ({
  tableMode,
  handleTableModeChange,
  openAccordion,
  handleOpenAccordion,
  collageRowNum,
  collageColNum,
  handleSetCollageRowNum,
  handleSetCollageColNum,
  chartTitle,
  handleSetChartTitle,
  openMenuPopUp,
  handleOpenPopUp,
  backgroundColor,
  handleSetBackgroundColor,
  backgroundImg,
  handleSetBackgroundImg,
  backgroundPositionMenu,
  handleSetBackgroundImgMode,
  handleBackgroundPositionChange,
  backgroundImgMode,
  fontFamily,
  handleSetFontFamily,
  fontColorHeader,
  handleSetFontColorHeader,
  handleSetFontColorBody,
  fontColorBody,
  hideAlbumTitles,
  handleSetHideAlbumTitles,
  enableShadows,
  handleSetEnableShadows,
  exportOptions,
  handleSetExportOptions,
  inputRef,
  selectedIndex,
  drawAlbumToCanvas,
  openModal,
  handleSetOpenModal,
  exportRef,
  changeDisplayedChart,
}: DesktopMenuPropTypes) => {
  return (
    <div className="relative left-0 lg:min-w-[390px] lg:max-w-[390px]">
      <section
        className="menu-wrapper desktop relative hidden flex-col px-16 lg:flex"
        role="menu"
      >
        <Logo />
        <div className="menu-content max-h-[70%] overflow-scroll">
          <SelectDisplayChart
            tableMode={tableMode}
            changeDisplayedChart={changeDisplayedChart}
          />
          <Search
            selectedIndex={selectedIndex}
            drawAlbumToCanvas={drawAlbumToCanvas}
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            openModal={openModal}
          />
          <SelectTableMode
            tableMode={tableMode}
            handleTableModeChange={handleTableModeChange}
          />
          <CollageSettings
            tableMode={tableMode}
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            collageRowNum={collageRowNum}
            handleSetCollageRowNum={handleSetCollageRowNum}
            collageColNum={collageColNum}
            handleSetCollageColNum={handleSetCollageColNum}
          />{" "}
          <Title
            openAccordion={openAccordion}
            chartTitle={chartTitle}
            handleSetChartTitle={handleSetChartTitle}
            handleOpenAccordion={handleOpenAccordion}
          />
          <Background
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            openMenuPopUp={openMenuPopUp}
            handleOpenPopUp={handleOpenPopUp}
            backgroundColor={backgroundColor}
            handleSetBackgroundColor={handleSetBackgroundColor}
            backgroundImg={backgroundImg}
            handleSetBackgroundImg={handleSetBackgroundImg}
            backgroundPositionMenu={backgroundPositionMenu}
            handleBackgroundPositionChange={handleBackgroundPositionChange}
            backgroundImgMode={backgroundImgMode}
            handleSetBackgroundImgMode={handleSetBackgroundImgMode}
            inputRef={inputRef}
          />
          <Font
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            fontFamily={fontFamily}
            handleSetFontFamily={handleSetFontFamily}
            openMenuPopUp={openMenuPopUp}
            handleOpenPopUp={handleOpenPopUp}
            fontColorHeader={fontColorHeader}
            handleSetFontColorHeader={handleSetFontColorHeader}
            fontColorBody={fontColorBody}
            handleSetFontColorBody={handleSetFontColorBody}
            backgroundColor={backgroundColor}
          />
          <Options
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            hideAlbumTitles={hideAlbumTitles}
            handleSetHideAlbumTitles={handleSetHideAlbumTitles}
            enableShadows={enableShadows}
            handleSetEnableShadows={handleSetEnableShadows}
            exportOptions={exportOptions}
            handleSetExportOptions={handleSetExportOptions}
          />
          <div className="inline-flex w-full">
            <button
              className="export-button my-8 w-full min-w-[66%]"
              onClick={() => {
                exportAsImage(
                  exportRef.current,
                  `topster_${sessionStorage.getItem("selectedChart")!.split(" ").join("_")}` ??
                    "title",
                  exportOptions,
                );
              }}
              aria-label="Export chart"
            >
              Export
            </button>
            {sessionStorage.getItem("selectedChart") === "newChart" && (
              <button
                className="export-button mx-4 my-8 w-1/3"
                onClick={() => {
                  handleSetOpenModal("save");
                }}
                aria-label="Save chart in browser storage"
              >
                {/* <img
                  className="mx-auto min-h-[25px] max-w-[15px]"
                  src="/save_icon.svg"
                /> */}
                Save
              </button>
            )}
          </div>
        </div>
        <Footer handleSetOpenModal={handleSetOpenModal} />
      </section>
    </div>
  );
};

export default MenuDesktop;
