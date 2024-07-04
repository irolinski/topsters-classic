import { useEffect, useState } from "react";
import { lastFmAlbum } from "../../App";

type Top50Props = {
  exportRef: any;
  top50Data: lastFmAlbum[] | Record<string, never>[];
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

const ClassicTop50 = ({
  exportRef,
  top50Data,
  selectedIndex,
  changeIndex,
  chartDirty,
  chartTitle,
  hideAlbumTitles,
  backgroundColor,
  backgroundImg,
}: Top50Props) => {
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
      {/* UI canvas */}
      <div
        className={`top50-container top50-ui flex w-full content-center object-scale-down px-[40px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"} }`}
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
          <div className={`bold w-full py-12 text-center text-3xl`}>
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div
          className={`${hideAlbumTitles ? "w-full" : "w-2/3"} flex flex-col justify-center`}
        >
          <div className={`image-div flex flex-col`}>
            <div className="top-4 my-[12px]">
              <h2 className="top50-section-header">Top 4</h2>
              <div className="flex">
                {top50Data.slice(0, 4).map((a, i) => {
                  return (
                    <div
                      className={`h-[135px] w-[135px] ${i === selectedIndex && "selected-index"} mr-[16px]`}
                      key={i}
                      onClick={() => {
                        changeIndex(i);
                      }}
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
              <h2 className="top50-section-header">
                Second-tier classics
              </h2>
              <div className="flex flex-wrap">
                {top50Data.slice(4, 20).map((a, i) => {
                  return (
                    <div
                      className={`h-[65px] w-[65px] p-[2px] ${i + 4 === selectedIndex && "selected-index"}`}
                      key={i + 4}
                      onClick={() => {
                        changeIndex(i + 4);
                      }}
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
              <h2 className="top50-section-header">Other favorites</h2>
              <div className="flex flex-wrap">
                {top50Data.slice(20).map((a, i) => {
                  return (
                    <div
                      className={`h-[65px] w-[65px] p-[1px] ${i + 20 === selectedIndex && "selected-index"}`}
                      key={i + 20}
                      onClick={() => {
                        changeIndex(i + 20);
                      }}
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
          <div className="my-[12px] flex max-h-full w-1/3 flex-col justify-center text-[10px] leading-[1.1]">
            <div className="">
              {!chartDirty && (
                <p className="text-xl">
                  Start adding albums by selecting a field and then selecting
                  the album from the database!
                </p>
              )}

              {top50Data.map((a, i) => {
                return (
                  <>
                    {a.artist ? (
                      <>
                        <span
                          className={`album-title-span m-[2px] block w-full text-left`}
                        >
                          {a.artist} -{" "}
                          {a.name!.length + a.artist!.length > 50
                            ? `${a.name?.match(/^.{19}\w*/)} (...)`
                            : a.name}{" "}
                        </span>
                        {(i === 4 || i === 19) && (
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

      {/* SOURCE canvas */}
      <div
        className={`top50-container html2canvas-container flex w-full content-center px-[40px] ${hideAlbumTitles ? "hide-album-titles" : "show-album-titles"} ${chartTitle && "show-chart-title"} }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
        }}
      >
        {chartTitle && (
          <div className={`bold w-full py-12 text-center text-3xl`}>
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div
          className={`${hideAlbumTitles ? "w-full" : "w-2/3"} flex flex-col justify-center`}
        >
          <div className={`image-div flex flex-col`}>
            <div className="top-4 my-[12px]">
              <h2 className="top50-section-header">Top 4</h2>
              <div className="flex">
                {top50Data.slice(0, 4).map((a, i) => {
                  return (
                    <div className={`mr-[16px] h-[135px] w-[135px]`} key={i}>
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
              <h2 className="top50-section-header">
                Second-tier classics
              </h2>
              <div className="flex flex-wrap">
                {top50Data.slice(4, 20).map((a, i) => {
                  return (
                    <div className={`h-[65px] w-[65px] p-[2px]`} key={i + 4}>
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
              <h2 className="top50-section-header">Other favorites</h2>
              <div className="flex flex-wrap">
                {top50Data.slice(20).map((a, i) => {
                  return (
                    <div className={`h-[65px] w-[65px] p-[1px]`} key={i + 20}>
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
          <div className="my-[12px] flex max-h-full w-1/3 flex-col justify-center text-[10px] leading-[1.1]">
            <div className="">
              {!chartDirty && (
                <p className="text-xl">
                  Start adding albums by selecting a field and then selecting
                  the album from the database!
                </p>
              )}

              {top50Data.map((a, i) => {
                return (
                  <>
                    {a.artist ? (
                      <>
                        <span
                          className={`album-title-span m-[2px] block w-full text-left`}
                        >
                          {a.artist} -{" "}
                          {a.name!.length + a.artist!.length > 50
                            ? `${a.name?.match(/^.{19}\w*/)} (...)`
                            : a.name}{" "}
                        </span>
                        {(i === 4 || i === 19) && (
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
  );
};

export default ClassicTop50;
