import { openAccordionOptions } from "../../models/models";
import { preventSpecialChar } from "../../utils/preventSpecialChars";

type TitleProps = {
  openAccordion: openAccordionOptions;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  handleOpenAccordion: (selectedAccordion: openAccordionOptions) => void;
};

const Title = ({
  openAccordion,
  chartTitle,
  handleSetChartTitle,
  handleOpenAccordion,
}: TitleProps) => {
  return (
    <>
      <div className="menu-block">
        <button
          className="no-style open-accordion-btn inline-flex"
          onClick={() => handleOpenAccordion("titles")}
          aria-label="Open chart title settings accordion"
          aria-expanded={openAccordion === "titles" ? true : false}
          tabIndex={0}
        >
          <span className="w-full font-bold">Title</span>
          {openAccordion === "titles" ? (
            <span className="no-style mx-4">－</span>
          ) : (
            <span className="no-style mx-4">＋</span>
          )}
        </button>
        <div
          className={`menu-accordion ${openAccordion === "titles" && "open"}`}
        >
          <div className="p-4">
            <h3 className="px-4">Chart title:</h3>
            <div className="chart-title-input my-2 inline-flex h-8 items-stretch border">
              <input
                className="w-3/4"
                type="text"
                onKeyDown={(evt) => preventSpecialChar(evt)}
                maxLength={32}
                value={chartTitle}
                onChange={async (evt) =>
                  handleSetChartTitle(evt.currentTarget.value)
                }
                aria-label="Set chart header title"
                tabIndex={openAccordion === "titles" ? 0 : 1}
                aria-hidden={`${openAccordion !== "titles" ? "true" : "false"}`}
              />
              <button
                className="w-1/4"
                onClick={() => handleSetChartTitle("")}
                aria-label="Erase chart name"
                tabIndex={openAccordion === "titles" ? 0 : 1}
                aria-hidden={`${openAccordion !== "titles" ? "true" : "false"}`}
              >
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
