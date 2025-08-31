import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from 'vitest';
import App from "../src/App";

describe("Main Application Tests", () => {
  describe("Application Display", () => {
    beforeEach(()=>{
      render(<App />);
    })
    it("Should display a game board", () => {
      const board = screen.getByTitle("board");
      expect(board).toBeInTheDocument();
    })
  })
})