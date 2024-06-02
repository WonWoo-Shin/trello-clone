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
      canDrop: monitor.canDrop(),
    }),
    hover(item, monitor) {},
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: "board",
    item: { boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { boardId } = item;
      setBoardOrder((oldBoardOrder) => {
        const sourceIndex = oldBoardOrder.findIndex((item) => item === boardId);
        const newBoardOrder = [...oldBoardOrder];
        const draggedBoard = newBoardOrder.splice(sourceIndex, 1);
        newBoardOrder.splice(1, 0, ...draggedBoard);
        return oldBoardOrder;
      });
    },
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
      </BoardBlock>
      {isOver && (
        <BoardTraceBlock ref={drop}>
          <BoardTrace />
          <span>{boardId}</span>
        </BoardTraceBlock>
      )}
    </>
  );
}

export default memo(Board);
