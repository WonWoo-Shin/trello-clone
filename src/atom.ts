import { atom } from "recoil";

export interface ICard {
  id: number;
  text: string;
}

export type DefaultBoard = "To do" | "Doing" | "Done";

type typeList = {
  [key in DefaultBoard]: ICard[];
};

export const boardOrderState = atom<DefaultBoard[]>({
  key: "boardOrderState",
  default: ["To do", "Doing", "Done"],
});

export const boardsState = atom<typeList>({
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
