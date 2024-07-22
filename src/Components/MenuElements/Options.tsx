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
          <div
            className="open-accordion-btn inline-flex w-full"
            onClick={() => handleOpenAccordion("options")}
          >
            <h3 className="font-bold">Options</h3>{" "}
            {openAccordion === "options" ? (
              <button className="no-style mx-4">－</button>
            ) : (
              <button className="no-style mx-4">＋</button>
            )}{" "}
          </div>{" "}
          <div
            className={`menu-accordion ${openAccordion === "options" && "open"}`}
          >
            <div className="flex px-4">
              <h4 className="p-4">Hide album titles:</h4>
              <input
                className=""
                type="checkbox"
                defaultChecked={hideAlbumTitles}
                onChange={() => handleSetHideAlbumTitles(!hideAlbumTitles)}
              />
            </div>
            <div className="flex px-4 pb-[8px]">
              <h4 className="p-4">Enable shadows:</h4>
              <input
                className=""
                type="checkbox"
                defaultChecked={enableShadows}
                onChange={() => handleSetEnableShadows(!enableShadows)}
              />
            </div>
            <div className="export-options-div px-4 pb-[16px] pt-[8px]">
              <h4 className="block w-full p-4">Export quality: </h4>
              <select
                className="ml-8 max-h-12 w-[180px] max-w-full p-1"
                value={JSON.stringify(exportOptions)}
                onChange={(evt) => {
                  handleSetExportOptions(JSON.parse(evt.target.value));
                }}
              >
                {exportOptionList.map((o: { name: string; value: string }) => {
                  return <option value={o.value}>{o.name}</option>;
                })}
              </select>
            </div>
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
                  {/* // onClick={() => }> */}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Options;
