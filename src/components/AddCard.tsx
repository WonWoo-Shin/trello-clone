import { useState } from "react";
import { FormInput } from "../style/style";
import { Submit } from "./Submit";
import { useBoardStore } from "../store/useBoardStore";

interface IAddProps {
  boardId: number;
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCard = ({ boardId, setIsAddOpen }: IAddProps) => {
  const [text, setText] = useState("");

  const setBoardStore = useBoardStore.setState;

  const toggleForm = () => {
    setIsAddOpen((curr) => !curr);
    setText("");
  };

  const addCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") {
      toggleForm();
      return;
    }

    setBoardStore((state) => {
      const oldBoards = state.boards;

      const newCards = [
        ...oldBoards[boardId].cards,
        { cardId: Date.now(), cardText: text, cardCheck: false },
      ];

      const newBoard = { ...oldBoards[boardId], cards: newCards };

      return {
        boards: {
          ...oldBoards,
          [boardId]: newBoard,
        },
      };
    });

    setText("");
  };

  return (
    <form onSubmit={addCard}>
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
