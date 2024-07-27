import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Draggable from "react-draggable";
import {
  openAccordionOptions,
  openModalOptions,
  openPopUpOptions,
} from "../../models/models";

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
  openModal: openModalOptions;
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
  openModal,
}: BackgroundTypes) => {
  const [backgroundImgInputValue, setBackgroundImgInputValue] =
    useState(backgroundImg);

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
          {backgroundImg === "" && (
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
          )}
          <div className="inline-block p-4">
            <h3 className="px-4 pb-4">Background image:</h3>

            {backgroundImg === "" ? (
              <>
                <div
                  className={`mb-4 ml-8 mt-1 inline-flex h-8 items-stretch border`}
                >
                  <input
                    className="w-3/4 p-1 text-sm"
                    type="text"
                    maxLength={512}
                    onChange={(evt) =>
                      setBackgroundImgInputValue(evt.currentTarget.value)
                    }
                    onPaste={() => {
                      if (
                        backgroundImgInputValue.length < 8 ||
                        !backgroundImgInputValue.includes(".") ||
                        !backgroundImgInputValue.includes("/")
                      ) {
                        alert(
                          "You'll have to enter a valid url if you want it to work.",
                        );
                      }
                    }}
                    placeholder="Paste URL here"
                    aria-label="Background image URL"
                    aria-hidden={`${openModal !== "" && "true"}`}
                    tabIndex={openModal !== "" ? 1 : 0}
                  />
                  <button
                    className="w-1/4"
                    onClick={() => {
                      console.log(backgroundImgInputValue);
                      if (
                        backgroundImgInputValue.length < 8 ||
                        !backgroundImgInputValue.includes(".") ||
                        !backgroundImgInputValue.includes("/")
                      ) {
                        alert(
                          "You'll have to enter a valid url if you want it to work.",
                        );
                        return;
                      }
                      handleSetBackgroundImg(
                        `https://corsproxy.io/?${backgroundImgInputValue}`,
                      );
                    }}
                    aria-hidden={`${openModal !== "" && "true"}`}
                    tabIndex={openModal !== "" ? 1 : 0}
                  >
                    <img
                      className="mx-auto max-h-[15px] max-w-[15px] -translate-y-[2.5px]"
                      src="/upload_icon.svg"
                      tabIndex={1}
                    />
                  </button>
                </div>
              </>
            ) : (
              <div className="inline-flex w-full px-8">
                <button
                  className="mr-2 h-[35px] w-[60px]"
                  name="Remove image"
                  onClick={() => {
                    handleSetBackgroundImg("");
                    setBackgroundImgInputValue("");
                  }}
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
