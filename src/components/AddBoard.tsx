import { memo, useState } from "react";
import { AddBoardBtn, AddBoardForm, BoardInput } from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import { AddBtn, Submit } from "./Submit";

function AddBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const setBoards = useSetRecoilState(boardsState);
  const toggleForm = () => {
    setIsOpen((curr) => !curr);
    setText("");
  };
  const addBoard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") {
      toggleForm();
      return;
    }
    setBoardOrder((curr) => [...curr, text]);
    setBoards((oldBoards) => {
      return { ...oldBoards, [text]: [] };
    });
    setText("");
  };
  return isOpen ? (
    <AddBoardForm as="form" onSubmit={addBoard}>
      <BoardInput
        placeholder="Enter list title..."
        value={text}
        autoFocus
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Submit toggleForm={toggleForm} addWhat="list" />
    </AddBoardForm>
  ) : (
    <AddBoardBtn onClick={toggleForm}>
      <AddBtn addWhat="another list" />
    </AddBoardBtn>
  );
}

export default memo(AddBoard);
