import { describe, it, expect } from "vitest";
import { greet } from "../src/greet.js";

describe("greet", () => {
  it("greets a name", () => {
    expect(greet("Priya")).toBe("Hello, Priya!");
  });

  it("handles an empty name", () => {
    expect(greet("")).toBe("Hello, there!");
  });
});
