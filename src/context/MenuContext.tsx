import { createContext, MutableRefObject, useRef, useState } from "react";
import {
  chartSavedData,
  darkenBackgroundOptions,
  lastFmAlbum,
  openAccordionOptions,
  openModalOptions,
  openPopUpOptions,
  tableModeOptions,
} from "../models/models";
import {
  collageEmpty,
  defaultChart,
  top100Empty,
  top40Empty,
} from "../assets/emptyCharts";
import { allContextPropTypes } from "../models/menuProps";

type ContextProviderProps = {
  children: React.ReactNode;
};

export const MenuContext = createContext<allContextPropTypes>(
  null as unknown as allContextPropTypes,
);

const MenuContextProvider = (props: ContextProviderProps) => {
  // choose chart to display
  const selectedChartName: string =
    sessionStorage.getItem("selectedChart") ?? "newChart";

  // check for saved currentChart in localStorage

  const currentChart: chartSavedData = JSON.parse(
    localStorage.getItem(`${selectedChartName}`) ?? "{}",
  );
  // it's important to have the empty object instead of just empty string here because otherwise JSON.parse error bugs out the whole code and the app does not open if there is no currentChart in localStorage
  const changeDisplayedChart = (chartName: string) => {
    sessionStorage.setItem("selectedChart", `${chartName}`);
    window.location.reload();
  };

  // menu navigation states
  const [openAccordion, setOpenAccordion] = useState<openAccordionOptions>("");

  const closeAllWindows = () => {
    setOpenMenuPopUp("");
    setOpenAccordion("");
  };

  const handleOpenAccordion = (selectedAccordion: openAccordionOptions) => {
    if (selectedAccordion !== "search") {
      openAccordion === selectedAccordion
        ? closeAllWindows()
        : (closeAllWindows(), setOpenAccordion(selectedAccordion));
    } else {
      setOpenAccordion("search");
    }
  };

  // choose tableMode
  const [tableMode, setTableMode] = useState<tableModeOptions | string>(
    currentChart.tableMode ?? defaultChart.tableMode,
  );
  const handleTableModeChange = (modeToSet: tableModeOptions | string) => {
    setTableMode(modeToSet);
    setSelectedIndex(0);
  };

  // collage chart options
  const [collageRowNum, setCollageRowNum] = useState<number>(
    currentChart.collageRowNum ?? defaultChart.collageRowNum,
  );
  const handleSetCollageRowNum = (val: number) => {
    setCollageRowNum(val);
  };
  const [collageColNum, setCollageColNum] = useState<number>(
    currentChart.collageColNum ?? defaultChart.collageColNum,
  );
  const handleSetCollageColNum = (val: number) => {
    setCollageColNum(val);
  };

  // chart Data states
  const [collageData, setCollageData] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(currentChart.collageData ?? collageEmpty);
  const [top40Data, setTop40Data] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(currentChart.top40Data ?? top40Empty);
  const [top100Data, setTop100Data] = useState<
    lastFmAlbum[] | Record<string, never>[]
  >(currentChart.top100Data ?? top100Empty);

  //chart title states
  const [chartTitle, setChartTitle] = useState<string>(
    currentChart.chartTitle ?? defaultChart.chartTitle,
  );
  const handleSetChartTitle = (newTitle: string) => {
    setChartTitle(newTitle);
  };

  //customize chart
  const [hideAlbumTitles, setHideAlbumTitles] = useState<boolean>(
    currentChart.hideAlbumTitles ?? defaultChart.hideAlbumTitles,
  );
  const handleSetHideAlbumTitles = (isTrue: boolean) =>
    setHideAlbumTitles(isTrue);
  const [enableShadows, setEnableShadows] = useState<boolean>(
    currentChart.enableShadows ?? defaultChart.enableShadows,
  );
  const handleSetEnableShadows = (isTrue: boolean) => setEnableShadows(isTrue);

  // set background image
  // (sizes have to be defined as variables for they are crucial to get the offset right)
  const [backgroundImg, setBackgroundImg] = useState<string>(
    currentChart.backgroundImg ?? defaultChart.backgroundImg,
  );
  const handleSetBackgroundImg = (url: string) => {
    setBackgroundImg(url);
  };
  const [backgroundImgPosition, setBackgroundImgPosition] = useState(
    currentChart.backgroundImgPosition ?? defaultChart.backgroundImgPosition,
  );

  // auto/cover/contain
  const [backgroundImgMode, setBackgroundImgMode] = useState<string>(
    currentChart.backgroundImgMode ?? defaultChart.backgroundImgMode,
  );
  const handleSetBackgroundImgMode = (newMode: string) => {
    setBackgroundImgMode(newMode);
  };

  const backgroundPositionMenu = {
    boxSizeXY: 190, // the size of the container
    dotSizeXY: 30, // the size of the pointer dot
    centerDot: 80, // center of the scale
  };

  const handleBackgroundPositionChange = (dragX: number, dragY: number) => {
    const scaleEnd =
      backgroundPositionMenu.boxSizeXY - backgroundPositionMenu.dotSizeXY;

    const offsetX = Math.floor((dragX / scaleEnd) * 100);
    const offsetY = Math.floor((dragY / scaleEnd) * 100);

    setBackgroundImgPosition({ x: offsetX, y: offsetY });
  };

  const [darkenBackground, setDarkenBackground] =
    useState<darkenBackgroundOptions>(
      currentChart.darkenBackground ?? defaultChart.darkenBackground,
    );
  const toggleDarkenBackground = (
    darkenBackgroundState: darkenBackgroundOptions,
  ) => {
    setDarkenBackground(darkenBackgroundState);
  };

  // choose font
  const [fontFamily, setFontFamily] = useState<string>(
    currentChart.fontFamily ?? defaultChart.fontFamily,
  );
  const handleSetFontFamily = (newFontName: string) => {
    setFontFamily(newFontName);
  };

  //set colors
  const [fontColorBody, setfontColorBody] = useState<string>(
    currentChart.fontColorBody ?? defaultChart.fontColorBody,
  );
  const handleSetFontColorBody = (newColor: string) => {
    setfontColorBody(newColor);
  };
  const [fontColorHeader, setfontColorHeader] = useState<string>(
    currentChart.fontColorHeader ?? defaultChart.fontColorHeader,
  );
  const handleSetFontColorHeader = (newColor: string) => {
    setfontColorHeader(newColor);
  };

  const [backgroundColor, setBackgroundColor] = useState<string>(
    currentChart.backgroundColor ?? defaultChart.backgroundColor,
  );
  const handleSetBackgroundColor = (newColor: string) => {
    setBackgroundColor(newColor);
  };
  const [openMenuPopUp, setOpenMenuPopUp] = useState<openPopUpOptions>("");

  const handleOpenPopUp = (selectedPopUp: openPopUpOptions) => {
    if (selectedPopUp !== "") {
      openMenuPopUp !== selectedPopUp
        ? setOpenMenuPopUp(selectedPopUp)
        : setOpenMenuPopUp("");
    } else {
      setOpenMenuPopUp("");
    }
  };

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

  const [openModal, setOpenModal] = useState<openModalOptions>("");
  const handleSetOpenModal = (modalToOpen: openModalOptions) => {
    setOpenModal(modalToOpen);
  };

  return (
    <MenuContext.Provider
      value={{
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
        openModal,
        handleSetOpenModal,
        currentChart,
        changeDisplayedChart,
        darkenBackground,
        toggleDarkenBackground,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
