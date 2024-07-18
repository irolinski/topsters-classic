type collageSettingsPropTypes = {
  tableMode: string;
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
  collageRowNum: number;
  collageColNum: number;
  handleSetCollageRowNum: (val: number) => void;
  handleSetCollageColNum: (val: number) => void;
  
};

const CollageSettings = ({
  tableMode,
  openAccordion,
  handleOpenAccordion,
  collageRowNum,
  handleSetCollageRowNum,
  collageColNum,
  handleSetCollageColNum,
}: collageSettingsPropTypes) => {
  return (
    <>
      {tableMode === "collage" && (
        <div className="menu-block">
          <div
            className="open-accordion-btn inline-flex"
            onClick={() => handleOpenAccordion("collage-settings")}
          >
            <h3 className="w-full font-bold">Collage parameters</h3>{" "}
            {openAccordion === "collage-settings" ? (
              <button className="no-style mx-4">－</button>
            ) : (
              <button className="no-style mx-4">＋</button>
            )}{" "}
          </div>
          <div
            className={`menu-accordion ${openAccordion === "collage-settings" && "open"}`}
          >
            <div className="inline-flex w-full p-4">
              <h4 className="px-4">Rows:</h4>
              <select
                value={collageRowNum}
                onChange={(evt) =>
                  handleSetCollageRowNum(Number(evt.target.value))
                }
              >
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>
            <div className="inline-flex w-full p-4">
              <h4 className="px-4">Columns:</h4>
              <select
                value={collageColNum}
                onChange={(evt) =>
                  handleSetCollageColNum(Number(evt.target.value))
                }
              >
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollageSettings;
