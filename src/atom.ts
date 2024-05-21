import { atom } from "recoil";

export interface ICard {
  id: number;
  text: string;
}

export type TDefaultBoard = "To do" | "Doing" | "Done";

type TList = {
  [key in TDefaultBoard]: ICard[];
};

export const boardOrderState = atom<TDefaultBoard[]>({
  key: "boardOrderState",
  default: ["To do", "Doing", "Done"],
});

export const boardsState = atom<TList>({
  key: "boardsState",
  default: {
    "To do": [
      { id: 12345678, text: "Project planning" },
      { id: 12345679, text: "b" },
      { id: 12345680, text: "c" },
    ],
    Doing: [],
    Done: [],
  },
});
