type MenuContentProps = {
  tableMode: string;
  currentChartName: string
  // handleTableModeChange: (tableMode: string) => void;
  changeDisplayedChart: (chartName: string) => void;
};

const SelectTableMode = ({
  // tableMode,
  // handleTableModeChange,
  currentChartName,
  changeDisplayedChart,
}: MenuContentProps) => {
  const savedCharts = Object.keys({ ...localStorage });
  
  return (
    <>
      <div className="inline-flex pb-4">
        <h2 className="pr-4">Display:</h2>
        <select
          className="max-w-[150px]"
          value={currentChartName}
          onChange={(evt) => {
            changeDisplayedChart(evt.target.value);
            console.log(evt.target.value);
            console.log(JSON.parse(localStorage.getItem(`${evt.target.value}`) ?? "{}"));
          }}
        >
          <>
            {savedCharts.map((ch: string) => {
              return (
                <option className="" value={ch}>
                  {ch}
                </option>
              );
            })}
          </>
        </select>
        {/* <select
          className="max-w-[150px]"
          value={tableMode}
          // onChange={(evt) => {
          //   changeDisplayedChart(evt.target.value);
          // }}
        >
          {/* <option value="currentChart">Current Chart</option> /}
        </select> */}
      </div>
      {/* <div className="inline-flex pb-4">
        <h2 className="pr-4">Chart type:</h2>
        <select
          value={tableMode}
          onChange={(evt) => {
            handleTableModeChange(evt.target.value);
          }}
        >
          <option value="collage">Collage</option>
          <option value="top40">Top 40</option>
          <option value="top100">Top 100</option>
        </select>
        {/* <button className=" no-style max-w-[20px] ml-12">
          <img className="min-w-[10px]" src="/load_icon.svg"/>
        </button> /}
      </div> */}
    </>
  );
};

export default SelectTableMode;
