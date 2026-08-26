import { useState } from "react";

import { useBoardStore } from "../store/useBoardStore";
import {
  BoardHandle,
  BoardTitleArea,
  BoardTextarea,
  BoardTitle,
  CardCount,
  BoardSideButton,
  BoardTitleButton,
} from "../style/style";
import { BoardId, BoardName } from "../type";

interface IBoardTitleProps {
  boardId: BoardId;
  boardName: BoardName;
  boardHandle: React.RefObject<HTMLDivElement>;
  cardCount: number;
}

export const BoardHeader = ({
  boardId,
  boardName,
  boardHandle,
  cardCount,
}: IBoardTitleProps) => {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((curr) => !curr);

  const [text, setText] = useState(boardName);

  const editBoardName = useBoardStore((state) => state.editBoardName);
  const deleteBoard = useBoardStore((state) => state.deleteBoard);

  const editBoardNameSubmit = () => {
    toggleShow();

    if (text === boardName) return;

    if (text === "") {
      setText(boardName);
      return;
    }

    editBoardName(boardId, text);
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
                editBoardNameSubmit();
              }
            }}
            onBlur={editBoardNameSubmit}
            autoFocus
          />
        ) : (
          <BoardTitle>
            <BoardTitleButton onClick={toggleShow}>
              <span>{boardName}</span>
            </BoardTitleButton>
          </BoardTitle>
        )}
      </BoardTitleArea>
      <CardCount>
        <span>{cardCount}</span>
      </CardCount>
      <BoardSideButton
        onClick={() => deleteBoard(boardId)}
        aria-label="보드 삭제"
      >
        <svg fill="none" viewBox="0 0 16 16" role="presentation">
          <path
            fill="currentcolor"
            fill-rule="evenodd"
            d="M0 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m6.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M13 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
            clip-rule="evenodd"
          ></path>
        </svg>
      </BoardSideButton>
    </BoardHandle>
  );
};
