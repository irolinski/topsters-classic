import { useState } from "react";
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

  const [showChartTitle, setShowChartTitle] = useState(true);
  const [hideAlbumTitles, setHideAlbumTitles] = useState(false);

  return (
    <>
      {/* canvas UI */}
      <div
        className={`collage-ui w-full p-[2px] content-center 
          ${hideAlbumTitles && "hide-album-titles"}          
          ${showChartTitle && "show-chart-title"}
`}
        
        ref={exportRef}
        style={{
          backgroundColor: `${backgroundColor}`,
          backgroundImage: `url('${backgroundImg}')`,
        }}
      >
         {showChartTitle && (
          <div className="chart-title w-full text-center p-8 bold">
            ChartName
          </div>
        )}
        {/* images container */}
        <div
          className={`collage-images-ui
          ${hideAlbumTitles ? "w-full" : "w-3/5"}`}
        >
          <div className="image-div flex justify-center top-1/2 max-h-full max-w-2/3 flex-wrap m-auto -translate-x-[20px]">
            {collageData.map((a, i) => {
              return (
                <div
                  className={`${
                    i === selectedIndex && "selected-index"
                  } collage-img-ui `}
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

        {/* titles container */}
        {!hideAlbumTitles && (
          <div className="collage-titles-ui w-2/5 max-h-full">
            <div className="collage leading-none -translate-x-[40px]">
              {!chartDirty && (
                <p className="text-md lg:text-xl">
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
          <div className="w-full text-center p-8 text-3xl bold">
            ChartName
          </div>
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
