export type BoardId = number;
export type BoardName = string;
export type CardId = number;
export type CardText = string;
export type CardCheck = boolean;

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
