import { useEffect, useState } from "react";

type footerPropTypes = {
  showAboutModal: boolean;
  handleSetShowAboutModal: (showAboutModal: boolean) => void;
};

const FooterMobile = ({
  showAboutModal,
  handleSetShowAboutModal,
}: footerPropTypes) => {
  const [documentHeight, setDocumentHeight] = useState<number | undefined>(
    undefined,
  );

  function getDocumentHeight() {
    useEffect(() => {
      const h = document.body.offsetHeight;
      function handleResize() {
        setDocumentHeight(h);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return documentHeight;
  }

  const offsetTopValue: string = `${getDocumentHeight()}px`
  return (
    <footer
      className="mobile-footer absolute flex w-full p-[12px] lg:hidden"
      style={{ top: `${offsetTopValue}`, height: "100px" }}
    >
      <div className="w-full p-[24px] inline-flex justify-around">
        <span className="text-gray-100 mr-4 text-md">
          Topsters Classic©️ 2024{" "}
        </span>
        <button
          className="no-style ml-4 font-bold -translate-y-[2px]"
          onClick={() => handleSetShowAboutModal(!showAboutModal)}
        >
          <img className="min-w-[25px]" src="/info_icon.svg" />
        </button>
      </div>
    </footer>
  );
};

export default FooterMobile;
