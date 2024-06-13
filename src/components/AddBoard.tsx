import { useState } from "react";
import { AddBoardForm, BoardInput } from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import { Submit } from "./Submit";

function AddBoard({
  setIsAddOpen,
}: {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [text, setText] = useState("");
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const setBoards = useSetRecoilState(boardsState);
  const toggleForm = () => {
    setIsAddOpen((curr) => !curr);
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
  return (
    <AddBoardForm as="form" onSubmit={addBoard}>
      <BoardInput
        as={"input"}
        placeholder="Enter list title..."
        value={text}
        autoFocus
        onChange={(event) => setText(event.currentTarget.value)}
        style={{ borderRadius: "4px" }}
      />
      <Submit toggleForm={toggleForm} addWhat="list" />
    </AddBoardForm>
  );
}
export default AddBoard;
