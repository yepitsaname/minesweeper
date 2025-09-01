import { render, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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

    describe("should have a 'menu' while in a 'gameOver' state", ()=>{
      it("should have a 'menu' by default", ()=>{
        render(<Board />);
        const menu = screen.getByTitle('menu');
        expect(menu).toBeInTheDocument();
      })

      it("should have a 'You Win!' when the player wins", async ()=>{
        render(<Board row={1} col={1} mines={0}/>);
        const tile = screen.getByTitle('tile');
        await userEvent.click(tile);
        const menu = screen.getByText('You Won!');
        expect(menu).toBeInTheDocument();
      })

      it("should have a 'You Lost!' when the player loses", async ()=>{
        render(<Board row={1} col={1} mines={1}/>);
        const tile = screen.getByTitle('tile');
        await userEvent.click(tile);
        const menu = screen.getByText('You Lost!');
        expect(menu).toBeInTheDocument();
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
        expect(tile.classList.contains('mine')).toBe(false);
      })

      it("should render an uncovered mine tile on the screen", () => {
        render(<Tile covered={false} mine={true} />);
        let tile = screen.getByTitle("tile");
        expect(tile.classList.contains('covered')).toBe(false);
        expect(tile.classList.contains('mine')).toBe(true);
      })

      it("should not do anything when clicked if only a tile is rendered", async ()=>{
        render(<Tile covered={false} mine={true} />);
        let tile = screen.getByTitle("tile");
        await userEvent.click(tile);
        expect(tile.classList.contains('covered')).toBe(false);
      })

      it("should reveal the non-mine tile when clicked", async () => {
        render(<Board row={1} col={1} mines={0} />);
        let tile = screen.getByTitle("tile");
        await userEvent.click(tile);
        expect(tile.classList.contains('covered')).toBe(false);
        expect(tile.classList.contains('mine')).toBe(false);
      })

      it("should reveal the mine tile when clicked", async () => {
        render(<Board row={1} col={1} mines={1} />);
        let tile = screen.getByTitle("tile");
        await userEvent.click(tile);
        expect(tile.classList.contains('covered')).toBe(false);
        expect(tile.classList.contains('mine')).toBe(true);
      })
    })
  })
})