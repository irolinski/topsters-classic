import "./App.scss";
import { MutableRefObject, RefObject, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";
import Collage from "./Components/Charts/Collage";
import { collageEmpty, top50Empty, top100Empty } from "./assets/emptyCharts";
import { HexColorPicker } from "react-colorful";
import ClassicTop50 from "./Components/Charts/ClassicTop50";
import Top100 from "./Components/Charts/Top100";
import invert from "invert-color";

const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

// type declarations
export type lastFmAlbumImages = {
  text: string;
  size: string;
};

export type lastFmAlbum = {
  name?: string;
  artist: string;
  image: lastFmAlbumImages[];
  // ?streamable: number
  url: string;
};

function App() {
  const [mobileMenuIsOpened, setMobileMenuIsOpened] = useState<boolean>(false);
  // set table mode - (collage || top40 || top100)
  const [tableMode, setTableMode] = useState("top100");

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

  //customize chart
  const [hideAlbumTitles, setHideAlbumTitles] = useState<boolean>(false);

  // choose font
  const [fontFamily, setFontFamily] = useState<string>("Space Mono");

  //set colors
  const [fontColorBody, setfontColorBody] = useState<string>("");
  const [fontColorHeader, setfontColorHeader] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const [openColorPicker, setOpenColorPicker] = useState<string>("");

  // last.fm api search feature
  const [searchInputValue, setSearchInputValue] = useState<string>("hi");
  const [searchResults, setSearchResults] = useState<any>(null);

  const searchAlbums = async (albumTitle: string) => {
    let albumData: any = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`,
    ).then((response) => response.json());

    albumData = albumData.results.albummatches.album;
    setSearchResults(albumData);
  };

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
    // this forces rerender in a gentle way I don't really know why but it works
    setRefresh(true);
    setRefresh(!refresh);
    setChartDirty(true);
  };

  //file input ref
  const inputRef: MutableRefObject<HTMLInputElement | undefined> = useRef();

  //export image
  const exportRef: MutableRefObject<undefined> = useRef();

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
              <h3>Collage settings:</h3>
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
                color={backgroundColor}
                onChange={setBackgroundColor}
              />
            </div>
            <div>
              <h3>Background Image:</h3>
              {/* @ts-ignore */}
              <input
                type="file"
                onChange={(evt) =>
                  setBackgroundImg(
                    URL.createObjectURL(
                      evt.target.files && evt.target.files[0],
                    ),
                  )
                }
              />
              <button onClick={() => setBackgroundImg("")}>Clear</button>
            </div>
            <div>
              <h3>Font:</h3>
              <h4></h4>
              <h4> Body Font Color: </h4>
              <HexColorPicker
                color={fontColorBody}
                onChange={setfontColorBody}
              />
              <h4> Header Font Color: </h4>
              <HexColorPicker
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
        {/* PAGE HEADER */}
        <div className="logo relative left-1/2 top-8 w-full -translate-x-1/2 text-center">
          <h1 className="lg:hidden">Topsters</h1>
        </div>
        {/* SEARCH SECTION */}
        <div className="mobile-menu flex w-[75vw] max-w-[75vw] flex-col justify-center pt-24 md:w-1/2 lg:hidden">
          <div className="search-input w-full border">
            <input
              className="w-[75%]"
              type="text"
              onKeyUp={async (evt) =>
                evt.key === "Enter"
                  ? searchAlbums(searchInputValue)
                  : setSearchInputValue(evt.currentTarget.value)
              }
            />
            <button
              className="w-[25%] text-xs"
              onClick={() => {
                searchAlbums(searchInputValue);
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="search-results-div-mobile flex h-[100px] max-h-[125px] w-[85vw] max-w-[75vw] overflow-y-hidden overflow-x-scroll lg:hidden">
          {searchResults ? (
            searchResults.map((a: any) => {
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
            })
          ) : (
            <div className="flex w-full items-center justify-center">
              <span className="text-center text-sm">
                {" "}
                Search for the albums using the box above!{" "}
              </span>
            </div>
          )}
        </div>
        <div className="inline-flex">
          {/* DESKTOP MENU */}
          <div className="relative left-0 lg:w-[25vw] lg:min-w-[369px]">
            <section className="menu-wrapper desktop relative hidden flex-col px-16 lg:flex">
              <h1 className="mx-auto p-8 text-4xl">Topsters</h1>
              <div className="menu-content">
                <div className="menu-block inline-flex">
                  <h2 className="pr-4">Chart type:</h2>
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
                {tableMode === "collage" && (
                  <div className="menu-block">
                    <h3>Collage settings:</h3>
                    <div className="inline-flex w-full">
                      <h4>Rows:</h4>
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
                    <div className="inline-flex w-full">
                      <h4>Columns:</h4>
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
                )}
                <div className="menu-block">
                  <h2>Search for your albums:</h2>
                  <div className="search-input my-2 inline-flex h-8 items-stretch border">
                    <input
                      className="w-3/4"
                      type="text"
                      onKeyUp={async (evt) =>
                        evt.key === "Enter"
                          ? searchAlbums(searchInputValue)
                          : setSearchInputValue(evt.currentTarget.value)
                      }
                    />
                    <button
                      className="w-1/4"
                      onClick={() => {
                        searchAlbums(searchInputValue);
                      }}
                    >
                      🔍
                    </button>
                  </div>
                  <div
                    className="max-h-[300px] overflow-scroll"
                    id="search-results-div"
                  >
                    {searchResults &&
                      searchResults.map((a: any) => {
                        return (
                          <div
                            className="album-card m-4 inline-flex w-full"
                            onClick={() => {
                              drawAlbumToCanvas(selectedIndex, a);
                            }}
                          >
                            <div className="justify-start">
                              <img
                                className="w-16"
                                src={`${a.image[1]["#text"]}`}
                              />
                            </div>
                            <div className="m-4">
                              <span className="font-bold"> {a.name} </span>by
                              <span className="font-bold"> {a.artist}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="menu-block">
                  <h3>Table title:</h3>
                  <div className="chart-title-input my-2 inline-flex h-8 items-stretch border">
                    <input
                      className="w-3/4"
                      type="text"
                      value={chartTitle}
                      onChange={async (evt) =>
                        setChartTitle(evt.currentTarget.value)
                      }
                    />
                    <button className="w-1/4" onClick={() => setChartTitle("")}>
                      X
                    </button>
                  </div>
                </div>
                <div className="menu-block">
                  <h2>Background:</h2>

                  <div className="inline-flex p-4">
                    <h3 className="px-4">Color:</h3>
                    <div
                      className={`${openColorPicker !== "background" && "hidden"} color-picker-div absolute flex scale-50 justify-center`}
                    >
                      <button
                        className="absolute right-0"
                        onClick={() => {
                          setOpenColorPicker("");
                        }}
                      >
                        X
                      </button>
                      <HexColorPicker
                        className="m-16"
                        color={backgroundColor}
                        onChange={setBackgroundColor}
                      />
                    </div>
                    <div
                      className="color-box hover:cursor-pointer"
                      style={{ backgroundColor: `${backgroundColor}` }}
                      onClick={() => {
                        openColorPicker !== "background"
                          ? setOpenColorPicker("background")
                          : setOpenColorPicker("");
                      }}
                    ></div>
                  </div>
                  <div className="flex p-4">
                    <h3 className="px-4">Image:</h3>
                    <label
                      className="mr-8 h-4 w-8"
                      htmlFor="file-input-desktop"
                    >
                      <input
                        className="absolute my-[-20px] h-0 w-0 opacity-0"
                        type="file"
                        ref={inputRef}
                        id="file-input-desktop"
                        onChange={(evt) =>
                          setBackgroundImg(
                            URL.createObjectURL(
                              evt.target.files && evt.target.files[0],
                            ),
                          )
                        }
                      />
                      <button
                        className=""
                        onClick={() => inputRef.current?.click()}
                      >
                        💾
                      </button>
                    </label>
                    <button onClick={() => setBackgroundImg("")}>❌</button>
                  </div>
                </div>
                <div className="menu-block">
                  <div>
                    <h3>Font:</h3>

                    <div className="inline-flex max-w-48 px-4">
                      <h4 className="px-4">Family: </h4>
                      <select
                        className="max-w-full"
                        value={fontFamily}
                        onChange={(evt) => {
                          setFontFamily(evt.target.value);
                        }}
                      >
                        <option disabled>-- Monospaced --</option>
                        <option value={"Space Mono"}>Space Mono</option>
                        <option value={"Roboto Mono"}>Roboto Mono</option>
                        <option value={"Nanum Gothic Coding"}>
                          Nanum Gothic Coding
                        </option>
                        <option value={"Courier Prime"}>Courier Prime</option>
                        <option value={"Sometype Mono"}>Sometype Mono</option>
                        <option disabled>-- Sans-serif --</option>
                        <option value={"Inter"}>Inter</option>
                        <option value={"Rubik"}>Rubik</option>
                        <option disabled>-- Serif --</option>
                        <option value={"Arvo"}>Arvo</option>
                        <option value={"Shrikhand"}>Shrikhand</option>
                        <option value={"Arbutus"}>Arbutus</option>
                        <option disabled>-- Weird --</option>
                        <option value={"Rubik Glitch Pop"}>
                          Rubik Glitch Pop
                        </option>
                        <option value={"Danfo"}>Danfo</option>
                        <option value={"Rubik Moonrocks"}>
                          Rubik Moonrocks
                        </option>

                        <option value={"Orbitron"}>Orbitron</option>
                      </select>
                    </div>
                    <div className="inline-flex p-4">
                      <h4 className="px-4"> Body Color: </h4>
                      <div
                        className={`${openColorPicker !== "font-body" && "hidden"} color-picker-div absolute flex scale-50 justify-center`}
                      >
                        <button
                          className="absolute right-0"
                          onClick={() => {
                            setOpenColorPicker("");
                          }}
                        >
                          X
                        </button>
                        <HexColorPicker
                          className="m-16"
                          color={`${fontColorBody !== "" ? fontColorBody : invert(backgroundColor)}`}
                          onChange={setfontColorBody}
                        />
                      </div>
                      <div
                        className="color-box"
                        style={
                          fontColorBody !== ""
                            ? { backgroundColor: `${fontColorBody}` }
                            : { backgroundColor: `${invert(backgroundColor)}` }
                        }
                        onClick={() => setOpenColorPicker("font-body")}
                      ></div>
                    </div>
                  </div>
                  <div className="inline-flex p-4">
                    <h4 className="px-4"> Header Color: </h4>
                    <div
                      className={`${openColorPicker !== "font-header" && "hidden"} color-picker-div absolute flex scale-50 justify-center`}
                    >
                      <button
                        className="absolute right-0"
                        onClick={() => {
                          setOpenColorPicker("");
                        }}
                      >
                        X
                      </button>
                      <HexColorPicker
                        className="m-16"
                        color={`${fontColorHeader !== "" ? fontColorHeader : invert(backgroundColor)}`}
                        onChange={setfontColorHeader}
                      />
                    </div>
                    <div
                      className="color-box"
                      style={
                        fontColorHeader !== ""
                          ? { backgroundColor: `${fontColorHeader}` }
                          : { backgroundColor: `${invert(backgroundColor)}` }
                      }
                      onClick={() => setOpenColorPicker("font-header")}
                    ></div>
                  </div>
                </div>
                <div className="menu-block">
                  <h3>Options:</h3>
                  <div className="flex px-4">
                    <h4 className="p-4">Hide album titles:</h4>
                    <input
                      className=""
                      type="checkbox"
                      defaultChecked={hideAlbumTitles}
                      onChange={() => setHideAlbumTitles(!hideAlbumTitles)}
                    />
                  </div>
                </div>
                <button
                  className="my-8 w-full"
                  onClick={() => {
                    exportAsImage(exportRef.current, "title");
                  }}
                >
                  Export
                </button>
              </div>
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
                fontColorHeader={fontColorHeader}
                fontColorBody={fontColorBody}
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
                fontColorHeader={fontColorHeader}
                fontColorBody={fontColorBody}
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
                fontColorHeader={fontColorHeader}
                fontColorBody={fontColorBody}
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
              exportAsImage(exportRef.current, "title");
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
