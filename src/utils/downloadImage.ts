import html2canvas from "html2canvas";

export const downloadImage = (blob: Blob | string, fileName: string) => {
  try {
    const fakeLink = window.document.createElement("a");
    // fakeLink.style = "display:none;";
    fakeLink.style.setProperty("display", "none");
    fakeLink.download = fileName;

    fakeLink.href = blob as string;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  } catch (err) {
    alert(
      "Sorry, it seems an error has occured. Check browser console for details.",
    );
    err instanceof Error && console.log(err.message);
  }
};

export const exportAsImage = async (
  el: HTMLInputElement,
  imageFileName: string,
  exportOptions: { format: string; quality: number },
) => {
  try {
    window.scrollTo(0, 0);
    document.body.classList.add("loading");
    setTimeout(async () => {
      await html2canvas(el, {
        allowTaint: true, // false?
        useCORS: true,
        logging: true,
        width: el.width,
        height: el.height,
        windowWidth: 1024,
      }).then(function (canvas: HTMLCanvasElement) {
        const img = canvas.toDataURL(
          exportOptions.format,
          exportOptions.quality,
        );
        downloadImage(img, imageFileName);
        document.body.classList.remove("loading");
      });
    }, 1000);
  } catch (err) {
    alert(
      "Sorry, it seems an error has occured. Check browser console for details.",
    );
    err instanceof Error && console.log(err.message);
  }
};
