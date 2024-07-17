import { useEffect, useState } from "react";
import invert from "invert-color";
import { lastFmAlbum } from "../../models/models";

type CollageProps = {
  exportRef: any;
  collageData: lastFmAlbum[] | Record<string, never>[];
  collageRowNum: number;
  collageColNum: number;
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

const Collage = ({
  exportRef,
  collageData,
  collageRowNum,
  collageColNum,
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
}: CollageProps) => {
  // collage options
  const collageProd = collageRowNum * collageColNum;
  // console.log(`${collageRowNum} and ${collageColNum}`);

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
        if (window.visualViewport!.width < 640) {
          setCanvasScaleDivisior(1050);
        } else if (window.visualViewport!.width >= 1048) {
          setCanvasScaleDivisior(2300);
        } else setCanvasScaleDivisior(1400);
      }
    }
    window.addEventListener("resize", scaleToViewport);
    scaleToViewport();
    return () => window.removeEventListener("resize", scaleToViewport);
  }, []); // Empty array ensures that effect is only run on mount

  const canvasScaleValue: number = windowSize.width! / canvasScaleDivisior; //original width + sth for there to be a margin
  const marginValue = canvasScaleValue - 1;
  return (
    <div
      className={`max-h-0 -translate-y-[10vh] xxs:-translate-y-[5vh] lg:-translate-y-[10vh] ${chartTitle && "lg:-translate-y-0"}`}
    >
      {/* UI canvas */}
      <div
        className={`collage-container collage-ui mt-[5vh] w-full content-center object-scale-down p-[2px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"} ${enableShadows && "enable-shadows"}`}
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
          <div
            className={`collage-header bold w-full py-12 text-center text-3xl ${((collageRowNum === 6 && collageColNum === 6) || (collageRowNum === 4 && collageColNum === 5) || (collageRowNum === 5 && collageColNum === 6) || (collageRowNum === 5 && collageColNum === 5)) && "lift-header-if-no-titles"} ${collageRowNum === 5 && collageColNum === 4 && "lower-header-if-titles"} ${(collageRowNum === 6 && (collageColNum === 5 || collageColNum === 4)) || (collageRowNum === 4 && collageColNum === 4 && "lower-header-if-no-titles")} ${((collageRowNum === 4 && collageColNum === 5) || collageRowNum === 5 || collageColNum === 6 || (collageRowNum === 6 && collageColNum === 6)) && "lift-header-if-titles"} ${collageRowNum === 4 && collageColNum === 6 && "double-lift-if-no-titles"}`}
            style={
              fontColorHeader !== ""
                ? { color: `${fontColorHeader}` }
                : {
                    color: `${invert(`${backgroundColor}`)}`,
                  }
            }
          >
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div
          className={`${hideAlbumTitles ? "w-full" : "w-3/5"} flex flex-col justify-center`}
        >
          <div
            className={`image-div ${((collageRowNum === 5 && collageColNum === 4) || (collageRowNum === 5 && collageColNum === 5) || (collageRowNum === 6 && collageColNum === 5)) && "px-[50px]"} ${collageRowNum === 6 && collageColNum === 6 && "px-[70px]"} ${collageRowNum === 6 && collageColNum === 4 && "px-[100px]"}`}
          >
            {collageData.slice(0, collageProd).map((a, i) => {
              return (
                <div
                  className={`flex flex-col justify-center ${
                    i === selectedIndex && "selected-index"
                  } collage ${collageRowNum === 4 && collageColNum === 4 && "h-[125px] w-[125px]"} ${collageProd === 20 && "h-[100px] w-[100px]"} ${collageProd === 24 && "h-[85px] w-[85px]"} ${collageProd === 25 && "h-[82px] w-[82px]"} ${collageProd === 30 && "h-[85px] w-[85px]"} ${collageProd === 36 && "h-[65px] w-[65px]"} m-[2px]`}
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
                          <div className="circle-loader-sm mx-auto"></div>
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
        {/* title container */}
        {!hideAlbumTitles && (
          <div className="max-h-full w-2/5">
            <div
              className={`collage -translate-x-[40px] ${collageProd >= 30 ? "leading-[0.5]" : "leading-none"}`}
            >
              {!chartDirty && (
                <p className="text-xl">
                  Start adding albums by selecting a field and then selecting
                  the album from the database!
                </p>
              )}

              {collageData.slice(0, collageProd).map((a, i) => {
                return (
                  <>
                    {a.artist ? (
                      <span
                        className={`${collageProd < 30 && "m-[2px]"} album-title-span text-left`}
                        style={
                          fontColorBody !== ""
                            ? { color: `${fontColorBody}` }
                            : { color: `${invert(backgroundColor)}` }
                        }
                      >
                        {a.artist} -{" "}
                        {a.name!.length > 100
                          ? `${a.name?.match(/^.{93}\w*/)} (...)`
                          : a.name}{" "}
                      </span>
                    ) : (
                      <span></span>
                    )}

                    {(i + 1) % collageColNum === 0 && (
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
        )}
      </div>

      {/* SOURCE canvas */}
      <div
        className={`collage-container html2canvas-container w-full content-center p-[2px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"} }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          backgroundPosition: `${backgroundImgPosition.x}% ${backgroundImgPosition.y}%`,
          backgroundSize: `${backgroundImgMode}`,
        }}
      >
        {chartTitle && (
          <div
            className={`collage-header bold w-full py-12 text-center text-3xl ${((collageRowNum === 6 && collageColNum === 6) || (collageRowNum === 4 && collageColNum === 5) || (collageRowNum === 5 && collageColNum === 6) || (collageRowNum === 5 && collageColNum === 5)) && "lift-header-if-no-titles"} ${collageRowNum === 5 && collageColNum === 4 && "lower-header-if-titles"} ${(collageRowNum === 6 && (collageColNum === 5 || collageColNum === 4)) || (collageRowNum === 4 && collageColNum === 4 && "lower-header-if-no-titles")} ${((collageRowNum === 4 && collageColNum === 5) || (collageRowNum === 5 && collageColNum === 6)) && "lift-header-if-titles"} ${collageRowNum === 4 && collageColNum === 6 && "double-lift-if-no-titles"}`}
            style={
              fontColorHeader !== ""
                ? { color: `${fontColorHeader}` }
                : {
                    color: `${invert(`${backgroundColor}`)}`,
                  }
            }
          >
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div
          className={`${hideAlbumTitles ? "w-full" : "w-3/5"} flex flex-col justify-center`}
        >
          <div
            className={`image-div ${((collageRowNum === 5 && collageColNum === 4) || (collageRowNum === 5 && collageColNum === 5) || (collageRowNum === 6 && collageColNum === 5)) && "px-[50px]"} ${collageRowNum === 6 && collageColNum === 6 && "px-[70px]"} ${collageRowNum === 6 && collageColNum === 4 && "px-[100px]"}`}
          >
            {collageData.slice(0, collageProd).map((a, i) => {
              return (
                <div
                  className={`collage ${collageRowNum === 4 && collageColNum === 4 && "h-[125px] w-[125px]"} ${collageProd === 20 && "h-[100px] w-[100px]"} ${collageProd === 24 && "h-[85px] w-[85px]"} ${collageProd === 25 && "h-[82px] w-[82px]"} ${collageProd === 30 && "h-[85px] w-[85px]"} ${collageProd === 36 && "h-[65px] w-[65px]"} m-[2px]`}
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
        {/* title container */}
        {!hideAlbumTitles && (
          <div className="max-h-full w-2/5">
            <div
              className={`collage -translate-x-[40px] ${collageProd >= 30 ? "leading-[0.5]" : "leading-none"}`}
            >
              {collageData.slice(0, collageProd).map((a, i) => {
                return (
                  <>
                    {a.artist ? (
                      <span
                        className={`${collageProd < 30 && "m-[2px]"} album-title-span text-left`}
                        style={
                          fontColorBody !== ""
                            ? { color: `${fontColorBody}` }
                            : { color: `${invert(backgroundColor)}` }
                        }
                      >
                        {a.artist} -{" "}
                        {a.name!.length > 100
                          ? `${a.name?.match(/^.{93}\w*/)} (...)`
                          : a.name}{" "}
                      </span>
                    ) : (
                      // <br />
                      <span></span>
                    )}

                    {(i + 1) % collageColNum === 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Collage;
