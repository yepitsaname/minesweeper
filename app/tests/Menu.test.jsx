import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Menu from "../components/Menu";

describe("Menu Tests", ()=>{
  describe("Menu", ()=>{
    it("shows 'Main Menu'", ()=>{
      render(<Menu state={0}/>);
      const menu = screen.getByText("Main Menu");
      expect(menu).toBeInTheDocument();
    })
  })
  describe("Win, Loss, Score", ()=>{
    it("shows 'You Won!'", ()=>{
      render(<Menu state={1}/>);
      const youWon = screen.getByText("You Won!");
      expect(youWon).toBeInTheDocument();
    })

    it("shows 'You Lost!'", ()=>{
      render(<Menu state={2}/>);
      const youLose = screen.getByText("You Lost!");
      expect(youLose).toBeInTheDocument();
    })

  })
})