import { useEffect, useState } from "react";

type footerPropTypes = {
  showAboutModal: boolean;
  handleSetShowAboutModal: (showAboutModal: boolean) => void;
  mobileMenuIsOpened: boolean;
};

const FooterMobile = ({
  showAboutModal,
  handleSetShowAboutModal,
  mobileMenuIsOpened
}: footerPropTypes) => {
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
      className={`mobile-footer absolute flex w-full  lg:hidden ${mobileMenuIsOpened === true && "hidden"}`}
      style={{ top: `${documentHeight}px`, height: "100px" }}
    >
      <div className="flex items-center opacity-60 w-full justify-around mx-12 sm:mx-16 pb-2 ">
        <span className="text-gray-100 text-xs sm:text-md mr-4">
          Topsters Classic©️ 2024{" "}
        </span>
        <button
          className="no-style ml-4 -translate-y-[2px] font-bold opacity-50:focus"
          onClick={() => handleSetShowAboutModal(!showAboutModal)}
          aria-label="Open 'about' modal"
        >
          <img className="min-w-[25px]" src="/info_icon.svg" tabIndex={1} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};

export default FooterMobile;
