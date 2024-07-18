import { exportAsImage } from "../../../utils/downloadImage";

const MenuLinks = ({
  mobileMenuIsOpened,
  handleSetMobileMenuIsOpened,
  exportRef,
  exportOptions,
}: any) => {
  return (
    <div className="mobile-menu flex w-full justify-center lg:hidden">
      <button
        className="m-2"
        onClick={() => handleSetMobileMenuIsOpened(mobileMenuIsOpened)}
      >
        Customize
      </button>
      <button
        className="m-2"
        onClick={() => {
          exportAsImage(exportRef.current, "title", exportOptions);
        }}
      >
        {" "}
        Export
      </button>
    </div>
  );
};

export default MenuLinks;
