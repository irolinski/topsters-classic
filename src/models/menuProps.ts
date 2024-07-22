import { MutableRefObject } from "react";
import { chartSavedData, lastFmAlbum } from "./models";

export type MobileMenuPropTypes = {
  tableMode: string;
  handleTableModeChange: (tableMode: string) => void;
  mobileMenuIsOpened: boolean;
  handleSetMobileMenuIsOpened: (mobileMenu: boolean) => void;
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
  collageRowNum: number;
  collageColNum: number;
  handleSetCollageRowNum: (val: number) => void;
  handleSetCollageColNum: (val: number) => void;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  openMenuPopUp: string;
  handleOpenPopUp: (selectedPopUp: string) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: (dragX: any, dragY: any) => void;
  backgroundImgMode: string;
  handleSetBackgroundImgMode: (newMode: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  fontFamily: string;
  handleSetFontFamily: (newFontName: string) => void;
  fontColorHeader: string;
  handleSetFontColorHeader: (newColor: string) => void;
  fontColorBody: string;
  handleSetFontColorBody: (newColor: string) => void;
  hideAlbumTitles: boolean;
  handleSetHideAlbumTitles: (isTrue: boolean) => void;
  enableShadows: boolean;
  handleSetEnableShadows: (isTrue: boolean) => void;
  exportOptions: { format: string; quality: number };
  showSaveModal: boolean;
  handleSetShowSaveModal: (showSaveModal: boolean) => void;
  changeDisplayedChart: () => void;
  handleSetExportOptions: ({
    format,
    quality,
  }: {
    format: string;
    quality: number;
  }) => void;
};

export type DesktopMenuPropTypes = {
  tableMode: string;
  handleTableModeChange: (tableMode: string) => void;
  mobileMenuIsOpened: boolean;
  handleSetMobileMenuIsOpened: (mobileMenu: boolean) => void;
  openAccordion: string;
  handleOpenAccordion: (selectedAccordion: string) => void;
  collageRowNum: number;
  collageColNum: number;
  handleSetCollageRowNum: (val: number) => void;
  handleSetCollageColNum: (val: number) => void;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  openMenuPopUp: string;
  handleOpenPopUp: (selectedPopUp: string) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: (dragX: any, dragY: any) => void;
  backgroundImgMode: string;
  handleSetBackgroundImgMode: (newMode: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  fontFamily: string;
  handleSetFontFamily: (newFontName: string) => void;
  fontColorHeader: string;
  handleSetFontColorHeader: (newColor: string) => void;
  fontColorBody: string;
  handleSetFontColorBody: (newColor: string) => void;
  hideAlbumTitles: boolean;
  handleSetHideAlbumTitles: (isTrue: boolean) => void;
  enableShadows: boolean;
  handleSetEnableShadows: (isTrue: boolean) => void;
  exportOptions: { format: string; quality: number };
  handleSetExportOptions: ({
    format,
    quality,
  }: {
    format: string;
    quality: number;
  }) => void;
  drawAlbumToCanvas: (index: number, album: lastFmAlbum) => void;
  exportRef: MutableRefObject<HTMLInputElement | null>;
  showAboutModal: boolean;
  handleSetShowAboutModal: (showAboutModal: boolean) => void;
  showSaveModal: boolean;
  handleSetShowSaveModal: (showSaveModal: boolean) => void;
  selectedIndex: number;
  currentChart: chartSavedData;
  currentChartName: string;
  changeDisplayedChart: (chartName: string) => void;
};
