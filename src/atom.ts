import { atom } from "recoil";

export interface ICard {
  cardId: number;
  cardText: string;
  cardCheck: boolean;
  type?: string;
  dataUrl?: string;
  size?: number;
}

type TList = {
  [key in number]: { boardName: string; cards: ICard[] };
};

export const boardOrderState = atom<number[]>({
  key: "boardOrderState",
  default: [123456789, 123456790, 123456791],
});

export const boardsState = atom<TList>({
  key: "boardsState",
  default: {
    123456789: {
      boardName: "To do",
      cards: [
        { cardId: 12345678, cardText: "Project planning", cardCheck: true },
        { cardId: 12345679, cardText: "b", cardCheck: false },
        { cardId: 12345680, cardText: "c", cardCheck: false },
      ],
    },
    123456790: {
      boardName: "Doing",
      cards: [],
    },
    123456791: {
      boardName: "Done",
      cards: [],
    },
  },
});
