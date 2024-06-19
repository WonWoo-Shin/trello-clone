import { Card, CardDrop } from "../style/style";
import { memo, useEffect } from "react";
import { ICard, boardsState } from "../atom";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useSetRecoilState } from "recoil";

interface ICardProps extends ICard {
  index: number;
  boardId: number;
}

function DraggableCard({ cardId, cardText, index, boardId }: ICardProps) {
  const setBoards = useSetRecoilState(boardsState);

  return (
    <CardDrop>
      <Card>{cardText}</Card>
    </CardDrop>
  );
}

export default memo(DraggableCard);
