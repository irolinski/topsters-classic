import { describe, expect, it } from "vitest";

/**
 * These are live integration tests. They exercise the same Last.fm endpoints
 * the app uses, so they only run when an API key is available (locally via
 * .env, or in CI via the environment).
 */
const apiKey =
  import.meta.env.VITE_LAST_FM_API_KEY ||
  process.env.VITE_LAST_FM_API_KEY ||
  "";

const describeLive = apiKey ? describe : describe.skip;

const LAST_FM_API = "https://ws.audioscrobbler.com/2.0/";
const LAST_FM_AUTH = "https://www.last.fm/api/auth/";

const albumSearchUrl = (
  album: string | null,
  overrides: Record<string, string> = {},
) => {
  const url = new URL(LAST_FM_API);
  const params: Record<string, string> = {
    method: "album.search",
    api_key: apiKey,
    format: "json",
    ...overrides,
  };
  if (album !== null) params.album = album;
  url.search = new URLSearchParams(params).toString();
  return url;
};

describeLive("Last.fm API (live)", () => {
  it("authenticates the configured key and returns well-formed album matches", async () => {
    const response = await fetch(
      albumSearchUrl("Dark Side of the Moon", { limit: "5" }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/application\/json/);

    const body = await response.json();
    expect(body.error).toBeUndefined();
    expect(body.results).toBeDefined();

    const results = body.results;
    expect(results["opensearch:Query"].searchTerms).toBe(
      "Dark Side of the Moon",
    );
    expect(Number(results["opensearch:totalResults"])).toBeGreaterThan(0);
    expect(Number(results["opensearch:itemsPerPage"])).toBe(5);

    const albums = results.albummatches.album;
    expect(Array.isArray(albums)).toBe(true);
    expect(albums.length).toBeGreaterThan(0);
    expect(albums.length).toBeLessThanOrEqual(5);

    const firstAlbum = albums[0];
    expect(firstAlbum).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        artist: expect.any(String),
        url: expect.stringContaining("last.fm"),
      }),
    );
    expect(firstAlbum.name.length).toBeGreaterThan(0);
    expect(firstAlbum.artist.length).toBeGreaterThan(0);

    expect(Array.isArray(firstAlbum.image)).toBe(true);
    expect(firstAlbum.image.length).toBeGreaterThan(0);
    for (const image of firstAlbum.image) {
      expect(image).toEqual(
        expect.objectContaining({
          "#text": expect.any(String),
          size: expect.any(String),
        }),
      );
    }
    expect(
      firstAlbum.image.some((image: { "#text": string }) =>
        image["#text"].startsWith("https://"),
      ),
    ).toBe(true);
  }, 20_000);

  it("rejects an invalid API key with Last.fm error 10", async () => {
    const response = await fetch(
      albumSearchUrl("test", { api_key: "0".repeat(32) }),
    );

    expect(response.ok).toBe(false);

    const body = await response.json();
    expect(body.error).toBe(10);
    expect(body.message).toMatch(/invalid api key/i);
  }, 20_000);

  it("rejects a malformed album search instead of returning fake results", async () => {
    const response = await fetch(albumSearchUrl(null));

    expect(response.status).toBe(400);
  }, 20_000);

  it("serves the authentication endpoint and preserves the API key", async () => {
    const response = await fetch(`${LAST_FM_AUTH}?api_key=${apiKey}`, {
      redirect: "manual",
    });

    expect([301, 302]).toContain(response.status);
    const location = response.headers.get("location");
    expect(location).toBeTruthy();
    expect(location).toContain("/api/auth");
    expect(location).toContain(`api_key=${apiKey}`);
  }, 20_000);
});
