import { useState } from "react";
import { openModalOptions } from "../../../models/models";
import About from "./Info/About";
import Changelog from "./Info/Changelog";
import HowTo from "./Info/HowTo";

type infoModalPropTypes = {
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
};

type infoContent = "about" | "changelog" | "how-to";

const InfoModal = ({ openModal, handleSetOpenModal }: infoModalPropTypes) => {
  const [showContent, setShowContent] = useState<infoContent>("changelog");

  return (
    <div
      className={`info-modal fixed z-30 block h-full w-full ${openModal === "info" ? "block" : "hidden"}`}
    >
      <div className="modal-body relative top-1/2 mx-auto min-h-[405px] w-[85vw] -translate-y-1/2 bg-gray p-8 text-center sm:w-[75vw] lg:w-[60vw] xl:w-[55vw]">
        <button
          className="no-style absolute right-0 top-0 m-4 p-4"
          onClick={() => handleSetOpenModal("")}
        >
          &#10005;
        </button>
        <div>
          <nav className="info-nav mb-6 mt-4 inline-flex">
            <button
              className={`bg-transparent px-2 font-bold text-sm sm:text-lg ${showContent === "how-to" && "active"}`}
              onClick={() => setShowContent("how-to")}
            >
              How-to
            </button>
            <button
              className={`bg-transparent px-2 font-bold text-sm sm:text-lg ${showContent === "changelog" && "active"}`}
              onClick={() => setShowContent("changelog")}
            >
              Changelog
            </button>
            <button
              className={`bg-transparent px-2 font-bold text-sm sm:text-lg ${showContent === "about" && "active"}`}
              onClick={() => setShowContent("about")}
            >
              About
            </button>
          </nav>
          <section className="max-h-[440px] overflow-x-hidden overflow-y-scroll">
            {showContent === "how-to" && <HowTo />}
            {showContent === "changelog" && <Changelog />}
            {showContent === "about" && <About />}
          </section>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
