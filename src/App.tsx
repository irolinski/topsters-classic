import "./App.scss";
import { useContext } from "react";

import Collage from "./Components/Charts/Collage";
import ClassicTop40 from "./Components/Charts/ClassicTop40";
import Top100 from "./Components/Charts/Top100";

import MobileHeader from "./Components/MenuElements/Mobile/Header";
import Search from "./Components/Search";
import AboutModal from "./Components/AboutModal";
import FooterMobile from "./Components/MenuElements/Mobile/Footer";
import MenuMobile from "./Components/MenuMobile";
import MenuDesktop from "./Components/MenuDesktop";
import { MenuContext } from "./context/MenuContext";
import MenuLinks from "./Components/MenuElements/Mobile/MenuLinks";

// const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

function App() {
  const menu: any = useContext(MenuContext);

  return (
    <div className="flex h-full max-h-[120vh] w-full flex-col justify-center">
      <main className="flex flex-wrap justify-center lg:block">
        {/* MODAL - ABOUT */}
        <AboutModal
          showAboutModal={menu.showAboutModal}
          handleSetShowAboutModal={menu.handleSetShowAboutModal}
        />
        {/* MOBILE MENU */}
        <MenuMobile
          tableMode={menu.tableMode}
          handleTableModeChange={menu.handleTableModeChange}
          mobileMenuIsOpened={menu.mobileMenuIsOpened}
          handleSetMobileMenuIsOpened={menu.handleSetMobileMenuIsOpened}
          openAccordion={menu.openAccordion}
          handleOpenAccordion={menu.handleOpenAccordion}
          collageRowNum={menu.collageRowNum}
          handleSetCollageRowNum={menu.handleSetCollageRowNum}
          collageColNum={menu.collageColNum}
          handleSetCollageColNum={menu.handleSetCollageColNum}
          chartTitle={menu.chartTitle}
          handleSetChartTitle={menu.handleSetChartTitle}
          openMenuPopUp={menu.openMenuPopUp}
          handleOpenPopUp={menu.handleOpenPopUp}
          backgroundColor={menu.backgroundColor}
          handleSetBackgroundColor={menu.handleSetBackgroundColor}
          backgroundImg={menu.backgroundImg}
          handleSetBackgroundImg={menu.handleSetBackgroundImg}
          backgroundPositionMenu={menu.backgroundPositionMenu}
          handleBackgroundPositionChange={menu.handleBackgroundPositionChange}
          backgroundImgMode={menu.backgroundImgMode}
          handleSetBackgroundImgMode={menu.handleSetBackgroundImgMode}
          fontFamily={menu.fontFamily}
          handleSetFontFamily={menu.handleSetFontFamily}
          fontColorHeader={menu.fontColorHeader}
          handleSetFontColorHeader={menu.handleSetFontColorHeader}
          fontColorBody={menu.fontColorBody}
          handleSetFontColorBody={menu.handleSetFontColorBody}
          hideAlbumTitles={menu.hideAlbumTitles}
          handleSetHideAlbumTitles={menu.handleSetHideAlbumTitles}
          enableShadows={menu.enableShadows}
          handleSetEnableShadows={menu.handleSetEnableShadows}
          exportOptions={menu.exportOptions}
          handleSetExportOptions={menu.handleSetExportOptions}
          inputRef={menu.inputRef}
        />
        <MobileHeader />
        {/* MOBILE SEARCH SECTION */}
        <div className="lg:hidden">
          <Search
            selectedIndex={menu.selectedIndex}
            drawAlbumToCanvas={menu.drawAlbumToCanvas}
            openAccordion={menu.openAccordion}
            handleOpenAccordion={menu.handleOpenAccordion}
          />
        </div>
        {/* MENU DESKTOP */}
        <div className="inline-flex">
          <MenuDesktop
            tableMode={menu.tableMode}
            handleTableModeChange={menu.handleTableModeChange}
            mobileMenuIsOpened={menu.mobileMenuIsOpened}
            handleSetMobileMenuIsOpened={menu.handleSetMobileMenuIsOpened}
            openAccordion={menu.openAccordion}
            handleOpenAccordion={menu.handleOpenAccordion}
            collageRowNum={menu.collageRowNum}
            handleSetCollageRowNum={menu.handleSetCollageRowNum}
            collageColNum={menu.collageColNum}
            handleSetCollageColNum={menu.handleSetCollageColNum}
            chartTitle={menu.chartTitle}
            handleSetChartTitle={menu.handleSetChartTitle}
            openMenuPopUp={menu.openMenuPopUp}
            handleOpenPopUp={menu.handleOpenPopUp}
            backgroundColor={menu.backgroundColor}
            handleSetBackgroundColor={menu.handleSetBackgroundColor}
            backgroundImg={menu.backgroundImg}
            handleSetBackgroundImg={menu.handleSetBackgroundImg}
            backgroundPositionMenu={menu.backgroundPositionMenu}
            handleBackgroundPositionChange={menu.handleBackgroundPositionChange}
            backgroundImgMode={menu.backgroundImgMode}
            handleSetBackgroundImgMode={menu.handleSetBackgroundImgMode}
            fontFamily={menu.fontFamily}
            handleSetFontFamily={menu.handleSetFontFamily}
            fontColorHeader={menu.fontColorHeader}
            handleSetFontColorHeader={menu.handleSetFontColorHeader}
            fontColorBody={menu.fontColorBody}
            handleSetFontColorBody={menu.handleSetFontColorBody}
            hideAlbumTitles={menu.hideAlbumTitles}
            handleSetHideAlbumTitles={menu.handleSetHideAlbumTitles}
            enableShadows={menu.enableShadows}
            handleSetEnableShadows={menu.handleSetEnableShadows}
            exportOptions={menu.exportOptions}
            handleSetExportOptions={menu.handleSetExportOptions}
            inputRef={menu.inputRef}
            selectedIndex={menu.selectedIndex}
            drawAlbumToCanvas={menu.drawAlbumToCanvas}
            exportRef={menu.exportRef}
            showAboutModal={menu.showAboutModal}
            handleSetShowAboutModal={menu.handleSetShowAboutModal}
          />
          {/* CANVAS SECTION */}
          <div
            className="canvas-section flex justify-center lg:w-[65vw] xl:w-[75vw]"
            style={{ fontFamily: `${menu.fontFamily}` }}
          >
            {menu.tableMode === "collage" && (
              <Collage
                exportRef={menu.exportRef}
                collageData={menu.collageData}
                collageRowNum={menu.collageRowNum}
                collageColNum={menu.collageColNum}
                selectedIndex={menu.selectedIndex}
                changeIndex={menu.changeIndex}
                chartDirty={menu.chartDirty}
                chartTitle={menu.chartTitle}
                hideAlbumTitles={menu.hideAlbumTitles}
                backgroundColor={menu.backgroundColor}
                backgroundImg={menu.backgroundImg}
                backgroundImgPosition={menu.backgroundImgPosition}
                backgroundImgMode={menu.backgroundImgMode}
                fontColorHeader={menu.fontColorHeader}
                fontColorBody={menu.fontColorBody}
                enableShadows={menu.enableShadows}
                loadingImage={menu.loadingImage}
                handleImageLoaded={menu.handleImageLoaded}
              />
            )}
            {menu.tableMode === "top40" && (
              <ClassicTop40
                exportRef={menu.exportRef}
                top40Data={menu.top40Data}
                selectedIndex={menu.selectedIndex}
                changeIndex={menu.changeIndex}
                chartDirty={menu.chartDirty}
                chartTitle={menu.chartTitle}
                hideAlbumTitles={menu.hideAlbumTitles}
                backgroundColor={menu.backgroundColor}
                backgroundImg={menu.backgroundImg}
                backgroundImgPosition={menu.backgroundImgPosition}
                backgroundImgMode={menu.backgroundImgMode}
                fontColorHeader={menu.fontColorHeader}
                fontColorBody={menu.fontColorBody}
                enableShadows={menu.enableShadows}
                loadingImage={menu.loadingImage}
                handleImageLoaded={menu.handleImageLoaded}
              />
            )}

            {menu.tableMode === "top100" && (
              <Top100
                exportRef={menu.exportRef}
                top100Data={menu.top100Data}
                selectedIndex={menu.selectedIndex}
                changeIndex={menu.changeIndex}
                chartDirty={menu.chartDirty}
                chartTitle={menu.chartTitle}
                hideAlbumTitles={menu.hideAlbumTitles}
                backgroundColor={menu.backgroundColor}
                backgroundImg={menu.backgroundImg}
                backgroundImgPosition={menu.backgroundImgPosition}
                backgroundImgMode={menu.backgroundImgMode}
                fontColorHeader={menu.fontColorHeader}
                fontColorBody={menu.fontColorBody}
                enableShadows={menu.enableShadows}
                loadingImage={menu.loadingImage}
                handleImageLoaded={menu.handleImageLoaded}
              />
            )}
          </div>
        </div>
        <MenuLinks
          mobileMenuIsOpened={menu.mobileMenuIsOpened}
          handleSetMobileMenuIsOpened={menu.handleSetMobileMenuIsOpened}
          exportRef={menu.exportRef}
          exportOptions={menu.exportOptions}
        />
      </main>
      <FooterMobile
        showAboutModal={menu.showAboutModal}
        handleSetShowAboutModal={menu.handleSetShowAboutModal}
      />
    </div>
  );
}

export default App;
