import { useEffect, useState } from "react";
import { lastFmAlbum } from "../../App";

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
}: CollageProps) => {
  // collage options
  const collageProd = collageRowNum * collageColNum;
  console.log(`${collageRowNum} and ${collageColNum}`);

  //auto scale
  const [canvasScaleDivisior, setCanvasScaleDivisior] = useState<number>(1500);
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
          if (window.visualViewport!.width < 640) setCanvasScaleDivisior(1050);
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
  const marginValue = canvasScaleValue - 1;
  return (
    <div className="max-h-0 -translate-y-[10vh] xs:-translate-y-[5vh] md:transform-none">
      {/* canvas UI */}
      <div
        className={`collage-container collage-ui w-full content-center object-scale-down p-[2px] ${hideAlbumTitles && "hide-album-titles"} ${chartTitle && "show-chart-title"} }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          transform: `scale(${canvasScaleValue})`,
          marginBottom: `${marginValue}`,
          marginTop: `${marginValue}`,
        }}
      >
        {chartTitle && (
          <div className="bold w-full p-8 text-center text-3xl">
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div className={`${hideAlbumTitles ? "w-full" : "w-3/5"} flex flex-col justify-center`}>
          <div
            className={`image-div ${((collageRowNum === 5 && collageColNum === 4) || (collageRowNum === 5 && collageColNum === 5) || (collageRowNum === 6 && collageColNum === 5)) && "px-[50px]"} ${collageRowNum === 6 && collageColNum === 6 && "px-[70px]"} ${collageRowNum === 6 && collageColNum === 4 && "px-[100px]"}`}
          >
            {collageData.slice(0, collageProd).map((a, i) => {
              return (
                <div
                  className={`${
                    i === selectedIndex && "selected-index"
                  } collage ${collageRowNum === 4 && collageColNum === 4 && "h-[125px] w-[125px]"} ${collageProd === 20 && "h-[100px] w-[100px]"} ${collageProd === 24 && "h-[85px] w-[85px]"} ${collageProd === 25 && "h-[82px] w-[82px]"} ${collageProd === 30 && "h-[85px] w-[85px]"} ${collageProd === 36 && "h-[65px] w-[65px]"} m-[2px]`}
                  key={i}
                  onClick={() => {
                    changeIndex(i);
                  }}
                >
                  {/* remmber to delete "#text" later */}
                  {a.hasOwnProperty("image") ? (
                    /*@ts-ignore */
                    a.image[1]["#text"] ? (
                      <img
                        className="w-full"
                        /*@ts-ignore */
                        src={`${a.image[2]["#text"]}`}
                      />
                    ) : (
                      <img className="w-full" src={`${a.image[2]["text"]}`} />
                    )
                  ) : (
                    <div className="h-full w-full bg-gray"> </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* images container */}
        {!hideAlbumTitles && (
          <div className="max-h-full w-2/5">
            <div className={`collage -translate-x-[40px] ${collageProd >= 30 ? "leading-[0.5]" : "leading-none"}`}>
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
                      <span className={`${collageProd < 30 && "m-[2px]"} text-left album-title-span`}>
                        {a.artist} - {a.name.length > 100 ? `${a.name?.slice(0, 94)} (...)` : a.name}{" "}
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

      {/* actual canvas */}
      <div
        className={`collage-container html2canvas-container w-full content-center p-[2px] ${hideAlbumTitles && "hide-album-titles"} ${chartTitle && "show-chart-title"} }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
        }}
      >
        {chartTitle && (
          <div className="bold w-full p-8 text-center text-3xl">
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div className={`${hideAlbumTitles ? "w-full" : "w-3/5"} flex flex-col justify-center`}>
          <div className="image-div">
            {collageData.map((a, i) => {
              return (
                <div className="collage m-[2px] h-[125px] w-[125px]" key={i}>
                  {/* remmber to delete "#text" later */}
                  {a.hasOwnProperty("image") ? (
                    /*@ts-ignore */
                    a.image[1]["#text"] ? (
                      <img
                        className="w-full"
                        /*@ts-ignore */
                        src={`${a.image[2]["#text"]}`}
                      />
                    ) : (
                      <img className="w-full" src={`${a.image[2]["text"]}`} />
                    )
                  ) : (
                    <div className="h-full w-full bg-gray"> </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* images container */}
        {!hideAlbumTitles && (
          <div className="max-h-full w-2/5">
            <div className={`collage -translate-x-[40px] ${collageProd >= 30 ? "leading-[0.5]" : "leading-none"}`}>
              {collageData.map((a, i) => {
                return (
                  a.artist && (
                    <>
                      <span className="m-[2px] text-left album-title-span">
                        {a.artist} - {a.name}{" "}
                      </span>
                      {(i + 1) % 4 === 0 && (
                        <div>
                          {" "}
                          <br />{" "}
                        </div>
                      )}
                    </>
                  )
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
