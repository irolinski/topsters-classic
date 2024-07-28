import { MutableRefObject } from "react";
import { exportAsImage } from "../../../utils/downloadImage";
import { openModalOptions } from "../../../models/models";

type MenuLinksPropTypes = {
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
  exportRef: MutableRefObject<HTMLInputElement | null>;
  exportOptions: { format: string; quality: number };
};

const MenuLinks = ({
  openModal,
  handleSetOpenModal,
  exportRef,
  exportOptions,
}: MenuLinksPropTypes) => {
  return (
    <div
      className={`mobile-menu flex w-full justify-center lg:hidden ${openModal !== "" && "hidden"}`}
    >
      <button
        className="m-2"
        onClick={() => handleSetOpenModal("mobileMenu")}
        aria-label="Open mobile menu"
        tabIndex={openModal !== "" ? 1 : 0}
        aria-hidden={`${openModal !== "" ? "true" : "false"}`}
      >
        Customize
      </button>
      <button
        className="m-2"
        onClick={() => {
          exportAsImage(exportRef.current!, "title", exportOptions);
        }}
        aria-label="Download chart"
        tabIndex={openModal !== "" ? 1 : 0}
        aria-hidden={`${openModal !== "" ? "true" : "false"}`}
      >
        Export
      </button>
    </div>
  );
};

export default MenuLinks;
