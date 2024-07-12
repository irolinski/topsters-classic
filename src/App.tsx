import "./App.scss";
import { MutableRefObject, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";
import Collage from "./Components/Charts/Collage";
import { collageEmpty, top50Empty, top100Empty } from "./assets/emptyCharts";
import { HexColorPicker } from "react-colorful";
import ClassicTop50 from "./Components/Charts/ClassicTop50";
import Top100 from "./Components/Charts/Top100";
import invert from "invert-color";
import Draggable from "react-draggable";

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
  //menu navigation
  const [mobileMenuIsOpened, setMobileMenuIsOpened] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const closeAllWindows = () => {
    setOpenColorPicker("");
    setOpenBackgroundPositionMenu(false);
    setOpenAccordion("");
  };

  // error handling

  const [showErrMsg, setShowErrMsg] = useState<{
    location: string;
    message: string;
  }>({
    location: "",
    message: "Something has gone wrong. Please try again later.",
  });

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

  // set background image
  // (sizes have to be defined as variables for they are crucial to get the offset)
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const [backgroundImgPosition, setBackgroundImgPosition] = useState({
    x: 0,
    y: 0,
  });

  // auto/cover/contain
  const [backgroundImgMode, setBackgroundImgMode] = useState<string>("cover");
  const [openBackgroundPositionMenu, setOpenBackgroundPositionMenu] =
    useState<boolean>(false);

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

  //set colors
  const [fontColorBody, setfontColorBody] = useState<string>("");
  const [fontColorHeader, setfontColorHeader] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [openColorPicker, setOpenColorPicker] = useState<string>("");

  // enable/disable shadows
  const [enableShadows, setEnableShadows] = useState<boolean>(true);

  // last.fm api search feature
  const [searchInputValue, setSearchInputValue] = useState<string>("hi");
  const [showLoading, setShowLoading] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<lastFmAlbum> | null>(
    null,
  );

  const searchAlbums = async (albumTitle: string) => {
    setShowLoading("search-results-div");
    try {
      setSearchResults(null);
      let albumData: any = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`,
      ).then((response) => response.json());
      albumData = albumData.results.albummatches.album;
      if (albumData.length === 0) {
        throw new Error("No results found. Try again!");
      }
      setSearchResults(albumData);
      setShowLoading("");
    } catch (err: any) {
      setShowLoading("");
      let errMessage = err.toString();
      if (errMessage.includes("Error: "))
        errMessage = errMessage.slice(errMessage.lastIndexOf("Error: ") + 7);
      console.log(errMessage);
      setShowErrMsg({
        location: "search-results-div",
        message: `${errMessage}`,
      });
    }
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
  const [exportOptions, setExportOptions] = useState<{
    format: string;
    quality: number;
  }>({
    format: "image/jpeg",
    quality: 0.5,
  });

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
          <div className="relative left-0 lg:min-w-[390px] lg:max-w-[390px]">
            <section className="menu-wrapper desktop relative hidden flex-col px-16 lg:flex">
              <h1 className="mx-auto p-8 text-4xl">Topsters</h1>
              <div className="menu-content">
                <div className="inline-flex pb-4">
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
                <div className="mb-8 border-b pt-4">
                  <h2>Add albums:</h2>
                  <div className="search-input my-2 inline-flex h-8 items-stretch border">
                    <input
                      className="w-3/4"
                      type="text"
                      onKeyUp={async (evt) =>
                        evt.key === "Enter"
                          ? (searchAlbums(searchInputValue),
                            setOpenAccordion("search"))
                          : setSearchInputValue(evt.currentTarget.value)
                      }
                      onClick={() => setOpenAccordion("search")}
                    />
                    <button
                      className="w-1/4"
                      onClick={() => {
                        searchAlbums(searchInputValue),
                          setOpenAccordion("search");
                      }}
                    >
                      <img
                        className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                        src="/search_icon.svg"
                      />
                    </button>
                  </div>
                  <div className="pt-4">
                    <div
                      className={`search-results-div menu-accordion h-[250px] max-h-[250px] overflow-scroll text-center ${openAccordion === "search" && "open"}`}
                      id="search-results-div"
                    >
                      {showLoading === "search-results-div" ? (
                        <div className="flex h-full flex-col justify-center align-middle">
                          <div className="dot-loader mx-auto"></div>
                        </div>
                      ) : (
                        <>
                          {searchResults ? (
                            searchResults.map((a: any) => {
                              return (
                                <div
                                  className="album-card inline-flex w-full"
                                  onClick={() => {
                                    drawAlbumToCanvas(selectedIndex, a);
                                  }}
                                >
                                  <div className="justify-start">
                                    <img src={`${a.image[1]["#text"]}`} />
                                  </div>
                                  <div className="m-4 overflow-hidden">
                                    <span className="font-bold">
                                      {" "}
                                      {a.name}{" "}
                                    </span>
                                    by
                                    <span className="font-bold">
                                      {" "}
                                      {a.artist}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          ) : showErrMsg.location !== "search-results-div" ? (
                            <span className="relative top-[40%] inline-block px-8">
                              Data provided thanks to{" "}
                              <img
                                className="mt-[2px] inline max-w-[50px] align-top"
                                src="/lastfm_logo.svg"
                              />{" "}
                              database api
                            </span>
                          ) : (
                            <span className="relative top-[40%] inline-block px-8">
                              {showErrMsg.message}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
                <div className="menu-block">
                  <div
                    className="open-accordion-btn inline-flex"
                    onClick={() =>
                      openAccordion === "titles"
                        ? closeAllWindows()
                        : (closeAllWindows(), setOpenAccordion("titles"))
                    }
                  >
                    <h3 className="w-full font-bold">Title</h3>{" "}
                    {openAccordion === "titles" ? (
                      <button className="no-style mx-4">－</button>
                    ) : (
                      <button className="no-style mx-4">＋</button>
                    )}{" "}
                  </div>{" "}
                  <div
                    className={`menu-accordion ${openAccordion === "titles" && "open"}`}
                  >
                    <div className="p-4">
                      <h3 className="px-4">Chart title:</h3>
                      <div className="chart-title-input my-2 inline-flex h-8 items-stretch border">
                        <input
                          className="w-3/4"
                          type="text"
                          value={chartTitle}
                          onChange={async (evt) =>
                            setChartTitle(evt.currentTarget.value)
                          }
                        />
                        <button
                          className="w-1/4"
                          onClick={() => setChartTitle("")}
                        >
                          <img
                            className="mx-auto max-h-[15px] min-w-[15px] max-w-[15px] -translate-y-[2.5px]"
                            src="/close_icon.svg"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-block">
                  <div
                    className="open-accordion-btn inline-flex"
                    onClick={() =>
                      openAccordion === "background"
                        ? closeAllWindows()
                        : (closeAllWindows(), setOpenAccordion("background"))
                    }
                  >
                    <h3 className="w-full font-bold">Background</h3>{" "}
                    {openAccordion === "background" ? (
                      <button className="no-style mx-4">－</button>
                    ) : (
                      <button className="no-style mx-4">＋</button>
                    )}
                  </div>
                  <div
                    className={`menu-accordion ${openAccordion === "background" && "open"}`}
                  >
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
                          className="z-10 m-16"
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
                      {backgroundImg === "" ? (
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
                            className="h-[35px] w-[60px]"
                            onClick={() => inputRef.current?.click()}
                          >
                            <img
                              className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                              src="/upload_icon.svg"
                            />
                          </button>
                        </label>
                      ) : (
                        <div className="inline-flex w-full">
                          <button
                            className="mr-2 h-[35px] w-[60px]"
                            name="Remove image"
                            onClick={() => setBackgroundImg("")}
                          >
                            <img
                              className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                              src="/trash_icon.svg"
                            />
                          </button>
                          <button
                            className="h-[35px] w-[60px]"
                            onClick={() =>
                              setOpenBackgroundPositionMenu(
                                !openBackgroundPositionMenu,
                              )
                            }
                          >
                            <img
                              className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                              src="/move_icon.svg"
                            />
                          </button>
                          <div
                            className={`background-position-menu ${!openBackgroundPositionMenu && "hidden"} color-picker-div absolute flex flex-col justify-center`}
                          >
                            <button
                              className="absolute right-0 top-0"
                              onClick={() => {
                                setOpenBackgroundPositionMenu(false);
                              }}
                            >
                              X
                            </button>
                            <div
                              className="background-position-field relative z-20 mx-16 mb-8 mt-16 h-[190px] w-[190px] rounded-md"
                              style={{ backgroundColor: "grey" }}
                            >
                              <Draggable
                                defaultPosition={{
                                  x: backgroundPositionMenu.centerDot,
                                  y: backgroundPositionMenu.centerDot,
                                }}
                                // it should be 85 (50% off of both axis) but for some reason 80 actually centers it
                                handle=".handle"
                                bounds="parent"
                                onDrag={(_evt, dragElement) => {
                                  handleBackgroundPositionChange(
                                    dragElement.x,
                                    dragElement.y,
                                  );
                                }}
                              >
                                <div
                                  className="background-position-dot handle p2 h-[30px] w-[30px] rounded-full"
                                  style={{
                                    backgroundColor: "grey",
                                    cursor: "move",
                                  }}
                                ></div>
                              </Draggable>
                            </div>
                            <h4 className="px-4 pb-4">Image position:</h4>

                            <div className="mb-8 inline-flex justify-center">
                              <button
                                className={`${backgroundImgMode === "auto" && "active"}`}
                                onClick={() => setBackgroundImgMode("auto")}
                              >
                                Auto
                              </button>
                              <button
                                className={`${backgroundImgMode === "contain" && "active"}`}
                                onClick={() => setBackgroundImgMode("contain")}
                              >
                                Contain
                              </button>
                              <button
                                className={`${backgroundImgMode === "cover" && "active"}`}
                                onClick={() => setBackgroundImgMode("cover")}
                              >
                                Cover
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="menu-block">
                  <div>
                    <div
                      className="open-accordion-btn inline-flex w-full"
                      onClick={() =>
                        openAccordion === "font"
                          ? closeAllWindows()
                          : (closeAllWindows(), setOpenAccordion("font"))
                      }
                    >
                      <h3 className="font-bold">Font</h3>{" "}
                      {openAccordion === "font" ? (
                        <button className="no-style mx-4">－</button>
                      ) : (
                        <button className="no-style mx-4">＋</button>
                      )}{" "}
                    </div>{" "}
                    <div
                      className={`menu-accordion ${openAccordion === "font" && "open"}`}
                    >
                      <div className="px-4">
                        <h4 className="block w-full p-4">Family: </h4>
                        <select
                          className="ml-8 max-h-12 w-[180px] max-w-full p-1"
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
                        <h4 className="px-4"> Header Color: </h4>
                        <div
                          className={`${openColorPicker !== "font-header" && "hidden"} color-picker-div absolute flex scale-50 flex-col justify-center`}
                        >
                          <div>
                            <button
                              className="absolute right-0"
                              onClick={() => {
                                setOpenColorPicker("");
                              }}
                            >
                              X
                            </button>
                            <HexColorPicker
                              className="z-10 mx-16 mt-16"
                              color={`${fontColorHeader !== "" ? fontColorHeader : invert(backgroundColor)}`}
                              onChange={setfontColorHeader}
                            />
                          </div>
                          <button
                            className="mx-auto my-6 w-1/2"
                            onClick={() => setfontColorHeader("")}
                          >
                            Reset
                          </button>
                        </div>
                        <div
                          className="color-box"
                          style={
                            fontColorHeader !== ""
                              ? { backgroundColor: `${fontColorHeader}` }
                              : {
                                  backgroundColor: `${invert(backgroundColor)}`,
                                }
                          }
                          onClick={() => setOpenColorPicker("font-header")}
                        ></div>
                      </div>
                      <div className="inline-flex p-4">
                        <h4 className="px-4"> Body Color: </h4>
                        <div
                          className={`${openColorPicker !== "font-body" && "hidden"} color-picker-div absolute flex scale-50 flex-col justify-center`}
                        >
                          <div>
                            <button
                              className="absolute right-0"
                              onClick={() => {
                                setOpenColorPicker("");
                              }}
                            >
                              X
                            </button>
                            <HexColorPicker
                              className="z-10 mx-16 mt-16"
                              color={`${fontColorBody !== "" ? fontColorBody : invert(backgroundColor)}`}
                              onChange={setfontColorBody}
                            />
                          </div>
                          <button
                            className="mx-auto my-6 w-1/2"
                            onClick={() => setfontColorBody("")}
                          >
                            Reset
                          </button>
                        </div>
                        <div
                          className="color-box"
                          style={
                            fontColorBody !== ""
                              ? { backgroundColor: `${fontColorBody}` }
                              : {
                                  backgroundColor: `${invert(backgroundColor)}`,
                                }
                          }
                          onClick={() => setOpenColorPicker("font-body")}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="menu-block">
                  <div>
                    <div
                      className="open-accordion-btn inline-flex w-full"
                      onClick={() =>
                        openAccordion === "options"
                          ? closeAllWindows()
                          : (closeAllWindows(), setOpenAccordion("options"))
                      }
                    >
                      <h3 className="font-bold">Options</h3>{" "}
                      {openAccordion === "options" ? (
                        <button className="no-style mx-4">－</button>
                      ) : (
                        <button className="no-style mx-4">＋</button>
                      )}{" "}
                    </div>{" "}
                    <div
                      className={`menu-accordion ${openAccordion === "options" && "open"}`}
                    >
                      <div className="flex px-4">
                        <h4 className="p-4">Hide album titles:</h4>
                        <input
                          className=""
                          type="checkbox"
                          defaultChecked={hideAlbumTitles}
                          onChange={() => setHideAlbumTitles(!hideAlbumTitles)}
                        />
                      </div>
                      <div className="flex px-4 pb-[8px]">
                        <h4 className="p-4">Enable shadows:</h4>
                        <input
                          className=""
                          type="checkbox"
                          defaultChecked={enableShadows}
                          onChange={() => setEnableShadows(!enableShadows)}
                        />
                      </div>
                      <div className="export-options-div px-4 pt-[8px]">
                        <h4 className="block w-full p-4">Export quality: </h4>
                        <select
                          className="ml-8 max-h-12 w-[180px] max-w-full p-1"
                          value={JSON.stringify(exportOptions)}
                          onChange={(evt) => {
                            setExportOptions(JSON.parse(evt.target.value));
                          }}
                        >
                          <option
                            value={JSON.stringify({
                              format: "image/png",
                              quality: 1.0,
                            })}
                          >
                            .png, High
                          </option>
                          <option
                            value={JSON.stringify({
                              format: "image/jpeg",
                              quality: 1.0,
                            })}
                          >
                            .jpeg, High
                          </option>
                          <option
                            value={JSON.stringify({
                              format: "image/jpeg",
                              quality: 0.5,
                            })}
                          >
                            .jpeg, Medium
                          </option>
                          <option
                            value={JSON.stringify({
                              format: "image/jpeg",
                              quality: 0.1,
                            })}
                          >
                            .jpeg, Low
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="export-button my-8 w-full"
                  onClick={() => {
                    exportAsImage(exportRef.current, "title", exportOptions);
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
