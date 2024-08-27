import Background from "./MenuElements/Background";
import CollageSettings from "./MenuElements/CollageSettings";
import Font from "./MenuElements/Font";
import Options from "./MenuElements/Options";
import Title from "./MenuElements/Title";
import { MobileMenuPropTypes } from "../models/menuProps";
import SelectDisplayChart from "./MenuElements/SelectDisplayChart";
import SelectTableMode from "./MenuElements/SelectTableMode";

const MenuMobile = ({
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
  openModal,
  handleSetOpenModal,
  changeDisplayedChart,
  darkenBackground,
  toggleDarkenBackground,
}: MobileMenuPropTypes) => {
  return (
    <div
      className={`mobile-menu-modal fixed z-20 max-h-[100vh] min-w-[100vw] ${openModal === "mobileMenu" ? "block" : "hidden"} py-[5vh] xxs:px-[10vw] xxs:py-[10vh] lg:hidden`}
      tabIndex={0}
      aria-modal="true"
      role="menu"
      autoFocus
    >
      <button
        className="fixed right-0 top-0 z-10"
        onClick={() => {
          handleSetOpenModal("");
        }}
        aria-label="close mobile menu"
        tabIndex={0}
      >
        &#10005;
      </button>
      <section
        className="menu-wrapper z-20 flex max-h-[100vh] flex-col justify-center p-12"
        role="menu"
      >
        <div className="relative h-full overflow-scroll">
          <SelectDisplayChart
            tableMode={tableMode}
            changeDisplayedChart={changeDisplayedChart}
          />
          {/* <div className="py-4"> */}
          <SelectTableMode
            tableMode={tableMode}
            handleTableModeChange={handleTableModeChange}
          />
          {/* </div> */}
          <CollageSettings
            tableMode={tableMode}
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
            collageRowNum={collageRowNum}
            handleSetCollageRowNum={handleSetCollageRowNum}
            collageColNum={collageColNum}
            handleSetCollageColNum={handleSetCollageColNum}
          />
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
            openModal={openModal}
            darkenBackground={darkenBackground}
            toggleDarkenBackground={toggleDarkenBackground}
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
          <div className="inline-flex w-full justify-center">
            <button
              name="export_chart"
              className="export-button my-8 min-w-[66%]"
              onClick={() => handleSetOpenModal("")}
              aria-label="Close mobile menu"
            >
              Return
            </button>
            {sessionStorage.getItem("selectedChart") === "newChart" && (
              <button
                className="export-button mx-4 my-8 w-1/2"
                onClick={() => {
                  handleSetOpenModal("save");
                }}
                aria-label="Save chart in browser storage"
              >
                Save
                {/* <img
                  className="mx-auto min-h-[25px] max-w-[15px]"
                  src="/save_icon.svg"
                /> */}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuMobile;
