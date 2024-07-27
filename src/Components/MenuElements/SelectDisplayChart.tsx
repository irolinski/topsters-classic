type MenuContentProps = {
  tableMode: string;
  changeDisplayedChart: (chartName: string) => void;
};

const SelectDisplayChart = ({ changeDisplayedChart }: MenuContentProps) => {
  const savedCharts = Object.keys({ ...localStorage });

  const currentChartName: string =
    sessionStorage.getItem("selectedChart") ?? "{}";
  return (
    <>
      <div
        className="inline-flex w-[250px] min-w-[66%] border-b pb-8 lg:border-none lg:pb-4"
        tabIndex={-1}
      >
        <h2 className="pr-4" id="display-chart-label">
          Display:
        </h2>
        <select
          className="select-chart-display-input max-w-[150px]"
          value={currentChartName}
          onChange={(evt) => {
            changeDisplayedChart(evt.target.value);
          }}
          aria-label="select chart to display"
        >
          <>
            {savedCharts[1] ? (
              <>
                <option disabled id="new-chart-label">
                  {" "}
                  Create a new chart:{" "}
                </option>
                <option value="newChart" aria-label="create a new chart">
                  New chart
                </option>
                <option disabled aria-hidden="true">
                  {" "}
                  --------------{" "}
                </option>
                <option disabled> Load saved charts: </option>
                {savedCharts.map((ch: string, i: number) => {
                  if (ch !== "newChart") {
                    return (
                      <option
                        className=""
                        value={ch}
                        aria-label="load-chart"
                        key={i}
                      >
                        {ch}
                      </option>
                    );
                  }
                })}
              </>
            ) : (
              <option value="newChart" aria-label="Create new chart">
                New Chart
              </option>
            )}
          </>
        </select>
      </div>
    </>
  );
};

export default SelectDisplayChart;
