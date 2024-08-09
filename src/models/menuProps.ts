import { MutableRefObject } from "react";
import {
  chartSavedData,
  darkenBackgroundOptions,
  lastFmAlbum,
  openAccordionOptions,
  openModalOptions,
  openPopUpOptions,
  tableModeOptions,
} from "./models";

export type allContextPropTypes = {
  tableMode: tableModeOptions | string;
  handleTableModeChange: (modeToSet: tableModeOptions | string) => void;
  openAccordion: openAccordionOptions;
  handleOpenAccordion: (selectedAccordion: openAccordionOptions) => void;
  collageRowNum: number;
  collageColNum: number;
  handleSetCollageRowNum: (val: number) => void;
  handleSetCollageColNum: (val: number) => void;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  openMenuPopUp: openPopUpOptions;
  handleOpenPopUp: (selectedPopUp: openPopUpOptions) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: (dragX: number, dragY: number) => void;
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
  changeDisplayedChart: (chartName: string) => void;
  handleSetExportOptions: ({
    format,
    quality,
  }: {
    format: string;
    quality: number;
  }) => void;
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
  drawAlbumToCanvas: (index: number, album: lastFmAlbum) => void;
  exportRef: MutableRefObject<HTMLInputElement | null>;
  selectedIndex: number;
  currentChart: chartSavedData;
  // currentChartName: string;
  // name: string;
  top40Data?: lastFmAlbum[] | Record<string, never>[] | undefined;
  top100Data?: lastFmAlbum[] | Record<string, never>[] | undefined;
  collageData?: lastFmAlbum[] | Record<string, never>[] | undefined;
  backgroundImgPosition: {
    x: number;
    y: number;
  };
  chartDirty: boolean;
  changeIndex: (i: number) => void;
  loadingImage: number;
  handleImageLoaded: () => void;
  closeAllWindows: () => void;
  refresh: boolean;
  darkenBackground: darkenBackgroundOptions;
  toggleDarkenBackground: (
    darkenBackgroundState: darkenBackgroundOptions,
  ) => void;
};

export type MobileMenuPropTypes = {
  tableMode: tableModeOptions | string;
  handleTableModeChange: (modeToSet: tableModeOptions | string) => void;
  openAccordion: openAccordionOptions;
  handleOpenAccordion: (selectedAccordion: openAccordionOptions) => void;
  collageRowNum: number;
  collageColNum: number;
  handleSetCollageRowNum: (val: number) => void;
  handleSetCollageColNum: (val: number) => void;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  openMenuPopUp: openPopUpOptions;
  handleOpenPopUp: (selectedPopUp: openPopUpOptions) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: (dragX: number, dragY: number) => void;
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
  changeDisplayedChart: (chartName: string) => void;
  handleSetExportOptions: ({
    format,
    quality,
  }: {
    format: string;
    quality: number;
  }) => void;
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
  darkenBackground: darkenBackgroundOptions;
  toggleDarkenBackground: (
    darkenBackgroundState: darkenBackgroundOptions,
  ) => void;
};

export type DesktopMenuPropTypes = {
  tableMode: tableModeOptions | string;
  handleTableModeChange: (tableMode: tableModeOptions | string) => void;
  openAccordion: openAccordionOptions;
  handleOpenAccordion: (selectedAccordion: openAccordionOptions) => void;
  collageRowNum: number;
  collageColNum: number;
  handleSetCollageRowNum: (val: number) => void;
  handleSetCollageColNum: (val: number) => void;
  chartTitle: string;
  handleSetChartTitle: (newTitle: string) => void;
  openMenuPopUp: openPopUpOptions;
  handleOpenPopUp: (selectedPopUp: openPopUpOptions) => void;
  backgroundColor: string;
  handleSetBackgroundColor: (newColor: string) => void;
  backgroundImg: string;
  handleSetBackgroundImg: (url: string) => void;
  backgroundPositionMenu: {
    boxSizeXY: number;
    dotSizeXY: number;
    centerDot: number;
  };
  handleBackgroundPositionChange: (dragX: number, dragY: number) => void;
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
  selectedIndex: number;
  currentChart: chartSavedData;
  currentChartName: string;
  changeDisplayedChart: (chartName: string) => void;
  openModal: openModalOptions;
  handleSetOpenModal: (modalToOpen: openModalOptions) => void;
  darkenBackground: darkenBackgroundOptions;
  toggleDarkenBackground: (
    darkenBackgroundState: darkenBackgroundOptions,
  ) => void;
};
