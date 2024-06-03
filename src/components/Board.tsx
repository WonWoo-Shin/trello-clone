import {
  BoardBlock,
  BoardContainer,
  BoardInput,
  BoardTitle,
  BoardTrace,
  BoardTraceBlock,
} from "../style/style";
import { memo, useRef, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardOrderState, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
  index: number;
}

function Board({ boardId, boardName, cards, index }: IBoardProps) {
  const [text, setText] = useState(boardName);
  const [isOut, setIsOut] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((curr) => !curr);
  const setBoards = useSetRecoilState(boardsState);
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: "board",
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item: any, monitor) {
      if (boardId === item.boardId) {
        return;
      }
      setBoardOrder((oldBoardOrder) => {
        const sourceIndex = oldBoardOrder.findIndex(
          (order) => order === item.boardId
        );
        const destinationIndex = oldBoardOrder.findIndex(
          (order) => order === boardId
        );
        const newBoardOrder = [...oldBoardOrder];
        const draggedBoard = newBoardOrder.splice(sourceIndex, 1);
        newBoardOrder.splice(destinationIndex, 0, ...draggedBoard);
        return newBoardOrder;
      });
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "board",
    item: { boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const changeBoardName = () => {
    toggleShow();
    if (text === boardName) return;
    if (text === "") {
      setText(boardName);
      return;
    }
    setBoards((oldBoards) => {
      const newBoard = { ...oldBoards[boardId], boardName: text };
      return { ...oldBoards, [boardId]: newBoard };
    });
  };

  return (
    <>
      <BoardBlock ref={drop} $isDragging={isDragging}>
        {isDragging ? (
          <BoardTrace />
        ) : (
          <BoardContainer ref={preview} $isDragging={isDragging}>
            <BoardTitle ref={drag} onClick={toggleShow} $isShow={isShow}>
              {boardName}
            </BoardTitle>
            {isShow && (
              <BoardInput
                type="text"
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
                onBlur={changeBoardName}
                autoFocus
              />
            )}
            <ul>
              {cards.map((card, index) => (
                <DraggableCard key={card.cardId} {...card} index={index} />
              ))}
            </ul>
            <AddCard boardId={boardId} />
          </BoardContainer>
        )}
      </BoardBlock>
    </>
  );
}

export default memo(Board);
