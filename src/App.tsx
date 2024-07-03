import "./App.scss";
import { MutableRefObject, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";
import Collage from "./Components/Charts/Collage";
import { collageEmpty } from "./assets/emptyCharts";
import { HexColorPicker } from "react-colorful";

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
  const [tableMode, setTableMode] = useState("collage");

  // collage options
  const [collageRowNum, setCollageRowNum] = useState<number>(6);
  const [collageColNum, setCollageColNum] = useState<number>(4);
  // const collageNumAll = collageRowNum * collageColNum
  // console.log(collageNumAll);

  // let collageTemplate = collageEmpty.slice(0, collageNumAll);
    
  const [collageData, setCollageData] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(collageEmpty);


  //set chart title
  const [chartTitle, setChartTitle] = useState<string>("");

  //customize chart
  const [hideAlbumTitles, setHideAlbumTitles] = useState<boolean>(false);

  // set table background color
  const [backgroundColor, setBackgroundColor] = useState<string>("black");

  // set table background image
  const [backgroundImg, setBackgroundImg] = useState<string>("");

  // last.fm api search feature
  const [searchInputValue, setSearchInputValue] = useState<string>("hi");
  const [searchResults, setSearchResults] = useState<any>(null);


  const searchAlbums = async (albumTitle: string) => {
    let albumData: any = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`,
    ).then((response) => response.json());

    albumData = albumData.results.albummatches.album;
    console.log(albumData);
    setSearchResults(albumData);
  };

  // insert image onto canvas
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const changeIndex = (i: number) => {
    setSelectedIndex(i);
  };
  const [chartDirty, setChartDirty] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(false);

  const drawAlbumToCanvas = (index: number, album: any) => {
    let updatedArr = collageData; // or other table type - do it later
    updatedArr[index] = album;
    setCollageData(updatedArr); //or other table type

    // this forces rerender in a gentle way I don't really know why but it works
    setRefresh(true);
    setRefresh(!refresh);
    setChartDirty(true);
    selectedIndex < collageEmpty.length - 1
      ? setSelectedIndex(selectedIndex + 1)
      : setSelectedIndex(0);
  };

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
            <h2>Choose your chart:</h2>
            <select onChange={(evt) => setTableMode(evt.target.value)}>
              <option value="collage">Collage</option>
              <option value="top40">Top 40</option>
              <option value="top100">Top 100</option>
            </select>
            <h3>Collage settings:</h3>
            <h4>Rows:</h4>
            <select value={collageRowNum} onChange={(evt) => setCollageRowNum(Number(evt.target.value))}>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
            <h4>Columns:</h4>
            <select value={collageColNum} onChange={(evt) => setCollageColNum(Number(evt.target.value))}>
              <option value={4}>4</option>
              <option value={5}>5</option>Number(
              <option value={6}>6</option>
            </select>
            <h3>Table title:</h3>
            <input
              className="border"
              type="text"
              onKeyUp={async (evt) => setChartTitle(evt.currentTarget.value)}
            />
            <h2>Choose your background:</h2>
            <div>
              <h3>Color:</h3>
              <HexColorPicker
                color={backgroundColor}
                onChange={setBackgroundColor}
              />
            </div>
            <div>
              <h3>Image:</h3>
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
        <div className="mobile-menu flex w-[75vw] max-w-[75vw] md:w-1/2 flex-col justify-center pt-24 lg:hidden">
          <div className="search-input w-full border">
            <input
              className="w-[75%] "
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
                  className="p-2 w-[125px] hover:opacity-50"
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
          <div className="relative left-0 lg:w-[25vw]">
            <section className="menu-wrapper desktop relative hidden flex-col px-16 lg:block">
              <h2>Choose your chart:</h2>
              <select onChange={(evt) => setTableMode(evt.target.value)}>
                <option value="collage">Collage</option>
                <option value="top40">Top 40</option>
                <option value="top100">Top 100</option>
              </select>
              <h3>Collage settings:</h3>
            <h4>Rows:</h4>
            <select value={collageRowNum} onChange={(evt) => setCollageRowNum(Number(evt.target.value))}>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
            </select>
            <h4>Columns:</h4>
            <select value={collageColNum} onChange={(evt) => setCollageColNum(Number(evt.target.value))}>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
              <h2>Search for your albums:</h2>
              <div className="search-input">
                <input
                  className="border"
                  type="text"
                  onKeyUp={async (evt) =>
                    evt.key === "Enter"
                      ? searchAlbums(searchInputValue)
                      : setSearchInputValue(evt.currentTarget.value)
                  }
                />
                <button
                  onClick={() => {
                    searchAlbums(searchInputValue);
                  }}
                >
                  Search
                </button>
              </div>
              <div id="search-results-div">
                {searchResults &&
                  searchResults.map((a: any) => {
                    return (
                      <div
                        className="album-card m-4 inline-flex w-full"
                        onClick={() => {
                          console.log(a);
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
              <h3>Table title:</h3>
              <input
                className="border"
                type="text"
                onKeyUp={async (evt) => setChartTitle(evt.currentTarget.value)}
              />
              <h2>Choose your background:</h2>
              <div>
                <h3>Color:</h3>
                <HexColorPicker
                  color={backgroundColor}
                  onChange={setBackgroundColor}
                />
              </div>
              <div>
                <h3>Image:</h3>
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
              <h3>Hide album titles:</h3>
              <input
                className="w-full"
                type="checkbox"
                defaultChecked={hideAlbumTitles}
                onChange={() => setHideAlbumTitles(!hideAlbumTitles)}
              />
              <button
                className="my-8 w-full"
                onClick={() => {
                  exportAsImage(exportRef.current, "title");
                }}
              >
                Export
              </button>
            </section>
          </div>

          {/* CANVAS SECTION */}
          <div className="lg:w-[75vw]">
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
