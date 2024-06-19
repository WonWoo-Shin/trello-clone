import {
  AddCardBtn,
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
import { AddBtn } from "./Submit";

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
  const [isAddOpen, setIsAddOpen] = useState(false);
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
  const [{ isBoardOver, isBoardHover }, boardDrop] = useDrop({
    accept: "board",
    collect: (monitor) => ({
      isBoardOver: !!monitor.getItem(),
      isBoardHover: monitor.isOver(),
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
  const requestedFrame = requestAnimationFrame;
  const [{ isOver }, cardDrop] = useDrop({
    accept: "card",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item: any) {
      const sourceBoardId = item.boardId as ICard["cardId"];
      const targetBoardId = boardId;
      if (sourceBoardId === targetBoardId) {
        return;
      }
      item.boardId = boardId;
      setBoards((oldBoards) => {
        const copySoureCards = [...oldBoards[sourceBoardId].cards];
        const copyTargetCards = [...oldBoards[targetBoardId].cards];
        const sourceIndex = copySoureCards.findIndex(
          (card) => card.cardId === item.cardId
        );
        const draggedItem = copySoureCards.splice(sourceIndex, 1);
        copyTargetCards.push(...draggedItem);
        return {
          ...oldBoards,
          [sourceBoardId]: {
            ...oldBoards[sourceBoardId],
            cards: copySoureCards,
          },
          [targetBoardId]: {
            ...oldBoards[targetBoardId],
            cards: copyTargetCards,
          },
        };
      });
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
        {isAddOpen ? (
          <AddCard boardId={boardId} setIsAddOpen={setIsAddOpen} />
        ) : (
          <AddCardBtn
            onClick={() => setIsAddOpen(true)}
            $isBoardOver={isBoardOver}
          >
            <AddBtn addWhat={"a card"} />
          </AddCardBtn>
        )}
      </BoardContainer>
    </BoardBlock>
  );
}

export default memo(Board);
