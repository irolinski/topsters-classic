import "./App.scss";
import { MutableRefObject, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";

import { collageEmpty, top50Empty, top100Empty } from "./assets/emptyCharts";
import { HexColorPicker } from "react-colorful";
import { lastFmAlbum } from "./models/models";

import Collage from "./Components/Charts/Collage";
import ClassicTop50 from "./Components/Charts/ClassicTop50";
import Top100 from "./Components/Charts/Top100";

import Footer from "./Components/MenuElements/Desktop/Footer";
import MobileHeader from "./Components/MenuElements/Mobile/Header";
import SelectTableMode from "./Components/MenuElements/Desktop/SelectTableMode";
import Search from "./Components/MenuElements/Desktop/Search";
import Title from "./Components/MenuElements/Desktop/Title";
import Background from "./Components/MenuElements/Desktop/Background";
import Font from "./Components/MenuElements/Desktop/Font";
import Options from "./Components/MenuElements/Desktop/Options";

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
  const [collageColNum, setCollageColNum] = useState<number>(4);

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
  const [chartDirty, setChartDirty] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);

  const drawAlbumToCanvas = (index: number, album: lastFmAlbum) => {
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

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <main className="flex flex-wrap justify-center lg:block">
        {/* MOBILE MENU */}
        <div
          className={`mobile-menu-modal h-[100vh] w-[100vw] ${mobileMenuIsOpened ? "block" : "hidden"}`}
        >
          <button
            className="relative z-10 float-right"
            onClick={() => setMobileMenuIsOpened(!mobileMenuIsOpened)}
          >
            X
          </button>
          <section className="menu-wrapper mobile absolute flex flex-col justify-center p-12">
            <div className="menu-block inline-flex">
              <h2>Chart type:</h2>
              <select
                value={tableMode}
                onChange={(evt) => {
                  setTableMode(evt.target.value);
                  setSelectedIndex(0);
                }}
              >
                <option value="collage">Collage</option>
                <option value="top50">Top 50</option>
                <option value="top100">Top 100</option>
              </select>
            </div>
            <div className="menu-block">
              <h3>Collage settings</h3>
              <h4>Rows:</h4>
              <select
                value={collageRowNum}
                onChange={(evt) => setCollageRowNum(Number(evt.target.value))}
              >
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
              <h4>Columns:</h4>
              <select
                value={collageColNum}
                onChange={(evt) => setCollageColNum(Number(evt.target.value))}
              >
                <option value={4}>4</option>
                <option value={5}>5</option>Number
                <option value={6}>6</option>
              </select>
            </div>
            <h3>Table title:</h3>
            <input
              className="border"
              type="text"
              onChange={async (evt) => setChartTitle(evt.currentTarget.value)}
            />
            <h2>Styling:</h2>
            <div>
              <h3>Background Color:</h3>
              <HexColorPicker
                className="z-10"
                color={backgroundColor}
                onChange={setBackgroundColor}
              />
            </div>
            <div>
              <h3>Background Image:</h3>
              <input
                type="file"
                onChange={(evt) =>
                  setBackgroundImg(URL.createObjectURL(evt.target.files![0]))
                }
              />
              <button onClick={() => setBackgroundImg("")}>Clear</button>
            </div>
            <div>
              <h3>Font:</h3>
              <h4></h4>
              <h4> Body Font Color: </h4>
              <HexColorPicker
                className="z-10"
                color={fontColorBody}
                onChange={setfontColorBody}
              />
              <h4> Header Font Color: </h4>
              <HexColorPicker
                className="z-10"
                color={fontColorHeader}
                onChange={setfontColorHeader}
              />
            </div>

            <h3>Hide album titles:</h3>
            <input
              type="checkbox"
              defaultChecked={hideAlbumTitles}
              onChange={() => setHideAlbumTitles(!hideAlbumTitles)}
            />
          </section>
        </div>
        <MobileHeader />
        {/* SEARCH SECTION */}
        <div className="mobile-menu flex w-[75vw] max-w-[75vw] flex-col justify-center pt-24 md:w-1/2 lg:hidden">
          <div className="search-input w-full border">
            <input
              className="w-[75%]"
              type="text"
              onKeyUp={
                async (evt) => evt.key === "Enter"
                // ? searchAlbums(searchInputValue)
                // : setSearchInputValue(evt.currentTarget.value)
              }
            />
            <button
              className="w-[25%] text-xs"
              onClick={() => {
                // searchAlbums(searchInputValue);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="search-results-div-mobile flex h-[100px] max-h-[125px] w-[85vw] max-w-[75vw] overflow-y-hidden overflow-x-scroll lg:hidden">
          {/* {searchResults ? (
            searchResults.map((a: any) => {
              if (a.image[1]["#text"]) {
                return (
                  <div
                    className="w-[125px] p-2 hover:opacity-50"
                    onClick={() => {
                      drawAlbumToCanvas(selectedIndex, a);
                    }}
                  >
                    <img className="min-w-16" src={`${a.image[1]["#text"]}`} />
                  </div>
                );
              }
            })
          ) : (
            <div className="flex w-full items-center justify-center">
              <span className="text-center text-sm">
                {" "}
                Search for the albums using the box above!{" "}
              </span>
            </div>
          )} */}
        </div>
        <div className="inline-flex">
          {/* DESKTOP MENU */}
          <div className="relative left-0 lg:min-w-[390px] lg:max-w-[390px]">
            <section className="menu-wrapper desktop relative hidden flex-col px-16 lg:flex">
              <h1 className="mx-auto p-8 text-4xl">Topsters</h1>
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
                {tableMode === "collage" && (
                  <div className="menu-block">
                    <div
                      className="open-accordion-btn inline-flex"
                      onClick={() =>
                        openAccordion === "collage-settings"
                          ? closeAllWindows()
                          : (closeAllWindows(),
                            setOpenAccordion("collage-settings"))
                      }
                    >
                      <h3 className="w-full font-bold">Collage parameters</h3>{" "}
                      {openAccordion === "collage-settings" ? (
                        <button className="no-style mx-4">－</button>
                      ) : (
                        <button className="no-style mx-4">＋</button>
                      )}{" "}
                    </div>
                    <div
                      className={`menu-accordion ${openAccordion === "collage-settings" && "open"}`}
                    >
                      <div className="inline-flex w-full p-4">
                        <h4 className="px-4">Rows:</h4>
                        <select
                          value={collageRowNum}
                          onChange={(evt) =>
                            setCollageRowNum(Number(evt.target.value))
                          }
                        >
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                        </select>
                      </div>
                      <div className="inline-flex w-full p-4">
                        <h4 className="px-4">Columns:</h4>
                        <select
                          value={collageColNum}
                          onChange={(evt) =>
                            setCollageColNum(Number(evt.target.value))
                          }
                        >
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
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
              <Footer />
            </section>
          </div>

          {/* CANVAS SECTION */}
          <div
            className="flex justify-center lg:w-[65vw] xl:w-[75vw]"
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
              />
            )}
          </div>
        </div>
        <div className="mobile-menu lg:hidden">
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
    </div>
  );
}

export default App;
