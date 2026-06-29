export type BoardId = number;
export type BoardName = string;
export type CardId = number;
export type CardText = string;

export interface ICard {
  cardId: CardId;
  cardText: CardText;
  cardCheck: boolean;
}

export interface IBoards {
  [key: BoardId]: {
    boardName: BoardName;
    cards: ICard[];
  };
}

export interface IBoardState {
  boardOrder: BoardId[];
  boards: IBoards;
  addBoard: (text: BoardName) => void;
  deleteBoard: (boardId: BoardId) => void;
  addCard: (boardId: BoardId, text: CardText) => void;
  editBoardName: (boardId: BoardId, text: BoardName) => void;
}
