import { useEffect, useState } from "react";
import { lastFmAlbum } from "../../models/models";
import invert from "invert-color";

type Top40Props = {
  exportRef: any;
  top40Data: lastFmAlbum[] | Record<string, never>[];
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

const ClassicTop40 = ({
  exportRef,
  top40Data,
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
}: Top40Props) => {
  //auto scale
  const [canvasScaleDivisior, setCanvasScaleDivisior] = useState<number>(1500);
  const [windowSize, setWindowSize] = useState<windowValueTypes>({
    width: window.innerHeight,
    height: window.innerWidth,
  });

  useEffect(() => {
    function scaleToViewport() {
      if (window.visualViewport) {
        setWindowSize({
          width: window.visualViewport.width ?? window.innerWidth,
          height: window.visualViewport.width ?? window.innerHeight,
        });
        if (window.visualViewport!.width < 550) {
          setCanvasScaleDivisior(1100);
          return;
        } else if (window.visualViewport!.width >= 1025) {
          setCanvasScaleDivisior(2000);
          return;
        } else if (
          window.visualViewport!.width < 1025 &&
          window.visualViewport!.width > window.visualViewport!.height * 1.2
        ) {
          setCanvasScaleDivisior(2000);
          return;
        }
        setCanvasScaleDivisior(1400);
      }
    }
    window.addEventListener("resize", scaleToViewport);
    scaleToViewport();
    return () => window.removeEventListener("resize", scaleToViewport);
  }, []); // Empty array ensures that effect is only run on mount

  const canvasScaleValue: number = windowSize.width! / canvasScaleDivisior; //original width + sth for there to be a margin
  const marginValue = canvasScaleValue - 1;
  // console.log(canvasScaleDivisior);
  // console.log(windowSize.width);
  return (
    <div className={`max-h-0 ${chartTitle && "-translate-y-[20px]"}`}>
      {/* UI canvas */}
      <div
        className={`top40-container top40-ui  top-[-16vh] flex w-full flex-col content-center object-scale-down px-[40px] xxs:top-[-12vh] xs:top-[-10vh] sm:top-[-8vh] md:top-[0px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${enableShadows && "enable-shadows"} ${chartTitle && "show-chart-title"} }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          backgroundPosition: `${backgroundImgPosition.x}% ${backgroundImgPosition.y}%`,
          backgroundSize: `${backgroundImgMode}`,
          transform: `scale(${canvasScaleValue})`,
          marginBottom: `${marginValue}`,
          marginTop: `${marginValue}`,
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
                  className="top40-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Top 4
                </h2>
                <div className="flex">
                  {top40Data.slice(0, 4).map((a, i) => {
                    return (
                      <div
                        className={`table-box table-box-lg mr-[16px] flex h-[135px] w-[135px] flex-col justify-center ${i === selectedIndex && "selected-index"}`}
                        key={i}
                        onClick={() => {
                          changeIndex(i);
                        }}
                      >
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
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="second-tier-classics my-[12px] w-4/5">
                <h2
                  className="top40-section-header"
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
                  {top40Data.slice(4, 20).map((a, i) => {
                    return (
                      <div
                        className={`table-box flex h-[65px] w-[65px] flex-col justify-center p-[2px] ${i + 4 === selectedIndex && "selected-index"}`}
                        key={i + 4}
                        onClick={() => {
                          changeIndex(i + 4);
                        }}
                      >
                        {a.hasOwnProperty("image") ? (
                          /*@ts-ignore */
                          a.image[1]["#text"] && (
                            <>
                              {" "}
                              <div
                                className={`mx-auto ${i + 4 === loadingImage ? "block" : "hidden"} `}
                              >
                                <div className="circle-loader-sm mx-auto"></div>
                              </div>
                              <img
                                className={`w-full ${i + 4 === loadingImage && "max-w-0"}`}
                                /*@ts-ignore */
                                src={`${a.image[2]["#text"]}`}
                                onLoad={() => handleImageLoaded()}
                              />
                            </>
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
                  className="top40-section-header"
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
                  {top40Data.slice(20).map((a, i) => {
                    return (
                      <div
                        className={`table-box flex h-[65px] w-[65px] flex-col justify-center p-[1px] ${i + 20 === selectedIndex && "selected-index"}`}
                        key={i + 20}
                        onClick={() => {
                          changeIndex(i + 20);
                        }}
                      >
                        {a.hasOwnProperty("image") ? (
                          /*@ts-ignore */
                          a.image[1]["#text"] && (
                            <>
                              <div
                                className={`mx-auto ${i + 20 === loadingImage ? "block" : "hidden"} `}
                              >
                                <div className="circle-loader-sm mx-auto"></div>
                              </div>
                              <img
                                className={`w-full ${i + 20 === loadingImage && "max-w-[0px]"}`}
                                /*@ts-ignore */
                                src={`${a.image[2]["#text"]}`}
                                onLoad={() => handleImageLoaded()}
                              />
                            </>
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
            <div className="my-[12px] flex max-h-full w-1/3 flex-col justify-center text-[10px] leading-[1.1]">
              <div className="">
                {!chartDirty && (
                  <p className="text-xl">
                    Start adding albums by selecting a field and then selecting
                    the album from the database!
                  </p>
                )}

                {top40Data.map((a, i) => {
                  return (
                    <>
                      {a.artist ? (
                        <>
                          <span
                            className={`album-title-span m-[2px] block w-full text-left ${(i === 29 || i === 39) && "pb-[3px]"}`}
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
                          {(i === 3 || i === 19) && (
                            <div>
                              {" "}
                              <br />{" "}
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
        className={`top40-container html2canvas-container flex w-full flex-col content-center object-scale-down px-[40px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"} }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          backgroundPosition: `${backgroundImgPosition.x}% ${backgroundImgPosition.y}%`,
          backgroundSize: `${backgroundImgMode}`,
          marginBottom: `${marginValue}`,
          marginTop: `${marginValue}`,
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
                  className="top40-section-header"
                  style={
                    fontColorHeader !== ""
                      ? { color: `${fontColorHeader}` }
                      : {
                          color: `${invert(`${backgroundColor}`)}`,
                        }
                  }
                >
                  Top 4
                </h2>
                <div className="flex">
                  {top40Data.slice(0, 4).map((a, i) => {
                    return (
                      <div
                        className={`table-box table-box-lg mr-[16px] h-[135px] w-[135px]`}
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
              <div className="second-tier-classics my-[12px] w-4/5">
                <h2
                  className="top40-section-header"
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
                  {top40Data.slice(4, 20).map((a, i) => {
                    return (
                      <div
                        className={`table-box h-[65px] w-[65px] p-[2px]`}
                        key={i + 4}
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
                  className="top40-section-header"
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
                  {top40Data.slice(20).map((a, i) => {
                    return (
                      <div
                        className={`table-box flex h-[65px] w-[65px] flex-col justify-center p-[1px]`}
                        key={i + 20}
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
                          <div className="table-box h-full w-full bg-gray">
                            {" "}
                          </div>
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
            <div className="my-[12px] flex max-h-full w-1/3 flex-col justify-center text-[10px] leading-[1.1]">
              <div className="">
                {top40Data.map((a, i) => {
                  return (
                    <>
                      {a.artist ? (
                        <>
                          <span
                            className={`album-title-span m-[2px] block w-full text-left ${(i === 29 || i === 39) && "pb-[3px]"}`}
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
                          {(i === 3 || i === 19) && (
                            <div>
                              {" "}
                              <br />{" "}
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

export default ClassicTop40;
