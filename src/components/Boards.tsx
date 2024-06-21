import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { AddBtn } from "./Submit";
import { useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function Boards() {
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);
  const boards = useRecoilValue(boardsState);
  const [isAddOpen, setIsAddOpen] = useState(false);
  //monitor
  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const target = location.current.dropTargets[0];
        if (!target) {
          //drop outside
          return;
        }
        const sourceIndex = source.data.index;
        const targetIndex = target.data.index;
        if (
          typeof sourceIndex !== "number" ||
          typeof targetIndex !== "number"
        ) {
          //type guarding
          return;
        }
        if (sourceIndex !== targetIndex) {
          //move board
          setBoardOrder((order) => {
            const newOrder = [...order];
            const draggedItem = newOrder.splice(sourceIndex, 1);
            newOrder.splice(targetIndex, 0, ...draggedItem);
            return newOrder;
          });
        }
      },
    });
  }, []);
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
