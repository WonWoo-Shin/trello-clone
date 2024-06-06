import { Card } from "../style/style";
import { memo, useEffect, useRef } from "react";
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
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    hover(item: any) {
      const sourceCardId = item.cardId as ICard["cardId"];
      const destinationCardId = cardId;
      if (sourceCardId === destinationCardId) {
        return;
      }
      const sourceBoardId = item.boardId;
      const destinationBoardId = boardId;
      // 같은 보드 내 카드 이동
      if (sourceBoardId === destinationBoardId) {
        setBoards((oldBoards) => {
          const copyCards = [...oldBoards[sourceBoardId].cards];
          const sourceIndex = copyCards.findIndex(
            (card) => card.cardId === sourceCardId
          );
          const destinationIndex = copyCards.findIndex(
            (card) => card.cardId === destinationCardId
          );
          const draggedCard = copyCards.splice(sourceIndex, 1);
          copyCards.splice(destinationIndex, 0, ...draggedCard);
          return {
            ...oldBoards,
            [sourceBoardId]: { ...oldBoards[sourceBoardId], cards: copyCards },
          };
        });
      }
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "card",
    item: { cardId, cardText, boardId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  drag(drop(ref));
  return <Card ref={ref}>{cardText}</Card>;
}

export default memo(DraggableCard);
