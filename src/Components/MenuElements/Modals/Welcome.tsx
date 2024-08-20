import { useEffect } from "react";
import { openModalOptions } from "../../../models/models";

type aboutModalPropTypes = {
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
};

const WelcomeModal = ({
  openModal,
  handleSetOpenModal,
}: aboutModalPropTypes) => {
  useEffect(() => {
    if (localStorage.length === 0) {
      handleSetOpenModal("welcome");
    }
  }, []);

  return (
    <div
      className={`welcome-modal fixed z-30 block h-full w-full ${openModal === "welcome" ? "block" : "hidden"} `}
    >
      <div className="modal-body relative top-1/2 mx-auto min-h-[250px] -translate-y-1/2 bg-gray p-12 text-center xs:w-[85vw] sm:w-[75vw] lg:w-[60vw] xl:w-[55vw]">
        <button
          className="no-style absolute right-0 top-0 m-4 p-4"
          onClick={() => handleSetOpenModal("")}
        >
          &#10005;
        </button>
        <div>
          <h2 className="p-4 text-2xl font-bold">
            Welcome to <span className="text-danger">Topsters</span>!{" "}
          </h2>
          <div className="my-4 xs:mx-8 xs:my-12 lg:px-8">
            <h5 className="text-sm underline underline-offset-4">
              {" "}
              If it's your first time here, here's a{" "}
              <span className="font-bold">couple of things</span> you may want
              to know:{" "}
            </h5>
            <span className="px-8 pt-6 text-justify text-xs md:text-sm">
              <ul className="welcome-list list-disc">
                <li>
                  This website offers a way to{" "}
                  <span className="text-danger font-bold">
                    generate images with personal albums charts
                  </span>{" "}
                  that you can later post on forums, groups or{" "}
                  <span className="font-bold">share</span> with other people in
                  any way you like.
                </li>
                <li>
                  Everything here is{" "}
                  <span className="text-danger font-bold">auto-saved </span> in
                  browser storage so you don't have to worry you'll lose your
                  data.
                </li>
                <li>
                  "Save" button saves current chart for later and lets you start
                  a new one.
                </li>
                <li>
                  If you want to see a more detailed{" "}
                  <span className="font-bold"> manual</span>, report any bugs or
                  get to know more about this project, all is available under
                  the{" "}
                  <span className="text-danger font-bold">info section</span>{" "}
                  (button found in the footer)
                </li>
              </ul>
            </span>
          </div>
          <span className="mt-2 border-t pt-4 text-sm">
            I hope you'll have a{" "}
            <span className="font-bold underline underline-offset-4">
              good time
            </span>{" "}
            here!
          </span>
        </div>
        <button
          className="export-button mb-2 mt-12 min-w-[33%] max-w-[350px]"
          onClick={() => handleSetOpenModal("")}
          aria-label="Close mobile menu"
        >
          Let me in!
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
