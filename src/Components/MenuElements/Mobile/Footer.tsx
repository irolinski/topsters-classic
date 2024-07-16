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
  useEffect(() => {
    function handleResize() {
      const h = document.body.offsetHeight;
      setDocumentHeight(h);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
console.log(documentHeight)
  return (
    <footer
      className="mobile-footer absolute flex w-full p-[12px] lg:hidden"
      style={{ top: `${documentHeight}px`, height: "100px" }}
    >
      <div className="inline-flex w-full justify-around p-[24px]">
        <span className="text-gray-100 text-md mr-4">
          Topsters Classic©️ 2024{" "}
        </span>
        <button
          className="no-style ml-4 -translate-y-[2px] font-bold"
          onClick={() => handleSetShowAboutModal(!showAboutModal)}
        >
          <img className="min-w-[25px]" src="/info_icon.svg" />
        </button>
      </div>
    </footer>
  );
};

export default FooterMobile;
