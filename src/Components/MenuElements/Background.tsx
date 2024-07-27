import { MutableRefObject } from "react";
import { HexColorPicker } from "react-colorful";
import Draggable from "react-draggable";
import { openAccordionOptions, openPopUpOptions } from "../../models/models";

type BackgroundTypes = {
  openAccordion: openAccordionOptions;
  handleOpenAccordion: (selectedAccordion: openAccordionOptions) => void;
  openMenuPopUp: openPopUpOptions;
  handleOpenPopUp: (selectedPopUp: openPopUpOptions) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: (dragX: any, dragY: any) => void;
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
  const saveBackgroundImage = (image: File) => {
    if (image.size > 3.5 * 1048576) {
      alert("File too big. Max file size allowed is 3.5mb.");
      return;
    }
    const fr = new FileReader();
    fr.readAsDataURL(image);
    fr.addEventListener("load", () => {
      const url: string = fr.result as string;
      handleSetBackgroundImg(url);
    });
  };

  return (
    <>
      <div className="menu-block">
        <button
          className="no-style open-accordion-btn inline-flex"
          onClick={() => handleOpenAccordion("background")}
          aria-label="Open background settings accordion"
          aria-expanded={openAccordion === "background" ? true : false}
          tabIndex={0}
        >
          <span className="w-full font-bold">Background</span>
          {openAccordion === "background" ? (
            <span className="no-style mx-4">－</span>
          ) : (
            <span className="no-style mx-4">＋</span>
          )}
        </button>
        <div
          className={`menu-accordion ${openAccordion === "background" && "open"}`}
        >
          <div className="inline-flex p-4">
            <h3 className="px-4">Color:</h3>
            <div
              className={`${openMenuPopUp !== "background" && "hidden"} color-picker-div bg-menu-pop-up fixed right-0 top-[20%] flex scale-50 justify-center sm:right-auto sm:top-auto`}
            >
              <button
                className="close-pop-up-btn absolute right-0"
                onClick={() => handleOpenPopUp("")}
                aria-label="close pop-up"
              >
                &#10005;
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
              <label
                className="mr-8 h-4 w-8"
                htmlFor="file-input-desktop"
                tabIndex={1}
              >
                <input
                  className="absolute my-[-20px] h-0 w-0 opacity-0"
                  type="file"
                  accept=".jpg,.jpeg,.png" 
                  ref={inputRef}
                  id="file-input-desktop"
                  onChange={(evt) => {
                    saveBackgroundImage(evt.target.files![0]);
                  }}
                  tabIndex={openAccordion === "background" ? 0 : 1}
                />
                <button
                  className="h-[35px] w-[60px]"
                  onClick={() => inputRef.current?.click()}
                  tabIndex={openAccordion === "background" ? 0 : 1}
                  aria-label="Upload background image button"
                >
                  <img
                    className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                    src="/upload_icon.svg"
                    tabIndex={1}
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
                  className={`background-position-menu ${openMenuPopUp !== "background-position" && "hidden"} color-picker-div bg-menu-pop-up fixed right-0 top-1/4 flex flex-col justify-center sm:right-auto sm:top-auto`}
                >
                  <button
                    className="close-pop-up-btn font-4xl absolute right-0 top-0"
                    onClick={() => handleOpenPopUp("")}
                  >
                    &#10005;
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
                  <h4 className="px-4 pb-4 text-xl">Image position:</h4>

                  <div className="image-position-pop-up-btn mb-8 inline-flex justify-center">
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
