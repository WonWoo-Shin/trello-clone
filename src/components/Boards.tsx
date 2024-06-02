import { AnotherList, BoardsList } from "../style/style";
import { useRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { useDrop } from "react-dnd";

function Boards() {
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);
  const [boards, setBoards] = useRecoilState(boardsState);
  const dragItem = () => {};
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
        <AddBoard />
      </AnotherList>
    </BoardsList>
  );
}

export default Boards;
