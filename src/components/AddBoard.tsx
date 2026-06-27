import { useState } from "react";
import { AddBoardForm, BoardInput } from "../style/style";
import { Submit } from "./Submit";
import { useBoardStore } from "../store/useBoardStore";

interface IProps {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddBoard = ({ setIsAddOpen }: IProps) => {
  const [text, setText] = useState("");

  const setBoardStore = useBoardStore.setState;

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

    setBoardStore((oldBoardStore) => ({
      boardOrder: [...oldBoardStore.boardOrder, newBoardId],
      boards: {
        ...oldBoardStore.boards,
        [newBoardId]: { boardName: text, cards: [] },
      },
    }));

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
};
