import { useState } from "react";
import { FormInput } from "../style/style";
import { Submit } from "./Submit";
import { useBoardStore } from "../store/useBoardStore";
import { BoardId } from "../type";

interface IAddProps {
  boardId: BoardId;
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCard = ({ boardId, setIsAddOpen }: IAddProps) => {
  const [text, setText] = useState("");

  const addCard = useBoardStore((state) => state.addCard);

  const toggleForm = () => {
    setIsAddOpen((curr) => !curr);
    setText("");
  };

  const addCardSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") {
      toggleForm();
      return;
    }

    addCard(boardId, text);

    setText("");
  };

  return (
    <form onSubmit={addCardSubmit}>
      <FormInput
        as="input"
        placeholder="Enter a title for this card..."
        value={text}
        autoFocus
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <Submit toggleForm={toggleForm} addWhat={"card"} />
    </form>
  );
};
