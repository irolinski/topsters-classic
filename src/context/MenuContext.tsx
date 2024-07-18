import { createContext, MutableRefObject, useRef, useState } from "react";
import { lastFmAlbum } from "../models/models";
import { collageEmpty, top100Empty, top40Empty } from "../assets/emptyCharts";

export const MenuContext = createContext<any>([[], () => null]);

const MenuContextProvider = (props: any) => {
  const [mobileMenuIsOpened, setMobileMenuIsOpened] = useState<boolean>(false);
  const handleSetMobileMenuIsOpened = (mobileMenuIsOpened: boolean) => {
    setMobileMenuIsOpened(!mobileMenuIsOpened);
  };
  const [openAccordion, setOpenAccordion] = useState<string>("");

  const closeAllWindows = () => {
    setOpenMenuPopUp("");
    setOpenAccordion("");
  };

  const handleOpenAccordion = (selectedAccordion: string) => {
    if (selectedAccordion !== "search") {
      openAccordion === selectedAccordion
        ? closeAllWindows()
        : (closeAllWindows(), setOpenAccordion(selectedAccordion));
    } else {
      setOpenAccordion("search");
    }
  };

  // set table mode - (collage || top40 || top100)
  const [tableMode, setTableMode] = useState("top40");
  const handleTableModeChange = (mode: string) => {
    setTableMode(mode);
    setSelectedIndex(0);
  };

  // collage options
  const [collageRowNum, setCollageRowNum] = useState<number>(4);
  const handleSetCollageRowNum = (val: number) => {
    setCollageRowNum(val);
  };
  const [collageColNum, setCollageColNum] = useState<number>(4);
  const handleSetCollageColNum = (val: number) => {
    setCollageColNum(val);
  };
  // chart states
  const [collageData, setCollageData] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(collageEmpty);
  const [top40Data, setTop40Data] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(top40Empty);
  const [top100Data, setTop100Data] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(top100Empty);

  //set chart title
  const [chartTitle, setChartTitle] = useState<string>("");
  const handleSetChartTitle = (newTitle: string) => {
    setChartTitle(newTitle);
  };

  //customize chart
  const [hideAlbumTitles, setHideAlbumTitles] = useState<boolean>(false);
  const handleSetHideAlbumTitles = (isTrue: boolean) =>
    setHideAlbumTitles(isTrue);

  // set background image
  // (sizes have to be defined as variables for they are crucial to get the offset right)
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const handleSetBackgroundImg = (url: string) => {
    setBackgroundImg(url);
  };
  const [backgroundImgPosition, setBackgroundImgPosition] = useState({
    x: 0,
    y: 0,
  });

  // auto/cover/contain
  const [backgroundImgMode, setBackgroundImgMode] = useState<string>("cover");
  const handleSetBackgroundImgMode = (newMode: string) => {
    setBackgroundImgMode(newMode);
  };

  const backgroundPositionMenu = {
    boxSizeXY: 190, // the size of the container
    dotSizeXY: 30, // the size of the pointer dot
    centerDot: 80, // center of the scale
  };

  const handleBackgroundPositionChange = (dragX: any, dragY: any) => {
    const scaleEnd =
      backgroundPositionMenu.boxSizeXY - backgroundPositionMenu.dotSizeXY;

    const offsetX = Math.floor((dragX / scaleEnd) * 100);
    const offsetY = Math.floor((dragY / scaleEnd) * 100);

    setBackgroundImgPosition({ x: offsetX, y: offsetY });
  };

  // choose font
  const [fontFamily, setFontFamily] = useState<string>("Space Mono");
  const handleSetFontFamily = (newFontName: string) => {
    setFontFamily(newFontName);
  };

  //set colors
  const [fontColorBody, setfontColorBody] = useState<string>("");
  const handleSetFontColorBody = (newColor: string) => {
    setfontColorBody(newColor);
  };
  const [fontColorHeader, setfontColorHeader] = useState<string>("");
  const handleSetFontColorHeader = (newColor: string) => {
    setfontColorHeader(newColor);
  };

  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const handleSetBackgroundColor = (newColor: string) => {
    setBackgroundColor(newColor);
  };
  const [openMenuPopUp, setOpenMenuPopUp] = useState<string>("");

  const handleOpenPopUp = (selectedPopUp: string) => {
    if (selectedPopUp !== "") {
      openMenuPopUp !== selectedPopUp
        ? setOpenMenuPopUp(selectedPopUp)
        : setOpenMenuPopUp("");
    } else {
      setOpenMenuPopUp("");
    }
  };

  // enable/disable shadows
  const [enableShadows, setEnableShadows] = useState<boolean>(true);
  const handleSetEnableShadows = (isTrue: boolean) => setEnableShadows(isTrue);

  // insert image onto canvas
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const changeIndex = (i: number) => {
    setSelectedIndex(i);
  };
  const [loadingImage, setLoadingImage] = useState<number>(999);
  const handleImageLoaded = () => setLoadingImage(999);
  const [chartDirty, setChartDirty] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);

  const drawAlbumToCanvas = (index: number, album: lastFmAlbum) => {
    setLoadingImage(index);

    if (tableMode === "collage") {
      let updatedArr = collageData;
      updatedArr[index] = album;
      setCollageData(updatedArr); //or other table type
      selectedIndex < collageColNum * collageRowNum - 1
        ? setSelectedIndex(selectedIndex + 1)
        : setSelectedIndex(0);
    }

    if (tableMode === "top40") {
      let updatedArr = top40Data;
      updatedArr[index] = album;
      setTop40Data(updatedArr);
      selectedIndex < 50 - 1
        ? setSelectedIndex(selectedIndex + 1)
        : setSelectedIndex(0);
    }

    if (tableMode === "top100") {
      let updatedArr = top100Data;
      updatedArr[index] = album;
      setTop100Data(updatedArr);
      selectedIndex < 100 - 1
        ? setSelectedIndex(selectedIndex + 1)
        : setSelectedIndex(0);
    }

    // this is to force a rerender in a gentle way
    setRefresh(true);
    setRefresh(!refresh);
    setChartDirty(true);
  };

  //file input ref
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  //export image
  const exportRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [exportOptions, setExportOptions] = useState<{
    format: string;
    quality: number;
  }>({
    format: "image/jpeg",
    quality: 0.5,
  });
  const handleSetExportOptions = (options: {
    format: string;
    quality: number;
  }) => {
    setExportOptions(options);
  };

  // about modal

  const [showAboutModal, setShowAboutModal] = useState(false);
  const handleSetShowAboutModal = () => setShowAboutModal(!showAboutModal);

  return (
    <MenuContext.Provider
      value={{
        mobileMenuIsOpened,
        handleSetMobileMenuIsOpened,
        openAccordion,
        closeAllWindows,
        handleOpenAccordion,
        tableMode,
        handleTableModeChange,
        collageRowNum,
        handleSetCollageRowNum,
        collageColNum,
        handleSetCollageColNum,
        collageData,
        top40Data,
        top100Data,
        chartTitle,
        handleSetChartTitle,
        hideAlbumTitles,
        handleSetHideAlbumTitles,
        backgroundImg,
        handleSetBackgroundImg,
        backgroundImgPosition,
        backgroundImgMode,
        handleSetBackgroundImgMode,
        backgroundPositionMenu,
        handleBackgroundPositionChange,
        fontFamily,
        handleSetFontFamily,
        fontColorBody,
        handleSetFontColorBody,
        fontColorHeader,
        handleSetFontColorHeader,
        backgroundColor,
        handleSetBackgroundColor,
        openMenuPopUp,
        handleOpenPopUp,
        enableShadows,
        handleSetEnableShadows,
        selectedIndex,
        changeIndex,
        loadingImage,
        handleImageLoaded,
        chartDirty,
        refresh,
        drawAlbumToCanvas,
        inputRef,
        exportRef,
        exportOptions,
        handleSetExportOptions,
        showAboutModal,
        handleSetShowAboutModal,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
