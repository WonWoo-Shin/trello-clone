import { AnotherList, BoardsList } from "../style/style";
import { useRecoilValue } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import BoardPreview from "./DragPreview";

function Boards() {
  const boardOrder = useRecoilValue(boardOrderState);
  const boards = useRecoilValue(boardsState);
  return (
    <BoardsList>
      <BoardPreview />
      {boardOrder.map((boardId, index) => (
        <Board
          key={boardId}
          boardId={boardId}
          {...boards[boardId]}
          index={index}
        />
      ))}
      <AnotherList>
        <AddBoard />
      </AnotherList>
    </BoardsList>
  );
}

export default Boards;
