import { useState } from "react";
import {
  lastFmAlbum,
  openAccordionOptions,
  openModalOptions,
} from "../models/models";
import { preventSpecialChar } from "../utils/preventSpecialChars";
import { Tooltip } from "react-tooltip";

type MenuContentProps = {
  selectedIndex: number;
  drawAlbumToCanvas: (index: number, album: lastFmAlbum) => void;
  openAccordion: openAccordionOptions;
  handleOpenAccordion: (selectedAccordion: openAccordionOptions) => void;
  openModal: openModalOptions;
};

const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

const Search = ({
  selectedIndex,
  drawAlbumToCanvas,
  openAccordion,
  handleOpenAccordion,
  openModal,
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
      const fetchAlbumData = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`,
      ).then((response) => response.json());
      const albumData: lastFmAlbum[] =
        fetchAlbumData.results.albummatches.album;
      if (albumData.length === 0) {
        throw new Error("No results found. Try again!");
      }
      setSearchResults(albumData);
      setShowLoading("");
    } catch (err: unknown) {
      setShowLoading("");
      if (err instanceof Error) {
        let errMessage = err.toString();
        if (errMessage.includes("Error: "))
          errMessage = errMessage.slice(errMessage.lastIndexOf("Error: ") + 7);
        console.log(errMessage);
        setShowErrMsg({
          location: "search-results-div",
          message: `${errMessage}`,
        });
      }
    }
  };

  return (
    <>
      <Tooltip id="search-tooltip" />
      <div
        className={`my-8 flex flex-col border-b pt-4 text-center lg:mt-0 lg:text-left`}
      >
        <h2 id="add-albums-label">Add albums:</h2>
        <div
          className={`search-input mx-auto mb-8 mt-4 inline-flex h-8 w-3/4 items-stretch border lg:my-2 lg:w-full ${openModal !== "" && "hidden"}`}
          aria-labelledby="add-albums-label"
          role="search"
          aria-hidden={`${openModal !== "" && "true"}`}
          tabIndex={openModal !== "" ? 1 : 0}
        >
          <input
            className="w-3/4"
            type="text"
            maxLength={32}
            onKeyUp={async (evt) =>
              evt.key === "Enter"
                ? (searchAlbums(searchInputValue),
                  handleOpenAccordion("search"))
                : setSearchInputValue(evt.currentTarget.value)
            }
            onKeyDown={(evt) => preventSpecialChar(evt)}
            onClick={() => handleOpenAccordion("search")}
            aria-label="Search for albums"
            aria-hidden={`${openModal !== "" && "true"}`}
            tabIndex={openModal !== "" ? 1 : 0}
          />
          <button
            className="w-1/4"
            onClick={() => {
              searchAlbums(searchInputValue), handleOpenAccordion("search");
            }}
            aria-label="Search input"
            aria-hidden={`${openModal !== "" && "true"}`}
            tabIndex={openModal !== "" ? 1 : 0}
            data-tooltip-id="search-tooltip"
            data-tooltip-content="Search"
            data-tooltip-place="top"
          >
            <img
              className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
              src="/search_icon.svg"
            />
          </button>
        </div>
        {/* desktop search results */}
        <div className="desktop-search-results-div-wrapper mt-4 h-[80px] min-w-[90vw] max-w-[90vw] overflow-scroll border-t text-center sm:min-w-[576px] sm:max-w-[576px] lg:mt-0 lg:h-auto lg:min-w-0 lg:border-t-0 lg:pt-4">
          <div
            className={`search-results-div menu-accordion lg:max-h-[250[x] inline-flex h-[250px] max-h-[70px] overflow-scroll overflow-y-hidden overflow-x-scroll text-center lg:block lg:h-[250px] lg:border-t ${openAccordion === "search" && "open"}`}
            id="search-results-div"
            aria-expanded={openAccordion === "search" ? true : false}
          >
            {showLoading === "search-results-div" ? (
              <div className="flex h-full flex-col justify-center align-middle">
                <div className="dot-loader mx-auto hidden lg:block"></div>
                <div className="circle-loader-sm mx-auto block lg:hidden"></div>
              </div>
            ) : (
              <div
                className="flex h-full w-full lg:block"
                aria-label="Search results box"
              >
                {searchResults ? (
                  searchResults.map((a: lastFmAlbum, i: number) => {
                    if (a.image[1]["#text"]) {
                      return (
                        <div
                          className="album-card block w-[65px] lg:inline-flex lg:w-full"
                          onClick={() => {
                            drawAlbumToCanvas(selectedIndex, a);
                          }}
                          aria-label={`Add album ${a.name} by ${a.artist}. Currently adding to the index:${selectedIndex + 1}`}
                          tabIndex={0}
                          key={i}
                        >
                          <div className="justify-start">
                            <img
                              className="hover:cursor-pointer"
                              src={`${a.image[1]["#text"]}`}
                            />
                          </div>
                          <div className="ml-2 hidden content-center overflow-hidden lg:block">
                            <span className="font-bold">
                              {" "}
                              {a.name!.length + a.artist!.length > 50
                                ? `${a.name?.match(/^.{19}\w*/)} (...)`
                                : a.name}{" "}
                            </span>
                            by
                            <span className="font-bold"> {a.artist}</span>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : showErrMsg.location !== "search-results-div" ? (
                  <span className="relative top-[33%] inline-block px-8 pb-4 text-xs lg:top-[40%]">
                    Data provided thanks to{" "}
                    <img
                      className="mt-[2px] inline max-w-[50px] align-top"
                      src="/lastfm_logo.svg"
                    />{" "}
                    database api
                  </span>
                ) : (
                  <span className="relative top-[30%] inline-block px-8 text-xs lg:top-[40%]">
                    {showErrMsg.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
