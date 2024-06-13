import {
  BoardBlock,
  BoardContainer,
  BoardHandle,
  BoardInput,
  BoardTitle,
  CardDrop,
} from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardOrderState, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import BoardTitleArea from "./BoardTitleArea";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
  index: number;
}

function Board({ boardId, boardName, cards, index }: IBoardProps) {
  const setBoards = useSetRecoilState(boardsState);
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const dropRef = useRef(null);
  const moveBoard = (
    oldBoardOrder: number[],
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const newBoardOrder = [...oldBoardOrder];
    const draggedBoard = newBoardOrder.splice(sourceIndex, 1);
    newBoardOrder.splice(destinationIndex, 0, ...draggedBoard);
    return newBoardOrder;
  };
  const [{ isBoardOver }, boardDrop] = useDrop({
    accept: "board",
    collect: (monitor) => ({
      isBoardOver: !!monitor.getItem(),
    }),
    hover(item: any, monitor) {
      if (item.boardId === boardId) {
        return;
      }
      setBoardOrder((oldBoardOrder) => {
        const sourceIndex = oldBoardOrder.findIndex(
          (value) => value === item.boardId
        );
        const destinationIndex = oldBoardOrder.findIndex(
          (value) => value === boardId
        );
        return moveBoard(oldBoardOrder, sourceIndex, destinationIndex);
      });
    },
  });
  const [, cardDrop] = useDrop({
    accept: "card",
    hover(item: any) {
      const sourceBoardId = item.boardId;
      const destinationBoardId = boardId;
      if (sourceBoardId === destinationBoardId) {
        return;
      }
      setBoards((oldBoards) => {
        const copySourceCards = [...oldBoards[sourceBoardId].cards];
        const copyDestinationCards = [...oldBoards[destinationBoardId].cards];
        const sourceIndex = copySourceCards.findIndex(
          (card) => card.cardId === item.cardId
        );
        const draggedCard = copySourceCards.splice(sourceIndex, 1);
        copyDestinationCards.push(...draggedCard);
        return {
          ...oldBoards,
          [sourceBoardId]: {
            ...oldBoards[sourceBoardId],
            cards: copySourceCards,
          },
          [destinationBoardId]: {
            ...oldBoards[destinationBoardId],
            cards: copyDestinationCards,
          },
        };
      });
      item.boardId = boardId;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "board",
    item: { boardId, boardName, cards, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        const originalIndex = item.index;
        const cancleIndex = index;
        setBoardOrder((oldOrder) => {
          return moveBoard(oldOrder, cancleIndex, originalIndex);
        });
      }
    },
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  boardDrop(cardDrop(dropRef));
  return (
    <BoardBlock ref={dropRef}>
      <BoardContainer style={isDragging ? { opacity: "0.4" } : {}}>
        <BoardTitleArea
          dragRef={drag}
          boardId={boardId}
          boardName={boardName}
        />
        <ul>
          {cards.map((card, index) => (
            <DraggableCard
              key={card.cardId}
              {...card}
              index={index}
              boardId={boardId}
              isBoardOver={isBoardOver}
            />
          ))}
        </ul>
        <AddCard boardId={boardId} isBoardOver={isBoardOver} />
      </BoardContainer>
    </BoardBlock>
  );
}

export default memo(Board);
