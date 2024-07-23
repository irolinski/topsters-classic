import { useEffect, useState } from "react";
import { openModalOptions } from "../../../models/models";

type footerPropTypes = {
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
};

const FooterMobile = ({ openModal, handleSetOpenModal }: footerPropTypes) => {
  const [documentHeight, setDocumentHeight] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    function handleResize() {
      const h = document.body.offsetHeight;
      setDocumentHeight(h);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return (
    <footer
      className={`mobile-footer absolute flex w-full lg:hidden ${openModal !== "" && "hidden"}`}
      style={{ top: `${documentHeight}px`, height: "100px" }}
    >
      <div className="mx-12 flex w-full items-center justify-around pb-2 opacity-60 sm:mx-16">
        <span className="text-gray-100 sm:text-md mr-4 text-xs">
          Topsters Classic©️ 2024{" "}
        </span>
        <button
          className="no-style opacity-50:focus ml-4 -translate-y-[2px] font-bold"
          onClick={() => handleSetOpenModal("about")}
          aria-label="Open 'about' modal"
        >
          <img
            className="min-w-[25px]"
            src="/info_icon.svg"
            tabIndex={1}
            aria-hidden="true"
          />
        </button>
      </div>
    </footer>
  );
};

export default FooterMobile;
