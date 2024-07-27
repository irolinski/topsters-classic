import { chartSavedData } from "../models/models";

// export const collageEmpty = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] //16pcs
export const collageEmpty = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] //36pcs
export const top40Empty = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]  // 50pcs
export const top100Empty = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] // 100pcs


export const defaultChart: chartSavedData = {
    name: "default",
    tableMode: "top40",
    collageRowNum: 4,
    collageColNum: 4,
    chartTitle: "",
    hideAlbumTitles: false,
    backgroundImg: "",
    backgroundImgPosition: {
      x: 0,
      y: 0,
    },
    backgroundImgMode: "auto",
    fontFamily: "Space Mono",
    fontColorBody: "",
    fontColorHeader: "",
    backgroundColor: "#000000",
    enableShadows: true,
    collageData: collageEmpty,
    top40Data: top40Empty,
    top100Data: top100Empty,
  };