import { DesktopMenuPropTypes } from "../models/menuProps";
import { exportAsImage } from "../utils/downloadImage";
import Logo from "./Logo";
import Background from "./MenuElements/Background";
import CollageSettings from "./MenuElements/CollageSettings";
import Footer from "./MenuElements/Desktop/Footer";
import Font from "./MenuElements/Font";
import Options from "./MenuElements/Options";
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
  exportRef,
  showAboutModal,
  handleSetShowAboutModal,
  showSaveModal,
  handleSetShowSaveModal,
  changeDisplayedChart,
}: DesktopMenuPropTypes) => {
  return (
    <div className="relative left-0 lg:min-w-[390px] lg:max-w-[390px]">
      <section className="menu-wrapper desktop relative hidden flex-col px-16 lg:flex">
        <Logo />
        <div className="menu-content max-h-[70%] overflow-scroll">
          <SelectTableMode
            tableMode={tableMode}
            changeDisplayedChart={changeDisplayedChart}
            // handleTableModeChange={handleTableModeChange}
          />
          <Search
            selectedIndex={selectedIndex}
            drawAlbumToCanvas={drawAlbumToCanvas}
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
          />
          {/* Collage table settings */}
          {sessionStorage.getItem("selectedChart") === "newChart" && (
            <div className="inline-flex">
              <h2 className="pr-4">Chart type:</h2>
              <select
                value={tableMode}
                onChange={(evt) => {
                  handleTableModeChange(evt.target.value);
                }}
              >
                <option value="collage">Collage</option>
                <option value="top40">Top 40</option>
                <option value="top100">Top 100</option>
              </select>
              {/* <button className=" no-style max-w-[20px] ml-12">
          <img className="min-w-[10px]" src="/load_icon.svg"/>
        </button> */}
            </div>
          )}
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
              className="export-button my-8 w-2/3"
              onClick={() => {
                exportAsImage(exportRef.current, "title", exportOptions);
              }}
            >
              Export
            </button>
            <button
              className="export-button mx-4 my-8 w-1/3"
              onClick={() => {
                handleSetShowSaveModal(showSaveModal);
              }}
              // onClick={() => saveCurrentChart("oKKKKKK")}
            >
              {/* <img
                className="mx-auto min-h-[25px] max-w-[15px]"
                src="/save_icon.svg"
              /> */}
              Save
            </button>
          </div>
        </div>
        <Footer
          showAboutModal={showAboutModal}
          handleSetShowAboutModal={handleSetShowAboutModal}
        />
      </section>
    </div>
  );
};

export default MenuDesktop;
