import { atom } from "recoil";

export interface ICard {
  cardId: number;
  cardText: string;
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
        { cardId: 12345678, cardText: "Project planning" },
        { cardId: 12345679, cardText: "b" },
        { cardId: 435634256, cardText: "d" },
        { cardId: 12345680, cardText: "c" },
      ],
    },
    123456790: {
      boardName: "Doing",
      cards: [{ cardId: 3256423, cardText: "123", dataUrl: "/123.webp" }],
    },
    123456791: {
      boardName: "Done",
      cards: [
        {
          cardId: 15436457,
          cardText: "123",
          dataUrl: "/1714118910.jpg",
        },
        {
          cardId: 15436237,
          cardText: "123",
          dataUrl: "/MOKOKO_01.png",
        },
      ],
    },
  },
});
