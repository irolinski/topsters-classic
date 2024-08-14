const HowTo = () => {
  return (
    <div className="my-4">
      <div className="info-content p-8 sm:mx-4">
        <ol className="list-decimal px-2 text-xs sm:px-8">
          <li className="pb-8 text-left">
            Choose the type of chart you wish to make.
          </li>
          <li className="pb-8 text-left">
            Search for what you want to find and add albums by clicking on their
            images. <br /> <br /> The selected spot on the chart advances
            automatically after every added album but you can also choose the
            selected spot manually by simply clicking on it.
          </li>
          <li className="pb-8 text-left">
            Customize the look of your chart however you see fit.
          </li>
          <li className="pb-8 text-left">
            When you're finished you can EXPORT the image and then post it
            wherever you wish.
          </li>
          <li className="pb-8 text-left">
            ALl changes are saved automatically but if you want to come back to
            you chart later save it in your browser storage by clicking SAVE.{" "}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowTo;
