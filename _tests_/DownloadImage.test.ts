import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadImage, exportAsImage } from "../src/utils/downloadImage";
import html2canvas from "html2canvas";

vi.mock("html2canvas", () => ({
  default: vi.fn(),
}));

const html2canvasMock = vi.mocked(html2canvas);

describe("downloadImage", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("clicks a temporary link with the image data and filename", () => {
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    downloadImage("data:image/png;base64,abc123", "topster.png");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    const clickedAnchor = clickSpy.mock
      .instances[0] as unknown as HTMLAnchorElement;
    expect(clickedAnchor.download).toBe("topster.png");
    expect(clickedAnchor.href).toBe("data:image/png;base64,abc123");
    expect(clickedAnchor.isConnected).toBe(false);
    expect(document.querySelector("a")).toBeNull();
  });

  it("alerts and logs when the browser cannot create the download link", () => {
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(document, "createElement").mockImplementationOnce(() => {
      throw new Error("createElement failed");
    });

    downloadImage("data:image/png;base64,abc123", "topster.png");

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining("Sorry, it seems an error has occured"),
    );
    expect(logSpy).toHaveBeenCalledWith("createElement failed");
    expect(clickSpy).not.toHaveBeenCalled();
  });
});

describe("exportAsImage", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("captures the chart element, applies the export options, and downloads the result", async () => {
    vi.useFakeTimers();

    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    const toDataURL = vi.fn(() => "data:image/jpeg;base64,exported-chart");
    html2canvasMock.mockResolvedValue({
      toDataURL,
    } as unknown as HTMLCanvasElement);

    const element = Object.assign(document.createElement("div"), {
      width: 640,
      height: 480,
    });

    const exportPromise = exportAsImage(
      element as unknown as HTMLInputElement,
      "topster_chart.jpg",
      { format: "image/jpeg", quality: 0.5 },
    );

    expect(document.body).toHaveClass("loading");
    expect(html2canvasMock).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1000);
    await exportPromise;

    expect(html2canvasMock).toHaveBeenCalledTimes(1);
    expect(html2canvasMock).toHaveBeenCalledWith(element, {
      allowTaint: true,
      useCORS: true,
      logging: true,
      width: 640,
      height: 480,
      windowWidth: 1024,
    });
    expect(toDataURL).toHaveBeenCalledWith("image/jpeg", 0.5);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    const exportedAnchor = clickSpy.mock
      .instances[0] as unknown as HTMLAnchorElement;
    expect(exportedAnchor.download).toBe("topster_chart.jpg");
    expect(exportedAnchor.href).toBe(
      "data:image/jpeg;base64,exported-chart",
    );
    expect(document.body).not.toHaveClass("loading");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
