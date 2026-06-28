import { useState } from "react";
import { AddBoardForm, BoardTextarea } from "../style/style";
import { Submit } from "./Submit";
import { useBoardStore } from "../store/useBoardStore";

interface IProps {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBoard = ({ setIsAddOpen }: IProps) => {
  const [text, setText] = useState("");

  const addBoard = useBoardStore((state) => state.addBoard);

  const toggleForm = () => {
    setIsAddOpen((curr) => !curr);
    setText("");
  };

  const addBoardSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text === "") {
      toggleForm();
      return;
    }

    addBoard(text);

    setText("");
  };

  return (
    <AddBoardForm as="form" onSubmit={addBoardSubmit}>
      <BoardTextarea
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
};
