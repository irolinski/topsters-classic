import Background from "./MenuElements/Background";
import CollageSettings from "./MenuElements/CollageSettings";
import Font from "./MenuElements/Font";
import Options from "./MenuElements/Options";
import SelectTableMode from "./MenuElements/SelectTableMode";
import Title from "./MenuElements/Title";
import { MobileMenuPropTypes } from "../models/menuProps";

const MenuMobile = ({
  tableMode,
  handleTableModeChange,
  mobileMenuIsOpened,
  handleSetMobileMenuIsOpened,
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
}: MobileMenuPropTypes) => {
  return (
    <div
      className={`mobile-menu-modal fixed z-20 max-h-[100vh] min-w-[100vw] sm:p-4 ${mobileMenuIsOpened ? "block" : "hidden"} md:p-[20vw] lg:hidden`}
    >
      <button
        className="fixed right-0 top-0 z-10"
        onClick={() => handleSetMobileMenuIsOpened(mobileMenuIsOpened)}
      >
        &#10005;
      </button>
      <section className="menu-wrapper flex flex-col justify-center p-12">
        <div className="relative h-full">
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
          <button
            className="export-button my-8 w-full"
            onClick={() => handleSetMobileMenuIsOpened(mobileMenuIsOpened)}
          >
            Return
          </button>
        </div>
      </section>
    </div>
  );
};

export default MenuMobile;
