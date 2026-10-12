import { describe, expect, it } from "vitest";
import { readScrollProgress, sceneState, setSceneScroll } from "./sceneState";

describe("setSceneScroll", () => {
  it("stores a value between 0 and 1", () => {
    setSceneScroll(0.4);
    expect(sceneState.scroll).toBe(0.4);
  });

  it("clamps values below 0 and above 1", () => {
    setSceneScroll(-2);
    expect(sceneState.scroll).toBe(0);
    setSceneScroll(5);
    expect(sceneState.scroll).toBe(1);
  });
});

describe("readScrollProgress", () => {
  it("returns 0 on the server, where window does not exist", () => {
    expect(readScrollProgress()).toBe(0);
  });
});
