import { useState } from "react";
import { lastFmAlbum } from "../../../models/models";

type MenuContentProps = {
  selectedIndex: number;
  drawAlbumToCanvas: (index: number, album: lastFmAlbum) => void;
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
};

const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

const Search = ({
  selectedIndex,
  drawAlbumToCanvas,
  openAccordion,
  handleOpenAccordion,
}: MenuContentProps) => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [showLoading, setShowLoading] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<lastFmAlbum> | null>(
    null,
  );

  const [showErrMsg, setShowErrMsg] = useState<{
    location: string;
    message: string;
  }>({
    location: "",
    message: "Something has gone wrong. Please try again later.",
  });

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

  return (
    <>
      <div className="mb-8 border-b pt-4">
        <h2>Add albums:</h2>
        <div className="search-input my-2 inline-flex h-8 items-stretch border">
          <input
            className="w-3/4"
            type="text"
            onKeyUp={async (evt) =>
              evt.key === "Enter"
                ? (searchAlbums(searchInputValue),
                  handleOpenAccordion("search"))
                : setSearchInputValue(evt.currentTarget.value)
            }
            onClick={() => handleOpenAccordion("search")}
          />
          <button
            className="w-1/4"
            onClick={() => {
              searchAlbums(searchInputValue), handleOpenAccordion("search");
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
                    if (a.image[1]["#text"]) {
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
                            <span className="font-bold"> {a.name} </span>
                            by
                            <span className="font-bold"> {a.artist}</span>
                          </div>
                        </div>
                      );
                    }
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
    </>
  );
};

export default Search;
