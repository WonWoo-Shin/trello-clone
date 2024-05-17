import { atom } from "recoil";

interface IList {
  [key: string]: string[];
}

export const boardsState = atom<IList>({
  key: "boardsState",
  default: {
    "To Do": ["a", "b", "c"],
    Doing: [],
    Done: [],
  },
});
