import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { useRecoilValue } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import BoardPreview from "./DragPreview";
import { AddBtn } from "./Submit";
import { useState } from "react";

function Boards() {
  const boardOrder = useRecoilValue(boardOrderState);
  const boards = useRecoilValue(boardsState);
  const [isAddOpen, setIsAddOpen] = useState(false);
  console.log(boards);
  return (
    <BoardsList>
      {boardOrder.map((boardId, index) => (
        <Board
          key={boardId}
          boardId={boardId}
          {...boards[boardId]}
          index={index}
        />
      ))}
      <AnotherList>
        {isAddOpen ? (
          <AddBoard setIsAddOpen={setIsAddOpen} />
        ) : (
          <AddBoardBtn onClick={() => setIsAddOpen(true)}>
            <AddBtn addWhat="another list" />
          </AddBoardBtn>
        )}
      </AnotherList>
    </BoardsList>
  );
}

export default Boards;
