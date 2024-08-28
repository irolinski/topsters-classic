import { describe, expect, it } from "vitest";

const apiKey = process.env.VITE_LAST_FM_API_KEY;

describe("Check authentication", () => {
  it("Should authenticate -> should return a status code 200 on connect", async () => {
    const res = await fetch(`http://www.last.fm/api/auth/?api_key=${apiKey}`);
    console.log(res.status);
    expect(res.status).toBe(200);
  });
});

describe("Check basic queries", () => {
  it("Should return undefined blank query", async () => {
    const albumTitle = "Dark Side of The Moon";
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=&api_key=${apiKey}&format=json`,
    ).then((response) => response.json());
    expect(res.results).toBe(undefined);
  });
  it("Should return multiple album objects on popular album name", async () => {
    const albumTitle = "Dark Side of The Moon";
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumTitle}&api_key=${apiKey}&format=json`,
    ).then((response) => response.json());
    expect(res.results.albummatches.album.length > 1);
  });
});
