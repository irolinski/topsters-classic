import { MutableRefObject } from "react";
import { exportAsImage } from "../../../utils/downloadImage";

type MenuLinksPropTypes = {
  mobileMenuIsOpened: boolean;
  handleSetMobileMenuIsOpened: (mobileMenuIsOpened: boolean) => void;
  exportRef: MutableRefObject<HTMLInputElement | null>;
  exportOptions: { format: string; quality: number };
};

const MenuLinks = ({
  mobileMenuIsOpened,
  handleSetMobileMenuIsOpened,
  exportRef,
  exportOptions,
}: MenuLinksPropTypes) => {
  return (
    <div
      className={`mobile-menu flex w-full justify-center lg:hidden ${mobileMenuIsOpened === true && "hidden"}`}
    >
      <button
        className="m-2"
        onClick={() => handleSetMobileMenuIsOpened(mobileMenuIsOpened)}
        aria-label="Open mobile menu"
        tabIndex={mobileMenuIsOpened ? 1 : 0}
        aria-hidden={`${mobileMenuIsOpened && "true"}`}
      >
        Customize
      </button>
      <button
        className="m-2"
        onClick={() => {
          exportAsImage(exportRef.current, "title", exportOptions);
        }}
        aria-label="Download chart"
        tabIndex={mobileMenuIsOpened ? 1 : 0}
        aria-hidden={`${mobileMenuIsOpened && "true"}`}
      >
        Export
      </button>
    </div>
  );
};

export default MenuLinks;
