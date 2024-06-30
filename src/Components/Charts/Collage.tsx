import { useEffect, useState } from "react";
import { lastFmAlbum } from "../../App";

type CollageProps = {
  exportRef: any;
  collageData: lastFmAlbum[] | Record<string, never>[];
  selectedIndex: number;
  changeIndex: any;
  chartDirty: boolean;
  chartTitle: string;
  showChartTitle: boolean;
  hideAlbumTitles: boolean;
  backgroundColor: string;
  backgroundImg: string;
};

const Collage = ({
  exportRef,
  collageData,
  selectedIndex,
  changeIndex,
  chartDirty,
  chartTitle,
  showChartTitle,
  hideAlbumTitles,
  backgroundColor,
  backgroundImg,
}: CollageProps) => {
  //auto scale
  type windowValueTypes = {
    width: number | undefined;
    height: number | undefined;
  };
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState<windowValueTypes>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.visualViewport.width,
          height: window.visualViewport.width,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();
  const scaleValue = size.width / 1400; //original width + sth for there to be a margin

  return (
    <>
      {/* canvas UI */}
      <div
        className={`collage-container object-scale-down collage-ui w-full p-[2px] content-center 
          ${hideAlbumTitles && "hide-album-titles"}
          ${chartTitle && "show-chart-title"}
        }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          transform: `scale(${scaleValue})`,
        }}
      >
        {chartTitle && (
          <div className="w-full text-center p-8 text-3xl bold">
            {chartTitle}
          </div>
        )}
        {/* images container */}
        <div className={`${hideAlbumTitles ? "w-full" : "w-3/5"}`}>
          <div className="image-div">
            {collageData.map((a, i) => {
              return (
                <div
                  className={`${
                    i === selectedIndex && "selected-index"
                  } collage w-[125px] h-[125px] m-[2px]`}
                  key={i}
                  onClick={() => {
                    changeIndex(i);
                    //   setSelectedIndex(i);
                  }}
                >
                  {/* remmber to delete "#text" later */}
                  {a.hasOwnProperty("image") ? (
                    /*@ts-ignore */
                    a.image[1]["#text"] ? (
                      <img
                        className="w-full "
                        /*@ts-ignore */
                        src={`${a.image[2]["#text"]}`}
                      />
                    ) : (
                      <img className="w-full " src={`${a.image[2]["text"]}`} />
                    )
                  ) : (
                    <div className="w-full h-full bg-gray"> </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* images container */}
        {!hideAlbumTitles && (
          <div className="w-2/5 max-h-full">
            <div className="collage leading-none -translate-x-[40px]">
              {!chartDirty && (
                <p className="text-xl">
                  Start adding albums by selecting a field and then selecting
                  the album from the database!
                </p>
              )}

              {collageData.map((a, i) => {
                return (
                  a.artist && (
                    <>
                      <span className="m-[2px] text-left">
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

      {/* actual canvas */}
      <div
        className={`collage-container html2canvas-container w-full p-[2px] content-center 
          ${hideAlbumTitles && "hide-album-titles"}
          ${showChartTitle && "show-chart-title"}
        }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
        }}
      >
        {showChartTitle && (
          <div className="w-full text-center p-8 text-3xl bold">ChartName</div>
        )}
        {/* images container */}
        <div className={`${hideAlbumTitles ? "w-full" : "w-3/5"}`}>
          <div className="image-div">
            {collageData.map((a, i) => {
              return (
                <div className="collage w-[125px] h-[125px] m-[2px]" key={i}>
                  {/* remmber to delete "#text" later */}
                  {a.hasOwnProperty("image") ? (
                    /*@ts-ignore */
                    a.image[1]["#text"] ? (
                      <img
                        className="w-full "
                        /*@ts-ignore */
                        src={`${a.image[2]["#text"]}`}
                      />
                    ) : (
                      <img className="w-full " src={`${a.image[2]["text"]}`} />
                    )
                  ) : (
                    <div className="w-full h-full bg-gray"> </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* images container */}
        {!hideAlbumTitles && (
          <div className="w-2/5 max-h-full">
            <div className="collage leading-none -translate-x-[40px]">
              {collageData.map((a, i) => {
                return (
                  a.artist && (
                    <>
                      <span className="m-[2px] text-left">
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
    </>
  );
};

export default Collage;
