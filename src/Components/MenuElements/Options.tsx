import exportOptionList from "../../assets/exportOptionList";
import { deleteCurrentChart } from "../../utils/chartCRUD";

type optionPropTypes = {
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
  hideAlbumTitles: boolean;
  handleSetHideAlbumTitles: (isTrue: boolean) => void;
  enableShadows: boolean;
  handleSetEnableShadows: (isTrue: boolean) => void;
  exportOptions: { format: string; quality: number };
  handleSetExportOptions: ({
    format,
    quality,
  }: {
    format: string;
    quality: number;
  }) => void;
};

const Options = ({
  openAccordion,
  handleOpenAccordion,
  hideAlbumTitles,
  handleSetHideAlbumTitles,
  enableShadows,
  handleSetEnableShadows,
  exportOptions,
  handleSetExportOptions,
}: optionPropTypes) => {
  return (
    <>
      <div className="menu-block">
        <div>
          <button
            className="no-style open-accordion-btn inline-flex w-full"
            onClick={() => handleOpenAccordion("options")}
            aria-expanded={openAccordion === "options" ? true : false}
          >
            <span className="font-bold">Options</span>
            {openAccordion === "options" ? (
              <span className="no-style mx-4">－</span>
            ) : (
              <span className="no-style mx-4">＋</span>
            )}
          </button>
          <div
            className={`menu-accordion ${openAccordion === "options" && "open"}`}
          >
            <div className="flex px-4">
              <h4 className="p-4" id="hide-album-titles-label">
                Hide album titles:
              </h4>
              <input
                className=""
                type="checkbox"
                defaultChecked={hideAlbumTitles}
                onChange={() => handleSetHideAlbumTitles(!hideAlbumTitles)}
                aria-labelledby="hide-album-titles-label"
                tabIndex={openAccordion === "option" ? 0 : 1}
              />
            </div>
            <div className="flex px-4 pb-[8px]">
              <h4 className="p-4" id="enable-shadows-label">
                Enable shadows:
              </h4>
              <input
                className=""
                type="checkbox"
                defaultChecked={enableShadows}
                onChange={() => handleSetEnableShadows(!enableShadows)}
                aria-labelledby="enable-shadows-label"
                tabIndex={openAccordion === "option" ? 0 : 1}
              />
            </div>
            <div className="export-options-div px-4 pb-[16px] pt-[8px]">
              <h4 className="block w-full p-4" id="export-quality-label">
                Export quality:{" "}
              </h4>
              <select
                className="ml-8 max-h-12 w-[180px] max-w-full p-1"
                value={JSON.stringify(exportOptions)}
                onChange={(evt) => {
                  handleSetExportOptions(JSON.parse(evt.target.value));
                }}
                aria-labelledby="export-quality-label"
                tabIndex={openAccordion === "option" ? 0 : 1}
              >
                {exportOptionList.map((o: { name: string; value: string }) => {
                  return <option value={o.value}>{o.name}</option>;
                })}
              </select>
            </div>
            {sessionStorage.getItem("selectedChart") !== "newChart" && (
              <div className="delete-chart-div px-4 pt-[8px]">
                <h4 className="block w-full p-4">Delete chart: </h4>
                <div className="my-4 ml-16">
                  <button
                    className="delete min-w-24"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?",
                        )
                      )
                        deleteCurrentChart();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Options;
