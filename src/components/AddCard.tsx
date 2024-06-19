import { useState } from "react";
import { FormInput } from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atom";
import { Submit } from "./Submit";

interface IAddProps {
  boardId: number;
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddCard({ boardId, setIsAddOpen }: IAddProps) {
  const [text, setText] = useState("");
  const setBoards = useSetRecoilState(boardsState);
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
    setBoards((currBoards) => {
      const newCards = [
        ...currBoards[boardId].cards,
        { cardId: Date.now(), cardText: text },
      ];
      const newBoard = { ...currBoards[boardId], cards: newCards };
      return { ...currBoards, [boardId]: newBoard };
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
}

export default AddCard;
