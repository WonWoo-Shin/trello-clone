import { Card, CardDrop } from "../style/style";
import { memo, useEffect } from "react";
import { ICard, boardsState } from "../atom";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ICardProps extends ICard {
  index: number;
  boardId: number;
  isBoardOver: boolean;
}

function DraggableCard({
  cardId,
  cardText,
  index,
  boardId,
  isBoardOver,
}: ICardProps) {
  const setBoards = useSetRecoilState(boardsState);
  const moveCard = (item: any) => {
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
    // 다른 보드로 카드 이동
    // else if (sourceBoardId !== destinationBoardId) {
    //   setBoards((oldBoards) => {
    //     const copySourceCards = [...oldBoards[sourceBoardId].cards];
    //     const copyDestinationCards = [...oldBoards[destinationBoardId].cards];
    //     const sourceIndex = copySourceCards.findIndex(
    //       (card) => card.cardId === sourceCardId
    //     );
    //     const destinationIndex = copyDestinationCards.findIndex(
    //       (card) => card.cardId === destinationCardId
    //     );
    //     const draggedCard = copySourceCards.splice(sourceIndex, 1);
    //     copyDestinationCards.splice(destinationIndex, 0, ...draggedCard);
    //     return {
    //       ...oldBoards,
    //       [sourceBoardId]: {
    //         ...oldBoards[sourceBoardId],
    //         cards: copySourceCards,
    //       },
    //       [destinationBoardId]: {
    //         ...oldBoards[destinationBoardId],
    //         cards: copyDestinationCards,
    //       },
    //     };
    //   });
    // }
  };
  const [{}, drop] = useDrop({
    accept: "card",
    collect: (monitor) => ({}),
    hover(item: any) {
      moveCard(item);
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "card",
    item: { cardId, cardText, boardId, index },
    collect: (monitor) => ({
      isDragging: monitor.getItem()?.cardId === cardId,
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        // const originalIndex = item.index;
        // const cancelIndex = index;
        // const originalBoardId = item.boardId;
        // console.log(originalBoardId);
        // const destinationBoardId = boardId;
        return;
      }
    },
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <CardDrop ref={drop}>
      <Card ref={drag} $isDragging={isDragging} $isBoardOver={isBoardOver}>
        {cardText}
      </Card>
    </CardDrop>
  );
}

export default memo(DraggableCard);
