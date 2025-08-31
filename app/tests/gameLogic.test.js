import { describe, expect, it } from "vitest";
import {checkNeighbors} from "../game_logic/main.js"

describe("Main Game Logic Suite", ()=>{
  describe("Logic: setMines", ()=>{
    it("",()=>{})
  })

  describe("Logic: checkNeighbors", ()=>{
    it("should return an array of arrays", ()=> {

      let endState = checkNeighbors([[{mine: false, value: 0}]], [0,0]);
      expect(Array.isArray(endState)).toBe(true);
      expect(Array.isArray(endState[0])).toBe(true);
    })
    it("should identify and correctly count the number of mines in an array", ()=>{
      let gameBoard = [
        [{mine: true, value: 0},{mine: true, value: 0},{ mine: true, value: 0}],
        [{mine: true, value: 0},{mine: false, value: 0},{ mine: true, value: 0}],
        [{mine: true, value: 0},{mine: true, value: 0},{ mine: true, value: 0}]
      ];
      expect(checkNeighbors(gameBoard, [1,1])[1][1].value).toBe(8);

      gameBoard = [
        [{mine: false, value: 0},{mine: true, value: 0},{ mine: true, value: 0}],
        [{mine: true, value: 0},{mine: false, value: 0},{ mine: true, value: 0}],
        [{mine: false, value: 0},{mine: true, value: 0},{ mine: false, value: 0}]
      ];
      expect(checkNeighbors(gameBoard, [1,1])[1][1].value).toBe(5);
      expect(checkNeighbors(gameBoard, [0,0])[0][0].value).toBe(2);
      expect(checkNeighbors(gameBoard, [2,0])[2][0].value).toBe(2);
      expect(checkNeighbors(gameBoard, [2,2])[2][2].value).toBe(2);

    })
  })

})