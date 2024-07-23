type footerPropTypes = {
  showAboutModal: boolean;
  handleSetShowAboutModal: (showAboutModal: boolean) => void;
};

const Footer = ({showAboutModal ,handleSetShowAboutModal }: footerPropTypes) => {
  return (
    <footer className="desktop-footer absolute bottom-0 left-0 flex w-full p-[24px]">
      <div className="w-full p-[24px] pt-[36px]">
        <span className="text-gray-100 mr-4 text-sm">
          Topsters Classic©️ 2024{" "}
        </span>
        <button
          className="no-style ml-4 font-bold"
          onClick={() => handleSetShowAboutModal(!showAboutModal)}
          aria-label="Open 'about' modal"
        >
          About
        </button>
      </div>
    </footer>
  );
};

export default Footer;
