// import { useState } from "react";
// import { exportAsImage } from "../utils/downloadImage";
// import { lastFmAlbum } from "../App";

// const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

// type MenuProps = {
//   collageData: lastFmAlbum[];
//   updateCollage: any;
//   changeTableMode: any;
//   exportRef: any;
//   selectedIndex: number;
// };

// const Menu = ({
//   collageData,
//   updateCollage,
//   changeTableMode,
//   exportRef,
//   selectedIndex,
// }: MenuProps) => {
//   // last.fm api search feature
//   const [searchInputValue, setSearchInputValue] = useState<string>("hi");
//   const [searchResults, setSearchResults] = useState<any>(null);
//   const searchAlbums = async (albumTitle: string) => {
//     let albumData: any = await fetch(
//       `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`
//     ).then((response) => response.json());

//     albumData = albumData.results.albummatches.album;
//     console.log(albumData);
//     setSearchResults(albumData);
//   };

//   const [refresh, setRefresh] = useState(false);

//   const drawAlbumToCanvas = (index: number, album: any) => {
//     let updatedArr = collageData; // or other table type - do it later
//     updatedArr[index] = album;
//     updateCollage(updatedArr); //or other table type

//     // this forces rerender in a gentle way I don't really know why but it works
//     setRefresh(true);
//     setRefresh(!refresh);
//   };

//   return (
//     <>
//       <h2>Choose your chart:</h2>
//       <select onChange={(evt) => changeTableMode(evt.target.value)}>
//         <option value="collage">Collage</option>
//         <option value="top40">Top 40</option>
//         <option value="top100">Top 100</option>
//       </select>
//       <h2>Search for your albums:</h2>
//       <div className="search-input">
//         <input
//           type="text"
//           onKeyUp={async (evt) =>
//             evt.key === "Enter"
//               ? searchAlbums(searchInputValue)
//               : setSearchInputValue(evt.currentTarget.value)
//           }
//         />
//         <button
//           onClick={() => {
//             searchAlbums(searchInputValue);
//           }}
//         >
//           Search
//         </button>
//         <button
//           onClick={() => {
//             exportAsImage(exportRef.current, "title");
//           }}
//         >
//           Export
//         </button>
//       </div>
//       <div id="search-results-div">
//         {searchResults &&
//           searchResults.map((a: any) => {
//             return (
//               <div
//                 className="album-card inline-flex m-4 w-full"
//                 onClick={() => {
//                   console.log(a);
//                   drawAlbumToCanvas(selectedIndex, a);
//                 }}
//               >
//                 <div className="justify-start">
//                   <img className="w-16" src={`${a.image[1]["#text"]}`} />
//                 </div>
//                 <div className="m-4">
//                   <span className="font-bold"> {a.name} </span>by
//                   <span className="font-bold"> {a.artist}</span>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
// };

// export default Menu;
