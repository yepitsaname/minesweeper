import { beforeEach, describe, expect, it } from "vitest";
import { setMines, checkNeighbors, revealBoard } from "../game_logic/main.js"

describe("Main Game Logic Suite", ()=>{
  describe("Logic: setMines", ()=>{
    const gameBoard = [];

    beforeEach(()=>{
      gameBoard.pop();
      gameBoard.pop();
      gameBoard.pop();
      gameBoard.push([
        {covered: true, mine: false, value: 0},
        {covered: true, mine: false, value: 0},
        {covered: true, mine: false, value: 0}
      ])
      gameBoard.push([
        {covered: true, mine: false, value: 0},
        {covered: true, mine: false, value: 0},
        {covered: true, mine: false, value: 0}
      ])
      gameBoard.push([
        {covered: true, mine: false, value: 0},
        {covered: true, mine: false, value: 0},
        {covered: true, mine: false, value: 0}
      ])
    })
    it("should return an array of arrays", ()=> {
      const board = setMines([[{covered: true, mine: false, value: 0}]], 1);
      expect(Array.isArray(board)).toBe(true);
      expect(Array.isArray(board[0])).toBe(true);
    })

    it("should place mines equal to input mines",()=>{
      const board = setMines(gameBoard, 7);
      expect(board.reduce((acc,num)=>acc + num.reduce((acc,num)=> acc + (num.mine ? 1 : 0) ,0),0)).toBe(7);
    })

    it("should not place more mines than allowed by board size (row x column) - 1",()=>{
      const board = setMines(gameBoard, 20);
      expect(board.reduce((acc,num)=>acc + num.reduce((acc,num)=> acc + (num.mine ? 1 : 0) ,0),0)).toBe(8);
    })
  })

  describe("Logic: checkNeighbors", ()=>{
    it("should return an array of arrays", ()=> {
      const board = checkNeighbors([[{covered: true, mine: false, value: 0}]], [0,0]);
      expect(Array.isArray(board)).toBe(true);
      expect(Array.isArray(board[0])).toBe(true);
    })

    it("should identify and correctly count the number of mines in an array", ()=>{
      const gameBoard = [
        [{covered: true, mine: true, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: true, value: 0},{covered: true, mine: false, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: true, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}]
      ];
      expect(checkNeighbors(gameBoard, [1,1])[1][1].value).toBe(8);
    })

    it("should count all neighbor mines", ()=>{
      const gameBoard = [
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: true, value: 0},{covered: true, mine: false, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: false, value: 0}]
      ];

      // Test start 1,1
      let board = checkNeighbors(gameBoard, [1,1]);
      expect(board[1][1].value).toBe(5);
      expect(board[0][0].value).toBe(0);
      expect(board[2][0].value).toBe(0);
      expect(board[2][2].value).toBe(0);

      // Test start 0,0
      board = checkNeighbors(gameBoard, [0,0]);
      expect(board[0][0].value).toBe(2);
      expect(board[2][0].value).toBe(0);
      expect(board[2][2].value).toBe(0);
      expect(board[1][1].value).toBe(0);

      // Test start 2,0
      board = checkNeighbors(gameBoard, [2,0])
      expect(board[2][0].value).toBe(2);
      expect(board[2][2].value).toBe(0);
      expect(board[1][1].value).toBe(0);
      expect(board[0][0].value).toBe(0);

      // Test start 2,2
      board = checkNeighbors(gameBoard, [2,2])
      expect(board[2][2].value).toBe(2);
      expect(board[1][1].value).toBe(0);
      expect(board[0][0].value).toBe(0);
      expect(board[2][0].value).toBe(0);

    })

    it("should update direct adjacent neighbors and subsequent direct adjacents", ()=>{
      const gameBoard = [
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: false, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: false, value: 0}]
      ];

      let board = checkNeighbors(gameBoard, [0,0])
      expect(board[0][0].value).toBe(1);
      expect(board[1][0].value).toBe(2);
      expect(board[1][1].value).toBe(4);
      expect(board[2][0].value).toBe(1);
      expect(board[2][2].value).toBe(0);
    })

    it("should uncover all 'checked' non-mine tiles", ()=>{
      const gameBoard = [
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: false, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: false, value: 0}]
      ];

      let board = checkNeighbors(gameBoard, [0,0])
      expect(board[0][0].covered).toBe(false);
      expect(board[1][0].covered).toBe(false);
      expect(board[1][1].covered).toBe(false);
      expect(board[2][0].covered).toBe(false);
      expect(board[2][2].covered).toBe(true);
    })

    it("should not uncover neighbers if a mine was selected", ()=>{
      const gameBoard = [
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: false, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: false, value: 0}]
      ];

      let board = checkNeighbors(gameBoard, [0,1])
      expect(board[0][0].covered).toBe(true);
      expect(board[0][1].covered).toBe(false);
      expect(board[1][0].covered).toBe(true);
      expect(board[1][1].covered).toBe(true);
      expect(board[1][2].covered).toBe(true);
      expect(board[0][2].covered).toBe(true);
    })
  })

  describe("Logic: revealBoard", ()=>{
    it("should return an array of arrays", ()=>{
      const board = revealBoard([[{covered: true, mine: false, value: 0}]]);
      expect(Array.isArray(board)).toBe(true);
      expect(Array.isArray(board[0])).toBe(true);
    })

    it("should uncover the whole board in the event of a win or loss", ()=>{
      const gameBoard = [
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: false, value: 0},{ covered: true, mine: true, value: 0}],
        [{covered: true, mine: false, value: 0},{covered: true, mine: true, value: 0},{ covered: true, mine: false, value: 0}]
      ];

      let board = revealBoard(gameBoard);
      const reducer = (array)=>{
        return array.reduce((acc,item)=> item.covered == false && acc != false, true );
      }

      expect(board.map(row=>reducer(row)).reduce((acc,item) => item == true && acc != false, true)).toBe(true);

    })
  })

})