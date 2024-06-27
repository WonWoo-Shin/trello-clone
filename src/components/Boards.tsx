import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { AddBtn } from "./Submit";
import { useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function Boards() {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);
  const [isAddOpen, setIsAddOpen] = useState(false);
  //monitor
  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        console.log(location);
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
        //move item
        switch (source.data.type) {
          case "board":
            setBoardOrder((order) => {
              const newOrder = [...order];
              const draggedItem = newOrder.splice(sourceIndex, 1);
              newOrder.splice(targetIndex, 0, ...draggedItem);
              return newOrder;
            });
            break;
          case "card":
            const sourceBoardId = source.data.boardId;
            const targetBoardId = target.data.boardId;
            if (
              typeof sourceBoardId !== "number" ||
              typeof targetBoardId !== "number"
            ) {
              //type guarding
              return;
            }
            const targetType = target.data.type;
            if (sourceBoardId === targetBoardId) {
              //same board
              setBoards((boards) => {
                const copyCards = [...boards[sourceBoardId].cards];
                const draggedCard = copyCards.splice(sourceIndex, 1);
                if (targetType === "card") {
                  copyCards.splice(targetIndex, 0, ...draggedCard);
                } else if (targetType === "board") {
                  copyCards.push(...draggedCard);
                }
                return {
                  ...boards,
                  [sourceBoardId]: {
                    ...boards[sourceBoardId],
                    cards: copyCards,
                  },
                };
              });
            } else if (sourceBoardId !== targetBoardId) {
              //cross board
              setBoards((boards) => {
                const copySourceCards = [...boards[sourceBoardId].cards];
                const copyTargerCards = [...boards[targetBoardId].cards];
                const draggedCard = copySourceCards.splice(sourceIndex, 1);
                if (targetType === "card") {
                  copyTargerCards.splice(targetIndex, 0, ...draggedCard);
                } else if (targetType === "board") {
                  copyTargerCards.push(...draggedCard);
                }
                return {
                  ...boards,
                  [sourceBoardId]: {
                    ...boards[sourceBoardId],
                    cards: copySourceCards,
                  },
                  [targetBoardId]: {
                    ...boards[targetBoardId],
                    cards: copyTargerCards,
                  },
                };
              });
            }
            break;
          default:
            return;
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
