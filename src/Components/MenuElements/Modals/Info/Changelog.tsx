import changelogData, { changelogDatum } from "../../../../assets/changelog";

const Changelog = () => {
  return (
    <div className="my-4">
      <div className="info-content sm:mx-4">
        <ul className="list-disc p-8 text-justify text-xs">
          {changelogData.map((ch: changelogDatum, i: number) => {
            return (
              <li
                className={`inline-flex w-full pb-8 ${i === changelogData.length - 1 && "border-b"} `}
              >
                <span className="mr-4 w-1/5">{ch.date}: </span>
                <span className="w-4/5">{ch.message}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Changelog;
