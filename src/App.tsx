import "./App.scss";
import { MutableRefObject, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";

import { collageEmpty, top50Empty, top100Empty } from "./assets/emptyCharts";
import { lastFmAlbum } from "./models/models";

import Collage from "./Components/Charts/Collage";
import ClassicTop50 from "./Components/Charts/ClassicTop50";
import Top100 from "./Components/Charts/Top100";

import Footer from "./Components/MenuElements/Desktop/Footer";
import MobileHeader from "./Components/MenuElements/Mobile/Header";
import SelectTableMode from "./Components/MenuElements/SelectTableMode";
import Search from "./Components/Search";
import Title from "./Components/MenuElements/Title";
import Background from "./Components/MenuElements/Background";
import Font from "./Components/MenuElements/Font";
import Options from "./Components/MenuElements/Options";
import AboutModal from "./Components/AboutModal";
import Logo from "./Components/Logo";
import FooterMobile from "./Components/MenuElements/Mobile/Footer";
import CollageSettings from "./Components/MenuElements/CollageSettings";

// const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

function App() {
  //menu navigation
  const [mobileMenuIsOpened, setMobileMenuIsOpened] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string>("");

  const closeAllWindows = () => {
    setOpenMenuPopUp("");
    setOpenAccordion("");
  };

  const handleOpenAccordion = (selectedAccordion: string) => {
    if (selectedAccordion !== "search") {
      openAccordion === selectedAccordion
        ? closeAllWindows()
        : (closeAllWindows(), setOpenAccordion(selectedAccordion));
    } else {
      setOpenAccordion("search");
    }
  };

  // set table mode - (collage || top40 || top100)
  const [tableMode, setTableMode] = useState("top100");
  const handleTableModeChange = (mode: string) => {
    setTableMode(mode);
    setSelectedIndex(0);
  };

  // collage options
  const [collageRowNum, setCollageRowNum] = useState<number>(4);
  const handleSetCollageRowNum = (val: number) => {
    setCollageRowNum(val);
  };
  const [collageColNum, setCollageColNum] = useState<number>(4);
  const handleSetCollageColNum = (val: number) => {
    setCollageColNum(val);
  };
  // chart states
  const [collageData, setCollageData] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(collageEmpty);
  const [top50Data, setTop50Data] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(top50Empty);
  const [top100Data, setTop100Data] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(top100Empty);

  //set chart title
  const [chartTitle, setChartTitle] = useState<string>("");
  const handleSetChartTitle = (newTitle: string) => {
    setChartTitle(newTitle);
  };

  //customize chart
  const [hideAlbumTitles, setHideAlbumTitles] = useState<boolean>(false);
  const handleSetHideAlbumTitles = (isTrue: boolean) =>
    setHideAlbumTitles(isTrue);

  // set background image
  // (sizes have to be defined as variables for they are crucial to get the offset right)
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const handleSetBackgroundImg = (url: string) => {
    setBackgroundImg(url);
  };
  const [backgroundImgPosition, setBackgroundImgPosition] = useState({
    x: 0,
    y: 0,
  });

  // auto/cover/contain
  const [backgroundImgMode, setBackgroundImgMode] = useState<string>("cover");
  const handleSetBackgroundImgMode = (newMode: string) => {
    setBackgroundImgMode(newMode);
  };

  const backgroundPositionMenu = {
    boxSizeXY: 190, // the size of the container
    dotSizeXY: 30, // the size of the pointer dot
    centerDot: 80, // center of the scale
  };

  const handleBackgroundPositionChange = (dragX: any, dragY: any) => {
    const scaleEnd =
      backgroundPositionMenu.boxSizeXY - backgroundPositionMenu.dotSizeXY;

    const offsetX = Math.floor((dragX / scaleEnd) * 100);
    const offsetY = Math.floor((dragY / scaleEnd) * 100);

    setBackgroundImgPosition({ x: offsetX, y: offsetY });
  };

  // choose font
  const [fontFamily, setFontFamily] = useState<string>("Space Mono");
  const handleSetFontFamily = (newFontName: string) => {
    setFontFamily(newFontName);
  };

  //set colors
  const [fontColorBody, setfontColorBody] = useState<string>("");
  const handleSetFontColorBody = (newColor: string) => {
    setfontColorBody(newColor);
  };
  const [fontColorHeader, setfontColorHeader] = useState<string>("");
  const handleSetFontColorHeader = (newColor: string) => {
    setfontColorHeader(newColor);
  };

  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const handleSetBackgroundColor = (newColor: string) => {
    setBackgroundColor(newColor);
  };
  const [openMenuPopUp, setOpenMenuPopUp] = useState<string>("");

  const handleOpenPopUp = (selectedPopUp: string) => {
    if (selectedPopUp !== "") {
      openMenuPopUp !== selectedPopUp
        ? setOpenMenuPopUp(selectedPopUp)
        : setOpenMenuPopUp("");
    } else {
      setOpenMenuPopUp("");
    }
  };

  // enable/disable shadows
  const [enableShadows, setEnableShadows] = useState<boolean>(true);
  const handleSetEnableShadows = (isTrue: boolean) => setEnableShadows(isTrue);

  // insert image onto canvas
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const changeIndex = (i: number) => {
    setSelectedIndex(i);
  };
  const [loadingImage, setLoadingImage] = useState<number>(999);
  const handleImageLoaded = () => setLoadingImage(999);
  const [chartDirty, setChartDirty] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);

  const drawAlbumToCanvas = (index: number, album: lastFmAlbum) => {
    setLoadingImage(index);

    if (tableMode === "collage") {
      let updatedArr = collageData;
      updatedArr[index] = album;
      setCollageData(updatedArr); //or other table type
      selectedIndex < collageColNum * collageRowNum - 1
        ? setSelectedIndex(selectedIndex + 1)
        : setSelectedIndex(0);
    }

    if (tableMode === "top50") {
      let updatedArr = top50Data;
      updatedArr[index] = album;
      setTop50Data(updatedArr);
      selectedIndex < 50 - 1
        ? setSelectedIndex(selectedIndex + 1)
        : setSelectedIndex(0);
    }

    if (tableMode === "top100") {
      let updatedArr = top100Data;
      updatedArr[index] = album;
      setTop100Data(updatedArr);
      selectedIndex < 100 - 1
        ? setSelectedIndex(selectedIndex + 1)
        : setSelectedIndex(0);
    }

    // this is to force a rerender in a gentle way
    setRefresh(true);
    setRefresh(!refresh);
    setChartDirty(true);
  };

  //file input ref
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  //export image
  const exportRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [exportOptions, setExportOptions] = useState<{
    format: string;
    quality: number;
  }>({
    format: "image/jpeg",
    quality: 0.5,
  });
  const handleSetExportOptions = (options: {
    format: string;
    quality: number;
  }) => {
    setExportOptions(options);
  };

  // about modal

  const [showAboutModal, setShowAboutModal] = useState(false);
  const handleSetShowAboutModal = () => setShowAboutModal(!showAboutModal);

  return (
    <div className="flex h-full max-h-[120vh] w-full flex-col justify-center">
      <main className="flex flex-wrap justify-center lg:block">
        {/* About Modal */}
        <AboutModal
          showAboutModal={showAboutModal}
          handleSetShowAboutModal={handleSetShowAboutModal}
        />
        {/* MOBILE MENU */}
        <div
          className={`mobile-menu-modal absolute z-20 max-h-[100vh] min-w-[100vw] ${mobileMenuIsOpened ? "block" : "hidden"} lg:hidden`}
        >
          <button
            className="fixed right-0 top-0 z-10"
            onClick={() => setMobileMenuIsOpened(!mobileMenuIsOpened)}
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
                onClick={() => setMobileMenuIsOpened(!mobileMenuIsOpened)}
              >
                Return
              </button>
            </div>
          </section>
        </div>

        <MobileHeader />
        {/* SEARCH SECTION */}
        <div className="lg:hidden">
          <Search
            selectedIndex={selectedIndex}
            drawAlbumToCanvas={drawAlbumToCanvas}
            openAccordion={openAccordion}
            handleOpenAccordion={handleOpenAccordion}
          />
        </div>
        <div className="inline-flex">
          {/* DESKTOP MENU */}
          <div className="relative left-0 lg:min-w-[390px] lg:max-w-[390px]">
            <section className="menu-wrapper desktop relative hidden flex-col px-16 lg:flex">
              <Logo />
              <div className="menu-content max-h-[70%] overflow-scroll">
                <SelectTableMode
                  tableMode={tableMode}
                  handleTableModeChange={handleTableModeChange}
                />
                <Search
                  selectedIndex={selectedIndex}
                  drawAlbumToCanvas={drawAlbumToCanvas}
                  openAccordion={openAccordion}
                  handleOpenAccordion={handleOpenAccordion}
                />
                {/* Collage table settings */}
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
                  handleBackgroundPositionChange={
                    handleBackgroundPositionChange
                  }
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
                  onClick={() => {
                    exportAsImage(exportRef.current, "title", exportOptions);
                  }}
                >
                  Export
                </button>
              </div>
              <Footer
                showAboutModal={showAboutModal}
                handleSetShowAboutModal={handleSetShowAboutModal}
              />
            </section>
          </div>

          {/* CANVAS SECTION */}
          <div
            className="canvas-section flex justify-center lg:w-[65vw] xl:w-[75vw]"
            style={{ fontFamily: `${fontFamily}` }}
          >
            {/* collage */}
            {tableMode === "collage" && (
              <Collage
                exportRef={exportRef}
                collageData={collageData}
                collageRowNum={collageRowNum}
                collageColNum={collageColNum}
                selectedIndex={selectedIndex}
                changeIndex={changeIndex}
                chartDirty={chartDirty}
                chartTitle={chartTitle}
                hideAlbumTitles={hideAlbumTitles}
                backgroundColor={backgroundColor}
                backgroundImg={backgroundImg}
                backgroundImgPosition={backgroundImgPosition}
                backgroundImgMode={backgroundImgMode}
                fontColorHeader={fontColorHeader}
                fontColorBody={fontColorBody}
                enableShadows={enableShadows}
                loadingImage={loadingImage}
                handleImageLoaded={handleImageLoaded}
              />
            )}
            {tableMode === "top50" && (
              <ClassicTop50
                exportRef={exportRef}
                top50Data={top50Data}
                selectedIndex={selectedIndex}
                changeIndex={changeIndex}
                chartDirty={chartDirty}
                chartTitle={chartTitle}
                hideAlbumTitles={hideAlbumTitles}
                backgroundColor={backgroundColor}
                backgroundImg={backgroundImg}
                backgroundImgPosition={backgroundImgPosition}
                backgroundImgMode={backgroundImgMode}
                fontColorHeader={fontColorHeader}
                fontColorBody={fontColorBody}
                enableShadows={enableShadows}
                loadingImage={loadingImage}
                handleImageLoaded={handleImageLoaded}
              />
            )}

            {tableMode === "top100" && (
              <Top100
                exportRef={exportRef}
                top100Data={top100Data}
                selectedIndex={selectedIndex}
                changeIndex={changeIndex}
                chartDirty={chartDirty}
                chartTitle={chartTitle}
                hideAlbumTitles={hideAlbumTitles}
                backgroundColor={backgroundColor}
                backgroundImg={backgroundImg}
                backgroundImgPosition={backgroundImgPosition}
                backgroundImgMode={backgroundImgMode}
                fontColorHeader={fontColorHeader}
                fontColorBody={fontColorBody}
                enableShadows={enableShadows}
                loadingImage={loadingImage}
                handleImageLoaded={handleImageLoaded}
              />
            )}
          </div>
        </div>
        <div className="mobile-menu flex w-full justify-center lg:hidden">
          <button
            className="m-2"
            onClick={() => setMobileMenuIsOpened(!mobileMenuIsOpened)}
          >
            Customize
          </button>
          <button
            className="m-2"
            onClick={() => {
              exportAsImage(exportRef.current, "title", exportOptions);
            }}
          >
            Export
          </button>
        </div>
      </main>
      <FooterMobile
        showAboutModal={showAboutModal}
        handleSetShowAboutModal={handleSetShowAboutModal}
      />
    </div>
  );
}

export default App;
