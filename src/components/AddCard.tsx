import { memo, useState } from "react";
import {
  AddCardBtn,
  FormInput,
  SubmitArea,
  SubmitButton,
  Xmark,
} from "../style/style";
import { useRecoilState } from "recoil";
import { TDefaultBoard, boardsState } from "../atom";

interface IAddProps {
  boardId: TDefaultBoard;
}

function AddCard({ boardId }: IAddProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [boards, setBoards] = useRecoilState(boardsState);
  const toggleForm = () => setIsOpen((curr) => !curr);
  const addCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === "") {
      toggleForm();
      return;
    }
    setBoards((currBoards) => {
      const newBoards = [...currBoards[boardId], { id: Date.now(), text }];
      return { ...boards, [boardId]: newBoards };
    });
    setText("");
  };
  return isOpen ? (
    <form onSubmit={addCard}>
      <FormInput
        as="input"
        autoFocus
        placeholder="Enter a title for this card..."
        onChange={(event) => setText(event.currentTarget.value)}
        value={text}
      />
      <SubmitArea>
        <SubmitButton>Add card</SubmitButton>
        <Xmark onClick={toggleForm}>
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </Xmark>
      </SubmitArea>
    </form>
  ) : (
    <AddCardBtn onClick={toggleForm}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="14"
        height="14"
        fill="currentColor"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
      <span>Add a card</span>
    </AddCardBtn>
  );
}

export default memo(AddCard);
