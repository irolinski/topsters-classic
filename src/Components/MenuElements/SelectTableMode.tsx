import { tableModeOptions } from "../../models/models";

type selectTableModePropTypes = {
  tableMode: tableModeOptions;
  handleTableModeChange: (tableMode: tableModeOptions | string) => void;
};

const SelectTableMode = ({
  tableMode,
  handleTableModeChange,
}: selectTableModePropTypes) => {
  return (
    <>
      {sessionStorage.getItem("selectedChart") === "newChart" && (
        <div className="inline-flex w-[250px] min-w-[66%] border-b py-8 lg:border-none lg:py-0">
          <h2 className="pr-4" id="chart-type-label">
            Chart type:
          </h2>
          <select
            value={tableMode}
            onChange={(evt) => {
              handleTableModeChange(evt.target.value);
            }}
            aria-labelledby="chart-type-label"
          >
            <option value="collage">Collage</option>
            <option value="top40">Top 40</option>
            <option value="top100">Top 100</option>
          </select>
        </div>
      )}
    </>
  );
};

export default SelectTableMode;
