import { memo, useState } from "react";
import {
  AddBoardBtn,
  AddBoardForm,
  BoardInput,
  SubmitArea,
  SubmitButton,
  Xmark,
} from "../style/style";
import { useSetRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";

function AddBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const setBoards = useSetRecoilState(boardsState);
  const toggleForm = () => {
    setIsOpen((curr) => !curr);
  };
  const addBoard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText("");
    setBoardOrder((curr) => [...curr, text]);
    setBoards((oldBoards) => {
      return { ...oldBoards, [text]: [] };
    });
  };
  return isOpen ? (
    <AddBoardForm as="form" onSubmit={addBoard}>
      <BoardInput
        placeholder="Enter list title..."
        autoFocus
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <SubmitArea>
        <SubmitButton>Add list</SubmitButton>
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
    </AddBoardForm>
  ) : (
    <AddBoardBtn onClick={toggleForm}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="14"
        height="14"
        fill="currentColor"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
      <span>Add another list</span>
    </AddBoardBtn>
  );
}

export default memo(AddBoard);
