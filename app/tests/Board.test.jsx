import Board from "../components/Board";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from 'vitest';

describe("Game Board Tests", () => {
  describe("Board Display", () => {
    it("Should have a 10x10 board", () => {
      render(<Board/>);
      const tiles = screen.getAllByTitle("tile");
      expect(tiles.length).toBe(100);
    })
  })
})