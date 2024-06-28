import "./App.scss";
import { useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";
import Collage from "./Components/Charts/Collage";
import { collageEmpty } from "./assets/emptyCharts";

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
  // set table mode - (collage || top40 || top100)
  const [tableMode, setTableMode] = useState("collage");

  // last.fm api search feature
  const [searchInputValue, setSearchInputValue] = useState<string>("hi");
  const [searchResults, setSearchResults] = useState<any>(null);

  const [collageData, setCollageData] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(collageEmpty);

  const searchAlbums = async (albumTitle: string) => {
    let albumData: any = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`
    ).then((response) => response.json());

    albumData = albumData.results.albummatches.album;
    console.log(albumData);
    setSearchResults(albumData);
  };

  // insert image onto canvas

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const changeIndex: any = (i: number) => {
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
  };

  //export image
  const exportRef: any = useRef();

  return (
    <main className="flex flex-wrap">
      <section className="chart-wrapper w-4/5">
        {/* collage */}
        {tableMode === "collage" && (
          <Collage
            exportRef={exportRef}
            collageData={collageData}
            selectedIndex={selectedIndex}
            changeIndex={changeIndex}
            chartDirty={chartDirty}
          />
        )}
      </section>
      {/* // MENU */}
      <section className="menu-wrapper w-1/5">
        <h2>Choose your chart:</h2>
        <select onChange={(evt) => setTableMode(evt.target.value)}>
          <option value="collage">Collage</option>
          <option value="top40">Top 40</option>
          <option value="top100">Top 100</option>
        </select>
        <h2>Search for your albums:</h2>
        <div className="search-input">
          <input
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
          <button
            onClick={() => {
              exportAsImage(exportRef.current, "title");
            }}
          >
            Export
          </button>
        </div>
        <div id="search-results-div">
          {searchResults &&
            searchResults.map((a: any) => {
              return (
                <div
                  className="album-card inline-flex m-4 w-full"
                  onClick={() => {
                    console.log(a);
                    drawAlbumToCanvas(selectedIndex, a);
                  }}
                >
                  <div className="justify-start">
                    <img className="w-16" src={`${a.image[1]["#text"]}`} />
                  </div>
                  <div className="m-4">
                    <span className="font-bold"> {a.name} </span>by
                    <span className="font-bold"> {a.artist}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default App;
