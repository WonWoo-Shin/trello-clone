import { useState } from "react";

import { useBoardStore } from "../store/useBoardStore";
import {
  BoardHandle,
  BoardTitleArea,
  BoardTextarea,
  BoardTitle,
  CardCount,
  BoardSideButton,
  ButtonTag,
} from "../style/style";
import { BoardId, BoardName } from "../type";

interface IBoardTitleProps {
  boardId: BoardId;
  boardName: BoardName;
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
          <BoardTitle as={"h2"} onClick={toggleShow}>
            {boardName}
          </BoardTitle>
        )}
      </BoardTitleArea>
      <CardCount>
        <span>0</span>
      </CardCount>
      <BoardSideButton
        onClick={() => deleteBoard(boardId)}
        aria-label="보드 삭제"
      >
        <svg fill="none" viewBox="0 0 16 16" role="presentation">
          <path
            fill="currentcolor"
            fillRule="evenodd"
            d="M1 1h14v5h-1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1zm2.5 5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V6zm10-1.5h-11v-2h11zm-3 4.5h-5V7.5h5z"
            clipRule="evenodd"
          ></path>
        </svg>
        {/* <ButtonTag className="button-tag">삭제</ButtonTag> */}
      </BoardSideButton>
    </BoardHandle>
  );
};
