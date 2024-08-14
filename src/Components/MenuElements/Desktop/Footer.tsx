import { openModalOptions } from "../../../models/models";

type footerPropTypes = {
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
};

const Footer = ({ handleSetOpenModal }: footerPropTypes) => {
  return (
    <footer className="desktop-footer absolute bottom-0 left-0 flex w-full p-[24px]">
      <div className="w-full p-[24px] pt-[36px]">
        <span className="text-gray-100 mr-4 text-sm">
          Topsters Classic©️ 2024{" "}
        </span>
        <button
          className="no-style ml-4 font-bold"
          onClick={() => handleSetOpenModal("info")}
          aria-label="Open 'info' modal"
        >
          Info
        </button>
      </div>
    </footer>
  );
};

export default Footer;
