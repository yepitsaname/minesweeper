import { render, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import Board from "../components/Board";
import Tile from "../components/Tile";

describe("Game Board Tests", () => {

  describe("Board Display", () => {
    describe("Should have a number of tiles equal to column * rows", () => {
      it("Should have 1 tile for a 1x1 board", () =>{
        render(<Board col={1} row={1}/>);
        const tiles = screen.getAllByTitle("tile");
        expect(tiles.length).toBe(1);
      })

      it("Should have 25 tiles for a 5x5 board", () => {
        render(<Board col={5} row={5}/>);
        const tiles = screen.getAllByTitle("tile");
        expect(tiles.length).toBe(25);
      })

      it("Should have 100 tiles for a 10x10 board", () => {
        render(<Board col={10} row={10}/>);
        const tiles = screen.getAllByTitle("tile");
        expect(tiles.length).toBe(100);
      })

      it("Should have 50 tiles for a 10x5 board", () => {
        render(<Board col={10} row={5}/>);
        const tiles = screen.getAllByTitle("tile");
        expect(tiles.length).toBe(50);
      })

      it("Should have 54 tiles for a 6x9 board", () => {
        render(<Board col={6} row={9}/>);
        const tiles = screen.getAllByTitle("tile");
        expect(tiles.length).toBe(54);
      })
    })
  })

  describe("Tile Display and Functions", () => {
    describe("Tile should render correctly by covered/mine states", ()=>{
      it("should render a covered non-mine tile on the screen", () => {
        render(<Tile covered={true} mine={false} />);
        let tile = screen.getByTitle("tile");
        expect(tile.classList.contains('covered')).toBe(true);
        expect(tile.classList.contains('mine')).toBe(false);
      })

      it("should render an uncovered non-mine tile on the screen", () => {
        render(<Tile covered={false} mine={false} />);
        let tile = screen.getByTitle("tile");
        expect(tile.classList.contains('covered')).toBe(false);
        expect(tile.classList.contains('mine')).toBe(false);
      })

      it("should render a covered mine tile on the screen", () => {
        render(<Tile covered={true} mine={true} />);
        let tile = screen.getByTitle("tile");
        expect(tile.classList.contains('covered')).toBe(true);
        expect(tile.classList.contains('mine')).toBe(true);
      })

      it("should render an uncovered mine tile on the screen", () => {
        render(<Tile covered={false} mine={true} />);
        let tile = screen.getByTitle("tile");
        expect(tile.classList.contains('covered')).toBe(false);
        expect(tile.classList.contains('mine')).toBe(true);
      })
    })


    it("should reveal the tile when clicked", async () => {
      render(<Tile covered={true} mine={false} />);
      let tile = screen.getByTitle("tile");
      await userEvent.click(tile);
      expect(tile.classList.contains('covered')).toBe(false);
    })
  })
})