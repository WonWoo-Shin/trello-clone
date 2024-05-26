import { memo, useState } from "react";
import {
  AddCardBtn,
  FormInput,
  SubmitArea,
  SubmitButton,
  Xmark,
} from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardsState } from "../atom";
import { AddBtn, Submit } from "./Submit";

interface IAddProps {
  boardId: string;
}

function AddCard({ boardId }: IAddProps) {
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
      const newBoards = [...currBoards[boardId], { id: Date.now(), text }];
      return { ...currBoards, [boardId]: newBoards };
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
    <AddCardBtn onClick={toggleForm}>
      <AddBtn addWhat={"a card"} />
    </AddCardBtn>
  );
}

export default memo(AddCard);
