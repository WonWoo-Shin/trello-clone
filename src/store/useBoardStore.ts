import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BoardId, BoardName, CardId, CardText, IBoards } from "../type";

interface IBoardState {
  boardOrder: BoardId[];
  boards: IBoards;
  addBoard: (text: BoardName) => void;
  deleteBoard: (boardId: BoardId) => void;
  addCard: (boardId: BoardId, text: CardText) => void;
  editBoardName: (boardId: BoardId, text: BoardName) => void;
  editCardName: (boardId: BoardId, cardId: CardId, text: CardText) => void;
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

          const newBoards = { ...state.boards };
          delete newBoards[boardId];

          return { boardOrder: newBoardOrder, boards: newBoards };
        }),
      addCard: (boardId, text) =>
        set((state) => {
          const oldBoards = state.boards;

          const newCards = [
            ...oldBoards[boardId].cards,
            { cardId: Date.now(), cardText: text, cardCheck: false },
          ];

          const newBoard = { ...oldBoards[boardId], cards: newCards };

          return {
            boards: {
              ...oldBoards,
              [boardId]: newBoard,
            },
          };
        }),
      editBoardName: (boardId, text) =>
        set((state) => {
          const oldBoards = state.boards;

          const newBoard = { ...oldBoards[boardId], boardName: text };

          return { boards: { ...oldBoards, [boardId]: newBoard } };
        }),
      editCardName: (boardId, cardId, text) =>
        set((state) => {
          const oldBoards = state.boards;

          const newCards = oldBoards[boardId].cards.map((card) =>
            card.cardId === cardId ? { ...card, cardText: text } : card,
          );

          const newBoard = { ...oldBoards[boardId], cards: newCards };

          return { boards: { ...oldBoards, [boardId]: newBoard } };
        }),
    }),
    {
      name: "boardStorage",
    },
  ),
);
