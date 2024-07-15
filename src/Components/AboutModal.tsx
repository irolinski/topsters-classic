type aboutModalPropTypes = {
  showAboutModal: boolean;
  handleSetShowAboutModal: (showAboutModal: boolean) => void;
};

const AboutModal = ({
  showAboutModal,
  handleSetShowAboutModal,
}: aboutModalPropTypes) => {
  return (
    <>
      <div
        className={`about-modal absolute z-30 block h-full w-full ${showAboutModal ? "block" : "hidden"}`}
      >
        <div className="modal-body relative top-1/2 mx-auto min-h-[250px] w-[85vw] -translate-y-1/2 bg-gray p-12 text-center sm:w-[75vw] lg:w-[60vw] xl:w-[55vw]">
          <button
            className="no-style absolute right-0 top-0 m-4 p-4"
            onClick={() => handleSetShowAboutModal(!showAboutModal)}
          >
            &#10005;
          </button>
          <h2 className="p-4 text-2xl font-bold">About</h2>
          <p className="modal-text px-8 py-6 text-justify text-xs md:text-sm">
            Topsters Classic is a hobby project that I have made, channeling the
            nostalgia I have for the first Topsters page that I've used as a
            teen lurking music forums circa 2014. <br /> <br />
            The design of the charts is recreated from the charts made back then
            and the credit for it is due to the developer of the original
            version. The UI I have designed from scratch for it to be up to
            today's standards; especially in regards to mobile use. <br />{" "}
            <br />
            The code is{" "}
            <a className="underline" href="https://github.com/irolinski/top-40">
              available on github
            </a>{" "}
            if you wish to take a peek. <br /> <br /> If you have any bugs to
            report, you can reach me at igi.ro1998@gmail.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutModal;
