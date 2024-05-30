import {
  BoardBlock,
  BoardContainer,
  BoardInput,
  BoardTitle,
  Cards,
} from "../style/style";
import { memo, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import skipAnimation from "../functions/skipAnimation";

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
      <BoardContainer>
        <BoardTitle onClick={toggleShow} $isShow={isShow}>
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
        <Cards>
          {cards.map((card, index) => (
            <DraggableCard key={card.cardId} {...card} index={index} />
          ))}
        </Cards>
        <AddCard boardId={boardId} />
      </BoardContainer>
    </BoardBlock>
  );
}

export default memo(Board);
