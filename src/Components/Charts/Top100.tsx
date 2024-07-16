import { useEffect, useState } from "react";
import invert from "invert-color";
import { lastFmAlbum } from "../../models/models";

type Top100Props = {
  exportRef: any;
  top100Data: lastFmAlbum[] | Record<string, never>[];
  selectedIndex: number;
  changeIndex: any;
  chartDirty: boolean;
  chartTitle: string;
  hideAlbumTitles: boolean;
  backgroundColor: string;
  backgroundImg: string;
  backgroundImgPosition: { x: number; y: number };
  backgroundImgMode: string;
  fontColorHeader: string;
  fontColorBody: string;
  enableShadows: boolean;
  loadingImage: number;
  handleImageLoaded: () => void;
};

type windowValueTypes = {
  width: number | undefined;
  height: number | undefined;
};

const Top100 = ({
  exportRef,
  top100Data,
  selectedIndex,
  changeIndex,
  chartDirty,
  chartTitle,
  hideAlbumTitles,
  backgroundColor,
  backgroundImg,
  backgroundImgPosition,
  backgroundImgMode,
  fontColorHeader,
  fontColorBody,
  enableShadows,
  loadingImage,
  handleImageLoaded,
}: Top100Props) => {
  //auto scale
  const [canvasScaleDivisior, setCanvasScaleDivisior] = useState<number>(2000);
  const [windowSize, setWindowSize] = useState<windowValueTypes>({
    width: window.innerHeight,
    height: window.innerWidth,
  });

  function useWindowSize() {
    useEffect(() => {
      function handleResize() {
        if (window.visualViewport) {
          setWindowSize({
            width: window.visualViewport.width ?? window.innerWidth,
            height: window.visualViewport.width ?? window.innerHeight,
          });
          if (window.visualViewport!.width < 640) setCanvasScaleDivisior(450);
          if (window.visualViewport!.width >= 1048)
            setCanvasScaleDivisior(2300);
          else setCanvasScaleDivisior(1400);
        }
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size: windowValueTypes = useWindowSize();
  const canvasScaleValue: number = size.width! / canvasScaleDivisior; //original width + sth for there to be a margin
  return (
    <div className={`max-h-0 ${chartTitle && "-translate-y-[30px] lg:-translate-y-0"}`}>
      {/* UI canvas */}
      <div
        className={`top100-container top100-ui mt-[-320px] flex w-full flex-col content-center object-scale-down px-[40px] xxs:mt-[-280px] xs:mt-[-230px] sm:mt-[-125px] md:mt-[-40px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"} ${enableShadows && "enable-shadows"}`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          backgroundPosition: `${backgroundImgPosition.x}% ${backgroundImgPosition.y}%`,
          backgroundSize: `${backgroundImgMode}`,
          transform: `scale(${canvasScaleValue})`,
        }}
      >
        {chartTitle && (
          <div className={`chart-title bold w-full py-12 text-center text-3xl`}>
            <span
              style={
                fontColorHeader !== ""
                  ? { color: `${fontColorHeader}` }
                  : {
                      color: `${invert(`${backgroundColor}`)}`,
                    }
              }
            >
              {chartTitle}
            </span>
          </div>
        )}
        {/* images container */}
        <div className="top-100-wrapper flex">
          <div className={`${hideAlbumTitles ? "w-full" : "w-2/3"}`}>
            <div className={`image-div flex flex-col`}>
              <div className="top-4 my-[12px]">
                <h2
                  className="top100-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Top 10
                </h2>
                <div className="flex flex-wrap">
                  {top100Data.slice(0, 10).map((a, i) => {
                    return (
                      <div
                        className={`table-box table-box-lg flex h-[120px] w-[120px] flex-col justify-center ${i === selectedIndex && "selected-index"} m-[2px]`}
                        key={i}
                        onClick={() => {
                          changeIndex(i);
                        }}
                      >
                        <>
                          {a.hasOwnProperty("image") ? (
                            /*@ts-ignore */
                            a.image[1]["#text"] && (
                              <>
                                <div
                                  className={`mx-auto ${i === loadingImage ? "block" : "hidden"} `}
                                >
                                  <div className="circle-loader-lg mx-auto"></div>
                                </div>
                                <img
                                  className={`w-full ${i === loadingImage && "max-w-0"} `}
                                  /*@ts-ignore */
                                  src={`${a.image[2]["#text"]}`}
                                  onLoad={() => handleImageLoaded()}
                                />
                              </>
                            )
                          ) : (
                            <div className="h-full w-full bg-gray"> </div>
                          )}
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="second-tier-classics my-[12px] w-full">
                <h2
                  className="top100-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Second-tier classics
                </h2>
                <div className="flex flex-wrap">
                  {top100Data.slice(10, 40).map((a, i) => {
                    return (
                      <div
                        className={`table-box flex h-[62px] w-[62px] flex-col justify-center p-[1px] ${i + 10 === selectedIndex && "selected-index"}`}
                        key={i + 10}
                        onClick={() => {
                          changeIndex(i + 10);
                        }}
                      >
                        <>
                          {a.hasOwnProperty("image") ? (
                            /*@ts-ignore */
                            a.image[1]["#text"] && (
                              <>
                                <div
                                  className={`mx-auto ${i + 10 === loadingImage ? "block" : "hidden"} `}
                                >
                                  <div className="circle-loader-sm mx-auto"></div>
                                </div>
                                <img
                                  className={`w-full ${i + 10 === loadingImage && "max-w-0"}`}
                                  /*@ts-ignore */
                                  src={`${a.image[2]["#text"]}`}
                                  onLoad={() => handleImageLoaded()}
                                />
                              </>
                            )
                          ) : (
                            <div className="h-full w-full bg-gray"> </div>
                          )}
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="other-favorites my-[12px] w-full">
                <h2
                  className="top100-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Other favorites
                </h2>
                <div className="flex flex-wrap">
                  {top100Data.slice(40).map((a, i) => {
                    return (
                      <div
                        className={`table-box flex h-[62px] w-[62px] flex-col justify-center p-[1px] ${i + 40 === selectedIndex && "selected-index"}`}
                        key={i + 20}
                        onClick={() => {
                          changeIndex(i + 40);
                        }}
                      >
                        <>
                          {a.hasOwnProperty("image") ? (
                            /*@ts-ignore */
                            a.image[1]["#text"] && (
                              <>
                                <div
                                  className={`mx-auto ${i + 40 === loadingImage ? "block" : "hidden"} `}
                                >
                                  <div className="circle-loader-sm mx-auto"></div>
                                </div>
                                <img
                                  className={`w-full ${i + 40 === loadingImage && "max-w-[0px]"}`}
                                  /*@ts-ignore */
                                  src={`${a.image[2]["#text"]}`}
                                  onLoad={() => handleImageLoaded()}
                                />
                              </>
                            )
                          ) : (
                            <div className="h-full w-full bg-gray"> </div>
                          )}
                        </>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* title container */}
          {!hideAlbumTitles && (
            <div className="my-[4px] flex max-h-full w-1/3 flex-col justify-center text-[10px] leading-[1.1]">
              <div className="">
                {!chartDirty && (
                  <p className="text-xl">
                    Start adding albums by selecting a field and then selecting
                    the album from the database!
                  </p>
                )}

                {top100Data.map((a, i) => {
                  return (
                    <>
                      {a.artist ? (
                        <>
                          <span
                            className={`album-title-span m-[2px] block w-full -translate-x-[30px] translate-y-[10px] text-left ${(i === 4 || i === 19 || i === 29 || i === 49 || i === 59 || i === 69 || i === 79 || i === 89) && "pb-[3px]"}`}
                            style={
                              fontColorBody !== ""
                                ? { color: `${fontColorBody}` }
                                : { color: `${invert(backgroundColor)}` }
                            }
                          >
                            {a.artist} -{" "}
                            {a.name!.length + a.artist!.length > 50
                              ? `${a.name?.match(/^.{19}\w*/)} (...)`
                              : a.name}{" "}
                          </span>
                          {(i === 9 || i === 40) && (
                            <div>
                              {" "}
                              <span className="pb-[5px]"></span>{" "}
                            </div>
                          )}
                        </>
                      ) : (
                        <span></span>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SOURCE canvas */}
      <div
        className={`top100-container html2canvas-container flex w-full flex-col content-center px-[40px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"}}`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          backgroundPosition: `${backgroundImgPosition.x}% ${backgroundImgPosition.y}%`,
          backgroundSize: `${backgroundImgMode}`,
        }}
      >
        {chartTitle && (
          <div className={`chart-title bold w-full py-12 text-center text-3xl`}>
            <span
              style={
                fontColorHeader !== ""
                  ? { color: `${fontColorHeader}` }
                  : {
                      color: `${invert(`${backgroundColor}`)}`,
                    }
              }
            >
              {chartTitle}
            </span>
          </div>
        )}
        {/* images container */}
        <div className="flex">
          <div className={`${hideAlbumTitles ? "w-full" : "w-2/3"}`}>
            <div className={`image-div flex flex-col`}>
              <div className="top-4 my-[12px]">
                <h2
                  className="top100-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Top 10
                </h2>
                <div className="flex flex-wrap">
                  {top100Data.slice(0, 10).map((a, i) => {
                    return (
                      <div
                        className={`table-box table-box-lg m-[2px] h-[120px] w-[120px]`}
                        key={i}
                      >
                        {a.hasOwnProperty("image") ? (
                          /*@ts-ignore */
                          a.image[1]["#text"] && (
                            <img
                              className="w-full"
                              /*@ts-ignore */
                              src={`${a.image[2]["#text"]}`}
                            />
                          )
                        ) : (
                          <div className="h-full w-full bg-gray"> </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="second-tier-classics my-[12px] w-full">
                <h2
                  className="top100-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Second-tier classics
                </h2>
                <div className="flex flex-wrap">
                  {top100Data.slice(10, 40).map((a, i) => {
                    return (
                      <div
                        className={`table-box h-[62px] w-[62px] p-[1px] ${i + 10 === selectedIndex && "selected-index"}`}
                        key={i + 10}
                      >
                        {a.hasOwnProperty("image") ? (
                          /*@ts-ignore */
                          a.image[1]["#text"] && (
                            <img
                              className="w-full"
                              /*@ts-ignore */
                              src={`${a.image[2]["#text"]}`}
                            />
                          )
                        ) : (
                          <div className="h-full w-full bg-gray"> </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="other-favorites my-[12px] w-full">
                <h2
                  className="top100-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Other favorites
                </h2>
                <div className="flex flex-wrap">
                  {top100Data.slice(40).map((a, i) => {
                    return (
                      <div
                        className={`table-box h-[62px] w-[62px] p-[1px] ${i + 40 === selectedIndex && "selected-index"}`}
                        key={i + 40}
                      >
                        {a.hasOwnProperty("image") ? (
                          /*@ts-ignore */
                          a.image[1]["#text"] && (
                            <img
                              className="w-full"
                              /*@ts-ignore */
                              src={`${a.image[2]["#text"]}`}
                            />
                          )
                        ) : (
                          <div className="h-full w-full bg-gray"> </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* title container */}
          {!hideAlbumTitles && (
            <div className="my-[4px] flex max-h-full w-1/3 flex-col justify-center text-[10px] leading-[1.1]">
              <div className="">
                {top100Data.map((a, i) => {
                  return (
                    <>
                      {a.artist ? (
                        <>
                          <span
                            className={`album-title-span m-[2px] block w-full -translate-x-[30px] translate-y-[10px] text-left ${(i === 4 || i === 19 || i === 29 || i === 49 || i === 59 || i === 69 || i === 79 || i === 89) && "pb-[3px]"}`}
                            style={
                              fontColorBody !== ""
                                ? { color: `${fontColorBody}` }
                                : { color: `${invert(backgroundColor)}` }
                            }
                          >
                            {a.artist} -{" "}
                            {a.name!.length + a.artist!.length > 50
                              ? `${a.name?.match(/^.{19}\w*/)} (...)`
                              : a.name}{" "}
                          </span>
                          {(i === 9 || i === 39) && (
                            <div>
                              {" "}
                              <span className="pb-[5px]"></span>{" "}
                            </div>
                          )}
                        </>
                      ) : (
                        <span></span>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Top100;
