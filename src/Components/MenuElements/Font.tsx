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
          <div
            className="open-accordion-btn inline-flex w-full"
            onClick={() => handleOpenAccordion("font")}
          >
            <h3 className="font-bold">Font</h3>{" "}
            {openAccordion === "font" ? (
              <button className="no-style mx-4">－</button>
            ) : (
              <button className="no-style mx-4">＋</button>
            )}{" "}
          </div>{" "}
          <div
            className={`menu-accordion ${openAccordion === "font" && "open"}`}
          >
            <div className="px-4">
              <h4 className="block w-full p-4">Family: </h4>
              <select
                className="ml-8 max-h-12 w-[180px] max-w-full p-1"
                value={fontFamily}
                onChange={(evt) => handleSetFontFamily(evt.target.value)}
              >
                <>
                  {fontList.map((style: { name: string; fonts: string[] }) => {
                    return (
                      <>
                        {" "}
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
            <h4 className="block w-full px-8 pt-4 lg:hidden">Header: </h4>
            <div className="inline-flex p-4 px-8 lg:px-4">
              <h4 className="px-4"> Header Color: </h4>
              <div
                className={`${openMenuPopUp !== "font-header" && "hidden"} color-picker-div font-menu-pop-up absolute flex scale-50 flex-col justify-center`}
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
            <div className="inline-flex p-4 px-8 lg:px-4">
              <h4 className="px-4"> Body Color: </h4>
              <div
                className={`${openMenuPopUp !== "font-body" && "hidden"} color-picker-div font-menu-pop-up absolute flex scale-50 flex-col justify-center`}
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
