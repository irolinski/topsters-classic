import "./App.scss";
import { useEffect, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";

const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

const searchAlbums = async (albumTitle: string) => {
  let albumData: any = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`
  ).then((response) => response.json());

  albumData = albumData.results.albummatches.album;
  console.log(albumData);
};

function App() {
  const [searchInputValue, setSearchInputValue] = useState<string>("hi");

  // useEffect(() => {
  //   searchAlbums("believe");
  // }, []);

  const exportRef: any = useRef();

  return (
    <main className="flex flex-wrap">
      <div className="chart-wrapper w-4/5">
        <h2 className="underline">Chart</h2>
        <div
          className="html2canvas-container"
          id="image-div"
          onClick={() => {
            exportAsImage(exportRef.current, "title");
          }}
          ref={exportRef}
        >
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/71DUFxaoLGL._UF1000,1000_QL80_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/810vKrPt0aL._UF1000,1000_QL80_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/71VJAU9IPSL._UF1000,1000_QL80_.jpg"
          />

          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/71ngws--3bL._AC_UF894,1000_QL80_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/61H5nAt9wdL.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/81G8m4fTYyL._AC_SL1500_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/611ybkIvKnL._AC_SL1000_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/71WFR+ip0EL._AC_SL1500_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/810NIKoY-vL._AC_SL1400_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/71Zk0rQnwcL._AC_SL1200_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/6137pVL5iJS._AC_SL1200_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/91dTLHSQdkL._AC_SL1400_.jpg"
          />
          <img
            className="album-cover "
            src="https://m.media-amazon.com/images/I/71UzjXRiGHL._AC_SL1500_.jpg"
          />
          <p>This is some bottom some some some bottom</p>
        </div>
      </div>
      <div className="menu-wrapper w-1/5">
        <h2>This is our menu</h2>
        <div className="search-input-div bg-gray">
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
        </div>
      </div>
    </main>
  );
}

export default App;
