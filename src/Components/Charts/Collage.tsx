import { lastFmAlbum } from "../../App";

type CollageProps = {
  exportRef: any;
  collageData: lastFmAlbum[];
  selectedIndex: number;
  changeIndex: any;
};

const Collage = ({
  exportRef,
  collageData,
  selectedIndex,
  changeIndex,
}: CollageProps) => {
  return (
    <>
      {/* canvas UI */}
      <div
        className="collage-container w-full p-[2px] content-center"
        ref={exportRef}
      >
        <div className="w-3/5">
          <div className="image-div flex justify-center top-1/2 max-h-full max-w-2/3 flex-wrap m-auto -translate-x-[20px]">
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

        <div className="w-2/5 max-h-full">
          <div className="collage leading-none -translate-x-[40px]">
            {collageData.map((a, i) => {
              return a.artist ? (
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
              ) : (
                <div className="w-full h-full bg-gray"></div>
              );
            })}
          </div>
        </div>
      </div>

      {/* actual canvas */}
      <div
        className="collage-container html2canvas-container w-full p-[2px] content-center"
        ref={exportRef}
      >
        <div className="w-3/5">
          <div className="image-div flex justify-center top-1/2 max-h-full max-w-2/3 flex-wrap m-auto -translate-x-[20px]">
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
      </div>
    </>
  );
};

export default Collage;
