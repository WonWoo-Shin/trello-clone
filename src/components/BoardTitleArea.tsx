import { memo, useState } from "react";
import { BoardHandle, BoardInput, BoardTitle } from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atom";

interface IBoardTitleProps {
  boardId: number;
  boardName: string;
  boardHandle: React.MutableRefObject<null>;
}

function BoardTitleArea({ boardId, boardName, boardHandle }: IBoardTitleProps) {
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((curr) => !curr);
  const [text, setText] = useState(boardName);
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
    <BoardHandle ref={boardHandle}>
      {isShow ? (
        <BoardInput
          as={"input"}
          type="text"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
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
}

export default memo(BoardTitleArea);
