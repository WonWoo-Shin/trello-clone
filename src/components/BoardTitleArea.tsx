import { useState } from "react";
import { BoardHandle, BoardInput, BoardTitle } from "../style/style";
import { useBoardStore } from "../store/useBoardStore";

interface IBoardTitleProps {
  boardId: number;
  boardName: string;
  boardHandle: React.RefObject<HTMLDivElement>;
}

export const BoardTitleArea = ({
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
      {isShow ? (
        <BoardInput
          as={"input"}
          type="text"
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
    </BoardHandle>
  );
};
