import {
  BoardBlock,
  BoardContainer,
  BoardInput,
  BoardTitle,
} from "../style/style";
import { memo, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import skipAnimation from "../functions/skipAnimation";
import { useDrag, useDrop } from "react-dnd";

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
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "board",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
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
    <BoardBlock>
      <BoardContainer ref={preview}>
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
        <ul ref={drop}>
          {cards.map((card, index) => (
            <DraggableCard key={card.cardId} {...card} index={index} />
          ))}
        </ul>
        <AddCard boardId={boardId} />
      </BoardContainer>
    </BoardBlock>
  );
}

export default memo(Board);
