import { useState } from "react";
import { saveCurrentChart } from "../../../utils/chartCRUD";
import { preventSpecialChar } from "../../../utils/preventSpecialChars";
import { openModalOptions } from "../../../models/models";

type saveModalPropTypes = {
  openModal: openModalOptions
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
};

const SaveModal = ({
  openModal,
  handleSetOpenModal,
}: saveModalPropTypes) => {
  const allChartNames = Object.keys(localStorage);

  const [savedChartTitle, setSavedChartTitle] = useState(
    `My Chart ${allChartNames.length}`,
  );

  const [chartNameIsAvailable, setChartNameIsAvailable] =
    useState<boolean>(true);

  const checkIsNameAvailable = (name: string) => {
    allChartNames.includes(name)
      ? setChartNameIsAvailable(false)
      : setChartNameIsAvailable(true);
  };

  return (
    <>
      <div
        className={`info-modal fixed z-30 block h-full w-full ${openModal === "save" ? "block" : "hidden"}`}
      >
        <div className="modal-body relative top-1/2 mx-auto min-h-[250px] w-[85vw] -translate-y-1/2 bg-gray p-12 text-center sm:w-[75vw] lg:w-[55vw] xl:w-[50vw]">
          <button
            className="no-style absolute right-0 top-0 m-4 p-4"
            onClick={() => handleSetOpenModal("")}
          >
            &#10005;
          </button>
          <h2 className="pb-4 text-2xl font-bold">Save chart</h2>
          <div className="">
            <p className="text-center text-xs opacity-70 md:px-[10vw]">
              Ok, now title your chart, click save, and it will stay here as
              long as you don't erase your browser cache.
            </p>
          </div>
          <div className="pt-8">
            <h3 className="px-4 py-2">Chart title:</h3>
            <div className="my-2 inline-flex h-8 w-3/4 max-w-[400px] items-stretch border md:w-2/3">
              <input
                className="w-full px-2"
                type="text"
                maxLength={24}
                value={savedChartTitle}
                onKeyDown={(evt) => preventSpecialChar(evt)}
                onChange={async (evt) => {
                  setSavedChartTitle(evt.currentTarget.value);
                  checkIsNameAvailable(evt.currentTarget.value);
                }}
              />
            </div>
            <div className="py-2">
              {!chartNameIsAvailable && (
                <p className="text-error text-xs">
                  You have to pick a name that you haven't used before!
                </p>
              )}
            </div>
            <button
              className={`export-button mx-4 my-8 w-1/3 max-w-[150px] ${!chartNameIsAvailable && "disabled"}`}
              disabled={!chartNameIsAvailable}
              onClick={() => {
                if (!chartNameIsAvailable) {
                  return;
                } else {
                  saveCurrentChart(savedChartTitle);
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveModal;
