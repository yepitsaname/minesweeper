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
      const gameBoard = [
        [{mine: true, value: 0},{mine: true, value: 0},{ mine: true, value: 0}],
        [{mine: true, value: 0},{mine: false, value: 0},{ mine: true, value: 0}],
        [{mine: true, value: 0},{mine: true, value: 0},{ mine: true, value: 0}]
      ];

      let endState = checkNeighbors(gameBoard, [1,1]);
      expect(endState[1][1].value).toBe(8);
    })
  })

})