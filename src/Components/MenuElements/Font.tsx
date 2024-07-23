import { HexColorPicker } from "react-colorful";
import fontList from "../../assets/fontList";
import invert from "invert-color";

type fontPropTypes = {
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
  fontFamily: string;
  handleSetFontFamily: (newFontName: string) => void;
  openMenuPopUp: string;
  handleOpenPopUp: (selectedPopUp: string) => void;
  fontColorHeader: string;
  handleSetFontColorHeader: (newColor: string) => void;
  fontColorBody: string;
  handleSetFontColorBody: (newColor: string) => void;
  backgroundColor: string;
};

const Font = ({
  openAccordion,
  handleOpenAccordion,
  fontFamily,
  handleSetFontFamily,
  openMenuPopUp,
  handleOpenPopUp,
  fontColorHeader,
  handleSetFontColorHeader,
  fontColorBody,
  handleSetFontColorBody,
  backgroundColor,
}: fontPropTypes) => {
  return (
    <>
      <div className="menu-block">
        <div>
          <button
            className="no-style open-accordion-btn inline-flex w-full"
            onClick={() => handleOpenAccordion("font")}
            aria-label="Open font settings accordion"
            aria-expanded={openAccordion === "font" ? true : false}
          >
            <span className="font-bold">Font</span>
            {openAccordion === "font" ? (
              <span className="no-style mx-4">－</span>
            ) : (
              <span className="no-style mx-4">＋</span>
            )}
          </button>
          <div
            className={`menu-accordion ${openAccordion === "font" && "open"}`}
          >
            <div className="px-4">
              <span className="block w-full p-4">Family: </span>
              <select
                className="ml-8 max-h-12 w-[180px] max-w-full p-1"
                value={fontFamily}
                onChange={(evt) => handleSetFontFamily(evt.target.value)}
                aria-label="Choose font family"
                tabIndex={openAccordion === "font" ? 0 : 1}
              >
                <>
                  {fontList.map((style: { name: string; fonts: string[] }) => {
                    return (
                      <>
                        <option disabled> --- {style.name} --- </option>
                        <>
                          {style.fonts.map((font: string) => {
                            return <option value={font}>{font}</option>;
                          })}
                        </>
                      </>
                    );
                  })}
                </>
              </select>
            </div>
            <div>
              <h4 className="block w-full px-8 pt-4 lg:hidden">Header: </h4>
              <div className="inline-flex p-4 px-8 lg:px-4">
                <h4 className="px-4"> Header Color: </h4>
                <div
                  className={`${openMenuPopUp !== "font-header" && "hidden"} color-picker-div font-menu-pop-up fixed right-0 top-1/3 flex scale-50 flex-col justify-center sm:right-auto sm:top-auto`}
                >
                  <div>
                    <button
                      className="close-pop-up-btn absolute right-0"
                      onClick={() => {
                        handleOpenPopUp("");
                      }}
                    >
                      &#10005;{" "}
                    </button>
                    <HexColorPicker
                      className="z-10 mx-16 mt-16"
                      color={`${fontColorHeader !== "" ? fontColorHeader : invert(backgroundColor)}`}
                      onChange={handleSetFontColorHeader}
                    />
                  </div>
                  <button
                    className="reset-pop-up-btn mx-auto my-6 w-1/2"
                    onClick={() => handleSetFontColorHeader("")}
                  >
                    Reset
                  </button>
                </div>
                <div
                  className="color-box"
                  style={
                    fontColorHeader !== ""
                      ? { backgroundColor: `${fontColorHeader}` }
                      : {
                          backgroundColor: `${invert(backgroundColor)}`,
                        }
                  }
                  onClick={() => {
                    handleOpenPopUp("font-header");
                  }}
                ></div>
              </div>
            </div>
            <div className="inline-flex p-4 px-8 lg:px-4">
              <h4 className="px-4"> Body Color: </h4>
              <div
                className={`${openMenuPopUp !== "font-body" && "hidden"} color-picker-div font-menu-pop-up fixed right-0 top-1/3 flex scale-50 flex-col justify-center sm:right-auto sm:top-auto`}
              >
                <div>
                  <button
                    className="close-pop-up-btn absolute right-0"
                    onClick={() => {
                      handleOpenPopUp("");
                    }}
                  >
                    &#10005;
                  </button>
                  <HexColorPicker
                    className="z-10 mx-16 mt-16"
                    color={`${fontColorBody !== "" ? fontColorBody : invert(backgroundColor)}`}
                    onChange={handleSetFontColorBody}
                  />
                </div>
                <button
                  className="reset-pop-up-btn mx-auto my-6 w-1/2"
                  onClick={() => handleSetFontColorBody("")}
                >
                  Reset
                </button>
              </div>
              <div
                className="color-box"
                style={
                  fontColorBody !== ""
                    ? { backgroundColor: `${fontColorBody}` }
                    : {
                        backgroundColor: `${invert(backgroundColor)}`,
                      }
                }
                onClick={() => {
                  handleOpenPopUp("font-body");
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Font;
