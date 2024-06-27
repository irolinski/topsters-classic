import "./App.scss";
import { useEffect, useRef, useState } from "react";
import { exportAsImage } from "./utils/downloadImage";

const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

function App() {
  // table modes

  //collage 4x4 format takes 4x4
  const [tableMode, setTableMode] = useState("collage");

  //top 40 format takes 4/2x8/3x10

  //top100 format takes 2x5/3x10/4x10

  //maybe I should do also collage 8x8??

  // last.fm api search feature

  const [searchInputValue, setSearchInputValue] = useState<string>("hi");
  const [searchResults, setSearchResults] = useState<any>(null);

  const [collage, setCollage] = useState([
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
    {
      name: "Mahler: Symphony No. 2",
      artist: "Gustav Mahler",
      image: [
        {
          text: "https://lastfm.freetls.fastly.net/i/u/34s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "small",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/64s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "medium",
        },
        {
          text: "https://lastfm.freetls.fastly.net/i/u/174s/e89aea1eebf0480a073fa63004dcc804.png",
          size: "large",
        },
      ],
      streamable: "0",
      url: "https://www.last.fm/music/Gustav+Mahler/Mahler:+Symphony+No.+2",
    },
  ]);

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
  console.log("selected index:" + selectedIndex);

  const [refresh, setRefresh] = useState(false);

  const drawAlbumToCanvas = (index: number, album: any) => {
    let updatedArr = collage; // or other table type - do it later
    updatedArr[index] = album;
    setCollage(updatedArr); //or other table type

    // this forces rerender in a gentle way I don't really know why but it works
    setRefresh(true);
    setRefresh(!refresh);
  };

  //export image
  const exportRef: any = useRef();

  return (
    <main className="flex flex-wrap">
      <div className="chart-wrapper w-4/5">
        <div className="html2canvas-container w-full" ref={exportRef}>
          <div className="w-3/5">
          <h2 className="font-bold underline -translate-y-4">Chart</h2>
          <div className="image-div flex max-h-full max-w-2/3 flex-wrap m-auto">
            {tableMode === "collage" &&
              collage.map((a, i) => {
                return (
                  <div
                    className={`${
                      i === selectedIndex && "selected-index"
                    } collage w-[64px] h-[64px] m-[3px]`}
                    key={i}
                    onClick={() => {
                      setSelectedIndex(i);
                    }}
                  >
                    {/*@ts-ignore */}
                    {a.image[1]["#text"] ? (
                      <img src={`${a.image[1]["#text"]}`} />
                    ) : (
                      <img src={`${a.image[1]["text"]}`} />
                    )}

                    {/* remmber to change it to "#text" later */}
                  </div>
                );
              })}
            </div>
            </div>

          <div className="w-2/5 max-h-full">
            <div className="collage leading-none " >
              {tableMode === "collage" &&
                collage.map((a, i) => {
                  return (
                    <>
                      <span className="text-xs inline-block m-2">
                        {a.artist} - {a.name}{" "}
                      </span>
                      {i > 0 && i % 4 === 0 && (
                        <div>
                          {" "}
                          <br />{" "}
                        </div>
                      )}
                  </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* //better make it into a sidebar */}
      <div className="menu-wrapper w-1/5">
        <h2>Search for your albums:</h2>
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
      </div>
    </main>
  );
}

export default App;
