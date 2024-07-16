type TitleProps = {
  openAccordion: string;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  handleOpenAccordion: (selectedAccordion: string) => void;
};

const Title = ({
  openAccordion,
  chartTitle,
  handleSetChartTitle,
  handleOpenAccordion,
}: TitleProps) => {
  return (
    <>
      {" "}
      <div className="menu-block">
        <div
          className="open-accordion-btn inline-flex"
          onClick={() => handleOpenAccordion("titles")}
        >
          <h3 className="w-full font-bold">Title</h3>{" "}
          {openAccordion === "titles" ? (
            <button className="no-style mx-4">－</button>
          ) : (
            <button className="no-style mx-4">＋</button>
          )}{" "}
        </div>{" "}
        <div
          className={`menu-accordion ${openAccordion === "titles" && "open"}`}
        >
          <div className="p-4">
            <h3 className="px-4">Chart title:</h3>
            <div className="chart-title-input my-2 inline-flex h-8 items-stretch border">
              <input
                className="w-3/4"
                type="text"
                value={chartTitle}
                onChange={async (evt) =>
                  handleSetChartTitle(evt.currentTarget.value)
                }
              />
              <button className="w-1/4" onClick={() => handleSetChartTitle("")}>
                <img
                  className="mx-auto max-h-[15px] min-w-[15px] max-w-[15px] -translate-y-[2.5px]"
                  src="/close_icon.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
