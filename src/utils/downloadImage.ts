import html2canvas from "html2canvas";


export const downloadImage = (blob: any, fileName: string) => {
    const fakeLink: any = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  export const exportAsImage = async (el: any, imageFileName: string, exportOptions: {format: string, quality: number}) => {
    window.scrollTo(0, 0);
    setTimeout(async () => {
      const canvas = await html2canvas(el, {
        allowTaint: true,
        useCORS: true,
        logging: true,
        width: el.width,
        height: el.height,
        windowWidth: 1024,
      }).then(function (canvas: any) {
        console.log(exportOptions)
        const img = canvas.toDataURL(exportOptions.format, exportOptions.quality);
        downloadImage(img, imageFileName);
      });
    }, 1000);
  };