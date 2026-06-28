import { useState } from "react";

import { useBoardStore } from "../store/useBoardStore";
import {
  BoardHandle,
  BoardTitleArea,
  BoardTextarea,
  BoardTitle,
  CardCount,
} from "../style/style";

interface IBoardTitleProps {
  boardId: number;
  boardName: string;
  boardHandle: React.RefObject<HTMLDivElement>;
}

export const BoardHeader = ({
  boardId,
  boardName,
  boardHandle,
}: IBoardTitleProps) => {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((curr) => !curr);

  const [text, setText] = useState(boardName);

  const setBoardStore = useBoardStore.setState;

  const changeBoardName = () => {
    toggleShow();

    if (text === boardName) return;

    if (text === "") {
      setText(boardName);
      return;
    }

    setBoardStore((state) => {
      const oldBoards = state.boards;

      const newBoard = { ...oldBoards[boardId], boardName: text };

      return { boards: { ...oldBoards, [boardId]: newBoard } };
    });
  };

  return (
    <BoardHandle ref={boardHandle}>
      <BoardTitleArea>
        {isShow ? (
          <BoardTextarea
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                changeBoardName();
              }
            }}
            onBlur={changeBoardName}
            autoFocus
          />
        ) : (
          <BoardTitle as={"h2"} onClick={toggleShow}>
            {boardName}
          </BoardTitle>
        )}
      </BoardTitleArea>
      <CardCount>
        <span>0</span>
      </CardCount>
      {/* <div>
        <svg fill="none" viewBox="0 0 16 16" role="presentation">
          <path
            fill="currentcolor"
            fill-rule="evenodd"
            d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div> */}
    </BoardHandle>
  );
};
