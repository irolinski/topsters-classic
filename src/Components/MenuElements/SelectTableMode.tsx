type MenuContentProps = {
  tableMode: string;
  handleTableModeChange: any;
};

const SelectTableMode = ({
  tableMode,
  handleTableModeChange,
}: MenuContentProps) => {
  return (
    <>
      {" "}
      <div className="inline-flex pb-4">
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
      </div>
    </>
  );
};

export default SelectTableMode;
