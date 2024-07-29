import { openModalOptions } from "../../../models/models";

type aboutModalPropTypes = {
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
};

const AboutModal = ({ openModal, handleSetOpenModal }: aboutModalPropTypes) => {
  return (
    <>
      <div
        className={`about-modal fixed z-30 block h-full w-full ${openModal === "about" ? "block" : "hidden"}`}
      >
        <div className="modal-body relative top-1/2 mx-auto min-h-[250px] w-[85vw] -translate-y-1/2 bg-gray p-12 text-center sm:w-[75vw] lg:w-[60vw] xl:w-[55vw]">
          <button
            className="no-style absolute right-0 top-0 m-4 p-4"
            onClick={() => handleSetOpenModal("")}
          >
            &#10005;
          </button>
          <h2 className="p-4 text-2xl font-bold">About</h2>
          <p className="modal-text px-8 py-6 text-justify text-xs md:text-sm">
            Topsters Classic is a <b>hobby project</b> that I have made,
            channeling my <b>nostalgia for the original Topsters page</b> that
            I've used as a teen lurking music forums circa 2013. <br /> <br />
            The design of the charts is{" "}
            <b>recreated from the original charts designs</b>
            and the credit for them is due to the developer of the original app.
            The <b>UI is designed from scratch</b> for it to be up to today's
            standards; especially in regards to mobile use. <br /> <br />
            The code is{" "}
            <a
              className="underline"
              href="https://github.com/irolinski/topsters-classic"
            >
              <b>available on github</b>
            </a>{" "}
            if you wish to take a peek. <br /> <br /> If you have any bugs to
            report or wish to collaborate, you can reach me at{" "}
            <a
              className="underline"
              href="mailto:neverendingchartequations@gmail.com"
            >
              neverendingchartequations@gmail.com
            </a>
            .
            <br /> <br /> I hope you'll get some use out of my work. <br />{" "}
            <br /> Cheers.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutModal;
