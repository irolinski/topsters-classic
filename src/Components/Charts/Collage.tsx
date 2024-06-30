import { useEffect, useState } from "react";
import { lastFmAlbum } from "../../App";

type CollageProps = {
  exportRef: any;
  collageData: lastFmAlbum[] | Record<string, never>[];
  selectedIndex: number;
  changeIndex: any;
  chartDirty: boolean;
  backgroundColor: string;
  backgroundImg: string;
};

const Collage = ({
  exportRef,
  collageData,
  selectedIndex,
  changeIndex,
  chartDirty,
  backgroundColor,
  backgroundImg,
}: CollageProps) => {
  // test show titles

  const [showChartTitle, setShowChartTitle] = useState(!true);
  const [hideAlbumTitles, setHideAlbumTitles] = useState(false);

  type windowValueTypes = {
    width: number | undefined;
    height: number | undefined;
  };
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<windowValueTypes>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  const size = useWindowSize();
  const scaleValue = size.width / 1024 

  return (
    <>
          <div>
        {/* {size.width}px / {size.height}px */}
        {scaleValue}
      </div>
      
      {/* canvas UI */}
      <div
        className={`collage-container object-scale-down collage-ui w-full p-[2px] content-center 
          ${hideAlbumTitles && "hide-album-titles"}
          ${showChartTitle && "show-chart-title"}
        }`}
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
          transform: `scale(${scaleValue})`
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
