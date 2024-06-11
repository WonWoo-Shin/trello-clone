import { memo, useState } from "react";
import {
  AddBoardBtn,
  AddBoardForm,
  BoardHandle,
  BoardInput,
} from "../style/style";
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
    const newBoardId = Date.now();
    setBoardOrder((curr) => [...curr, newBoardId]);
    setBoards((oldBoards) => {
      return { ...oldBoards, [newBoardId]: { boardName: text, cards: [] } };
    });
    setText("");
  };
  return isOpen ? (
    <AddBoardForm as="form" onSubmit={addBoard}>
      <BoardHandle style={{ marginBottom: "0" }}>
        <BoardInput
          as={"input"}
          placeholder="Enter list title..."
          value={text}
          autoFocus
          onChange={(event) => setText(event.currentTarget.value)}
          style={{ borderRadius: "4px" }}
        />
      </BoardHandle>
      <Submit toggleForm={toggleForm} addWhat="list" />
    </AddBoardForm>
  ) : (
    <AddBoardBtn onClick={toggleForm}>
      <AddBtn addWhat="another list" />
    </AddBoardBtn>
  );
}

export default memo(AddBoard);
