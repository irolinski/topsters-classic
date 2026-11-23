import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Search from "../src/Components/Search";
import { lastFmAlbum } from "../src/models/models";

const jsonResponse = (body: unknown) =>
  ({
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  }) as Response;

const makeAlbum = (overrides: Partial<lastFmAlbum> = {}): lastFmAlbum => ({
  name: "Test Album",
  artist: "Test Artist",
  url: "https://www.last.fm/music/Test+Artist/Test+Album",
  image: [
    { "#text": "", size: "small" },
    { "#text": "https://example.com/album-64.png", size: "medium" },
    { "#text": "https://example.com/album-174.png", size: "large" },
    { "#text": "https://example.com/album-300.png", size: "extralarge" },
  ],
  ...overrides,
});

const searchResponse = (albums: lastFmAlbum[]) => ({
  results: {
    albummatches: {
      album: albums,
    },
  },
});

const renderSearch = (
  {
    selectedIndex = 0,
    openAccordion = "",
    openModal = "",
  }: {
    selectedIndex?: number;
    openAccordion?: "" | "search";
    openModal?: "" | "save";
  } = {},
) => {
  const drawAlbumToCanvas = vi.fn();
  const handleOpenAccordion = vi.fn();

  const view = render(
    <Search
      selectedIndex={selectedIndex}
      drawAlbumToCanvas={drawAlbumToCanvas}
      openAccordion={openAccordion}
      handleOpenAccordion={handleOpenAccordion}
      openModal={openModal}
    />,
  );

  return { ...view, drawAlbumToCanvas, handleOpenAccordion };
};

const getSearchControls = () => ({
  input: screen.getByRole("textbox", { name: /search for albums/i }),
  button: screen.getByRole("button", { name: /search input/i }),
});

describe("Search", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders an accessible search box with the Last.fm attribution", () => {
    renderSearch();

    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(getSearchControls().input).toHaveValue("");
    expect(getSearchControls().button).toBeEnabled();
    expect(screen.getByText(/data provided thanks to/i)).toBeInTheDocument();
    expect(screen.getByText(/database api/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps the typed query in the input", async () => {
    const user = userEvent.setup();
    renderSearch();

    const { input } = getSearchControls();
    await user.type(input, "Pink Floyd");

    expect(input).toHaveValue("Pink Floyd");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("queries the Last.fm album search endpoint with the typed query", async () => {
    const user = userEvent.setup();
    const album = makeAlbum();
    fetchMock.mockResolvedValue(jsonResponse(searchResponse([album])));

    const { handleOpenAccordion } = renderSearch({ selectedIndex: 2 });
    const { input, button } = getSearchControls();

    await user.type(input, "Pink Floyd");
    await user.click(button);

    await screen.findByText("Test Album");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const requestedUrl = new URL(fetchMock.mock.calls[0][0] as string);
    expect(`${requestedUrl.origin}${requestedUrl.pathname}`).toBe(
      "https://ws.audioscrobbler.com/2.0/",
    );
    expect(requestedUrl.searchParams.get("method")).toBe("album.search");
    expect(requestedUrl.searchParams.get("album")).toBe("Pink Floyd");
    expect(requestedUrl.searchParams.get("format")).toBe("json");
    expect(requestedUrl.searchParams.get("api_key")).toBeTruthy();
    expect(handleOpenAccordion).toHaveBeenCalledWith("search");
  });

  it("renders returned albums and adds the clicked album to the selected index", async () => {
    const user = userEvent.setup();
    const album = makeAlbum();
    fetchMock.mockResolvedValue(jsonResponse(searchResponse([album])));

    const { drawAlbumToCanvas } = renderSearch({ selectedIndex: 2 });
    const { input, button } = getSearchControls();

    await user.type(input, "Test Album");
    await user.click(button);

    const albumCard = await screen.findByLabelText(
      /Add album Test Album by Test Artist/,
    );
    expect(albumCard).toHaveAttribute(
      "aria-label",
      expect.stringContaining("index:3"),
    );
    expect(albumCard.querySelector("img")).toHaveAttribute(
      "src",
      album.image[1]["#text"],
    );

    await user.click(albumCard);

    expect(drawAlbumToCanvas).toHaveBeenCalledTimes(1);
    expect(drawAlbumToCanvas).toHaveBeenCalledWith(2, album);
  });

  it("runs the search when Enter is pressed", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse(searchResponse([makeAlbum({ name: "Entered Album" })])),
    );

    const { handleOpenAccordion } = renderSearch();
    const { input } = getSearchControls();

    await user.type(input, "Entered Album{enter}");

    await screen.findByText("Entered Album");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(handleOpenAccordion).toHaveBeenCalledWith("search");
  });

  it("shows a loading indicator until the API responds", async () => {
    const user = userEvent.setup();
    let resolveFetch!: (value: Response) => void;
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { container } = renderSearch();
    const { input, button } = getSearchControls();

    await user.type(input, "Test Album");
    await user.click(button);

    expect(container.querySelector(".dot-loader")).toBeInTheDocument();

    resolveFetch(
      jsonResponse(searchResponse([makeAlbum({ name: "Loaded Album" })])),
    );

    await screen.findByText("Loaded Album");
    expect(container.querySelector(".dot-loader")).not.toBeInTheDocument();
  });

  it("shows the no-results message when Last.fm returns an empty album list", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(jsonResponse(searchResponse([])));

    renderSearch();
    const { input, button } = getSearchControls();

    await user.type(input, "Unknown Album");
    await user.click(button);

    await screen.findByText("No results. Try again!");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows a network error and stops loading when the request fails", async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue(new Error("Failed to fetch"));

    const { container } = renderSearch();
    const { input, button } = getSearchControls();

    await user.type(input, "Test Album");
    await user.click(button);

    await screen.findByText("Failed to fetch");
    expect(container.querySelector(".dot-loader")).not.toBeInTheDocument();
  });

  it("shows the no-results message when Last.fm returns an error payload", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse({
        error: 10,
        message: "Invalid API key - You must be granted a valid key by last.fm",
      }),
    );

    renderSearch();
    const { input, button } = getSearchControls();

    await user.type(input, "Test Album");
    await user.click(button);

    await screen.findByText("No results. Try again!");
  });

  it("does not render albums that have no artwork", async () => {
    const user = userEvent.setup();
    const albumWithoutArt = makeAlbum({
      name: "Hidden Album",
      artist: "Hidden Artist",
      image: [
        { "#text": "", size: "small" },
        { "#text": "", size: "medium" },
      ],
    });
    const albumWithArt = makeAlbum({
      name: "Visible Album",
      artist: "Visible Artist",
    });
    fetchMock.mockResolvedValue(
      jsonResponse(searchResponse([albumWithoutArt, albumWithArt])),
    );

    renderSearch();
    const { input, button } = getSearchControls();

    await user.type(input, "Album");
    await user.click(button);

    await screen.findByText("Visible Album");
    expect(screen.queryByText("Hidden Album")).not.toBeInTheDocument();
  });

  it("reflects the open accordion state on the results panel", () => {
    renderSearch({ openAccordion: "search" });

    expect(document.getElementById("search-results-div")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("hides the search controls from assistive technology while a modal is open", () => {
    renderSearch({ openModal: "save" });

    expect(screen.getByRole("search", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(
      screen.getByLabelText(/search for albums/i),
    ).toHaveAttribute("aria-hidden", "true");
  });
});
