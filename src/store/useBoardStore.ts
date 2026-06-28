import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  addBoard: (text: string) => void;
  deleteBoard: (boardId: number) => void;
}

export const useBoardStore = create<IBoardState>()(
  persist(
    (set) => ({
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
      addBoard: (text) =>
        set((state) => {
          const newBoardId = Date.now();

          return {
            boardOrder: [...state.boardOrder, newBoardId],
            boards: {
              ...state.boards,
              [newBoardId]: { boardName: text, cards: [] },
            },
          };
        }),
      deleteBoard: (boardId) =>
        set((state) => {
          const newBoardOrder = state.boardOrder.filter(
            (item) => item !== boardId,
          );

          const newBoards = { boardId, ...state.boards };

          return { boardOrder: newBoardOrder, boards: newBoards };
        }),
    }),
    {
      name: "boardStorage",
    },
  ),
);
