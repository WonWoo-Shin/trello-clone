import { atom } from "recoil";

export interface ICard {
  id: number;
  text: string;
}

interface IList {
  [key: string]: ICard[];
}

export const boardsState = atom<IList>({
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
