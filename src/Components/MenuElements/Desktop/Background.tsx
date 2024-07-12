import { MutableRefObject } from "react";
import { HexColorPicker } from "react-colorful";
import Draggable from "react-draggable";

type BackgroundTypes = {
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
  openMenuPopUp: string;
  handleOpenPopUp: (selectedPopUp: string) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: any;
  backgroundImgMode: string;
  handleSetBackgroundImgMode: (newMode: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
};

const Background = ({
  openAccordion,
  handleOpenAccordion,
  openMenuPopUp,
  handleOpenPopUp,
  backgroundColor,
  handleSetBackgroundColor,
  backgroundImg,
  handleSetBackgroundImg,
  backgroundPositionMenu,
  handleBackgroundPositionChange,
  backgroundImgMode,
  handleSetBackgroundImgMode,
  inputRef,
}: BackgroundTypes) => {
  return (
    <>
      {" "}
      <div className="menu-block">
        <div
          className="open-accordion-btn inline-flex"
          onClick={() => handleOpenAccordion("background")}
        >
          <h3 className="w-full font-bold">Background</h3>{" "}
          {openAccordion === "background" ? (
            <button className="no-style mx-4">－</button>
          ) : (
            <button className="no-style mx-4">＋</button>
          )}
        </div>
        <div
          className={`menu-accordion ${openAccordion === "background" && "open"}`}
        >
          <div className="inline-flex p-4">
            <h3 className="px-4">Color:</h3>
            <div
              className={`${openMenuPopUp !== "background" && "hidden"} color-picker-div bg-menu-pop-up absolute flex scale-50 justify-center`}
            >
              <button
                className="absolute right-0"
                onClick={() => handleOpenPopUp("")}
              >
                X
              </button>
              <HexColorPicker
                className="z-10 m-16"
                color={backgroundColor}
                onChange={handleSetBackgroundColor}
              />
            </div>
            <div
              className="color-box hover:cursor-pointer"
              style={{ backgroundColor: `${backgroundColor}` }}
              onClick={() => handleOpenPopUp("background")}
            ></div>
          </div>
          <div className="flex p-4">
            <h3 className="px-4">Image:</h3>
            {backgroundImg === "" ? (
              <label className="mr-8 h-4 w-8" htmlFor="file-input-desktop">
                <input
                  className="absolute my-[-20px] h-0 w-0 opacity-0"
                  type="file"
                  ref={inputRef}
                  id="file-input-desktop"
                  onChange={(evt) =>
                    handleSetBackgroundImg(
                      URL.createObjectURL(evt.target.files![0]),
                    )
                  }
                />
                <button
                  className="h-[35px] w-[60px]"
                  onClick={() => inputRef.current?.click()}
                >
                  <img
                    className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                    src="/upload_icon.svg"
                  />
                </button>
              </label>
            ) : (
              <div className="inline-flex w-full">
                <button
                  className="mr-2 h-[35px] w-[60px]"
                  name="Remove image"
                  onClick={() => handleSetBackgroundImg("")}
                >
                  <img
                    className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                    src="/trash_icon.svg"
                  />
                </button>
                <button
                  className="h-[35px] w-[60px]"
                  onClick={() => handleOpenPopUp("background-position")}
                >
                  <img
                    className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                    src="/move_icon.svg"
                  />
                </button>
                <div
                  className={`background-position-menu ${openMenuPopUp !== "background-position" && "hidden"} color-picker-div bg-menu-pop-up absolute flex flex-col justify-center`}
                >
                  <button
                    className="absolute right-0 top-0"
                    onClick={() => handleOpenPopUp("")}
                  >
                    X
                  </button>
                  <div
                    className="background-position-field relative z-20 mx-16 mb-8 mt-16 h-[190px] w-[190px] rounded-md"
                    style={{ backgroundColor: "grey" }}
                  >
                    <Draggable
                      defaultPosition={{
                        x: backgroundPositionMenu.centerDot,
                        y: backgroundPositionMenu.centerDot,
                      }}
                      // it should be 85 (50% off of both axis) but for some reason 80 actually centers it
                      handle=".handle"
                      bounds="parent"
                      onDrag={(_evt, dragElement) => {
                        handleBackgroundPositionChange(
                          dragElement.x,
                          dragElement.y,
                        );
                      }}
                    >
                      <div
                        className="background-position-dot handle p2 h-[30px] w-[30px] rounded-full"
                        style={{
                          backgroundColor: "grey",
                          cursor: "move",
                        }}
                      ></div>
                    </Draggable>
                  </div>
                  <h4 className="px-4 pb-4">Image position:</h4>

                  <div className="mb-8 inline-flex justify-center">
                    <button
                      className={`${backgroundImgMode === "auto" && "active"}`}
                      onClick={() => handleSetBackgroundImgMode("auto")}
                    >
                      Auto
                    </button>
                    <button
                      className={`${backgroundImgMode === "contain" && "active"}`}
                      onClick={() => handleSetBackgroundImgMode("contain")}
                    >
                      Contain
                    </button>
                    <button
                      className={`${backgroundImgMode === "cover" && "active"}`}
                      onClick={() => handleSetBackgroundImgMode("cover")}
                    >
                      Cover
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Background;
