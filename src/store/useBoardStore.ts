import { create } from "zustand";

export interface ICard {
  cardId: number;
  cardText: string;
  cardCheck: boolean;
}

interface IBoards {
  [key: number]: {
    boardName: string;
    cards: ICard[];
  };
}

interface IBoardState {
  boardOrder: number[];
  boards: IBoards;
}

export const useBoardStore = create<IBoardState>((set) => ({
  boardOrder: [123456789, 123456790, 123456791],
  boards: {
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
}));
