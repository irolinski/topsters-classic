import html2canvas from "html2canvas";
import "./App.css";
import { useEffect, useRef } from "react";

const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

const searchAlbums = async (albumTitle: string) => {
  let albumData: any = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`
  ).then((response) => response.json());

  albumData = albumData.results.albummatches.album;
  console.log(albumData);
};

function App() {
  useEffect(() => {
    searchAlbums("believe");
  }, []);

  const downloadImage = (blob: any, fileName: string) => {
    const fakeLink: any = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const exportAsImage = async (el: any, imageFileName: string) => {
    window.scrollTo(0, 0);
    setTimeout(async () => {
      const canvas = await html2canvas(el, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        width: el.width,
        height: 1200,
        windowWidth: 1800,
      }).then(function (canvas: any) {
        var img = canvas.toDataURL();
        downloadImage(img, imageFileName);
      });
    }, 1000);
  };


  const exportRef: any = useRef();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div
          className="w-3/4 flex-1 flex-wrap html2canvas-container"
          id="image-div"
          onClick={() => {
            exportAsImage(exportRef.current, "title");
          }}
          ref={exportRef}
        >
          <h1>This is a test of the image export feature</h1>
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/71DUFxaoLGL._UF1000,1000_QL80_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/810vKrPt0aL._UF1000,1000_QL80_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/71VJAU9IPSL._UF1000,1000_QL80_.jpg"
          />

          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/71ngws--3bL._AC_UF894,1000_QL80_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/61H5nAt9wdL.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/81G8m4fTYyL._AC_SL1500_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/611ybkIvKnL._AC_SL1000_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/71WFR+ip0EL._AC_SL1500_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/810NIKoY-vL._AC_SL1400_.jpg"
          />
          <img
            className="m-12 max-w-16"
            src="https://m.media-amazon.com/images/I/71Zk0rQnwcL._AC_SL1200_.jpg"
          />
          <img src="https://m.media-amazon.com/images/I/6137pVL5iJS._AC_SL1200_.jpg" />
          <img src="https://m.media-amazon.com/images/I/91dTLHSQdkL._AC_SL1400_.jpg" />
          <img src="https://m.media-amazon.com/images/I/71UzjXRiGHL._AC_SL1500_.jpg" />
          <p>This is some bottom some some some bottom</p>
        </div>
      </div>
    </main>
  );
}

export default App;
