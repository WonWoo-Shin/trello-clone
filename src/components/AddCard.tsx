import { memo, useState } from "react";
import { AddCardBtn, FormInput } from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atom";
import { AddBtn, Submit } from "./Submit";

interface IAddProps {
  boardId: number;
  isBoardOver: boolean;
}

function AddCard({ boardId, isBoardOver }: IAddProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const setBoards = useSetRecoilState(boardsState);
  const toggleForm = () => {
    setIsOpen((curr) => !curr);
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
  return isOpen ? (
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
  ) : (
    <AddCardBtn onClick={toggleForm} $isBoardOver={isBoardOver}>
      <AddBtn addWhat={"a card"} />
    </AddCardBtn>
  );
}

export default memo(AddCard);
