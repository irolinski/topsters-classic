export type lastFmAlbum = {
  name?: string;
  artist: string;
  image: { text?: string; "#text": string; size: string }[];
  url: string;
};

export type chartSavedData = {
  name: string;
  tableMode: string;
  collageRowNum: number;
  collageColNum: number;
  chartTitle: string;
  hideAlbumTitles: boolean;
  backgroundImg: string;
  backgroundImgPosition: any;
  backgroundImgMode: string;
  fontFamily: string;
  fontColorBody: string;
  fontColorHeader: string;
  backgroundColor: string;
  enableShadows: boolean;
  top40Data?: lastFmAlbum[] | Record<string, never>[];
  top100Data?: lastFmAlbum[] | Record<string, never>[];
  collageData?: lastFmAlbum[] | Record<string, never>[];
};

export type openModalOptions = "mobileMenu" | "save" | "about" | "";

export type openAccordionOptions =
  | "search"
  | "background"
  | "titles"
  | "collage-settings"
  | "font"
  | "options"
  | "";

export type tableModeOptions = "collage" | "top40" | "top100";

export type openPopUpOptions =
  | "background"
  | "background-position"
  | "font-header"
  | "font-body"
  | "";
