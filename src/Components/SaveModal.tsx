import { useState } from "react";
import { saveCurrentChart } from "../utils/chartCRUD";
import { preventSpecialChar } from "../utils/preventSpecialChars";

type saveModalPropTypes = {
  showSaveModal: boolean;
  handleSetShowSaveModal: (showSaveModal: boolean) => void;
};

const SaveModal = ({
  showSaveModal,
  handleSetShowSaveModal,
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
        className={`about-modal fixed z-30 block h-full w-full ${showSaveModal ? "block" : "hidden"}`}
      >
        <div className="modal-body relative top-1/2 mx-auto min-h-[250px] w-[85vw] -translate-y-1/2 bg-gray p-12 text-center sm:w-[75vw] lg:w-[60vw] xl:w-[55vw]">
          <button
            className="no-style absolute right-0 top-0 m-4 p-4"
            onClick={() => handleSetShowSaveModal(!showSaveModal)}
          >
            &#10005;
          </button>
          <h2 className="p-4 text-2xl font-bold">Save chart</h2>
          <div className="pb-4">
            <p className="px-4 text-center text-xs md:px-16 lg:px-36">
              Ok, now, title your chart, click save, and it will stay here as
              long as you don't erase your browser cache.
            </p>
          </div>
          <div className="pt-8">
            <h3 className="px-4">Chart title:</h3>
            <div className="my-2 inline-flex h-8 w-3/4 items-stretch border">
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
              className={`export-button mx-4 my-8 w-1/3 ${!chartNameIsAvailable && "disabled"}`}
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
