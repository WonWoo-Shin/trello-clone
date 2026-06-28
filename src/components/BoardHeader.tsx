import { useState } from "react";

import { useBoardStore } from "../store/useBoardStore";
import {
  BoardHandle,
  BoardTitleArea,
  BoardTextarea,
  BoardTitle,
  CardCount,
  BoardSideButton,
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
  const deleteBoard = useBoardStore((state) => state.deleteBoard);

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
      <BoardSideButton onClick={() => deleteBoard(boardId)}>
        <svg fill="none" viewBox="0 0 16 16" role="presentation">
          <path
            fill="currentcolor"
            fillRule="evenodd"
            d="M1 1h14v5h-1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1zm2.5 5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V6zm10-1.5h-11v-2h11zm-3 4.5h-5V7.5h5z"
            clipRule="evenodd"
          ></path>
        </svg>
      </BoardSideButton>
    </BoardHandle>
  );
};
