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
      <div className="inline-flex w-[250px] min-w-[66%] border-b pb-8 lg:border-none lg:pb-4">
        <h2 className="pr-4">Display:</h2>
        <select
          className="max-w-[150px] select-chart-display-input"
          value={currentChartName}
          onChange={(evt) => {
            changeDisplayedChart(evt.target.value);
          }}
        >
          <>
            {savedCharts[1] ? (
              <>
                <option disabled> Create a new chart: </option>
                <option value="newChart">New chart</option>
                <option disabled> -------------- </option>
                <option disabled> Load saved charts: </option>
                {savedCharts.map((ch: string) => {
                  if (ch !== "newChart") {
                    return (
                      <option className="" value={ch}>
                        {ch}
                      </option>
                    );
                  }
                })}
              </>
            ) : (
              <option value="newChart">New Chart</option>
            )}
          </>
        </select>
      </div>
    </>
  );
};

export default SelectDisplayChart;
