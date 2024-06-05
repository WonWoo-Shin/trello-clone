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
import { useDrag, useDrop } from "react-dnd";
import BoardPreview from "./Preview";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
  index: number;
}

function Board({ boardId, boardName, cards, index }: IBoardProps) {
  const [text, setText] = useState(boardName);
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((curr) => !curr);
  const setBoards = useSetRecoilState(boardsState);
  const setBoardOrder = useSetRecoilState(boardOrderState);
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
  const [{ isOver }, drop] = useDrop({
    accept: "board",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
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
    <BoardBlock ref={drop}>
      <BoardContainer style={isDragging ? { opacity: "0.4" } : {}}>
        <div ref={preview}></div>
        <BoardTitle
          ref={drag}
          onClick={toggleShow}
          style={isShow ? { display: "none" } : {}}
        >
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
      <BoardPreview />
    </BoardBlock>
  );
}

export default memo(Board);
