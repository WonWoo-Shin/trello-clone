import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { AddBtn } from "./Submit";
import { useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";

function Boards() {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);
  const [isAddOpen, setIsAddOpen] = useState(false);
  //monitor
  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        console.log(location.current.dropTargets[0].data);
        if (!location.current.dropTargets.length) {
          //drop outside
          return;
        }
        const target = location.current.dropTargets[0];
        if (target.element !== location.initial.dropTargets[0].element) {
          //move item
          const sourceBoardId = source.data.boardId;
          const targetBoardId = target.data.boardId;
          invariant(typeof sourceBoardId === "number");
          invariant(typeof targetBoardId === "number");
          switch (source.data.type) {
            case "board":
              setBoardOrder((order) => {
                const sourceIndex = order.findIndex(
                  (item) => item === sourceBoardId
                );
                const targetIndex = order.findIndex(
                  (item) => item === targetBoardId
                );
                const newOrder = [...order];
                const draggedItem = newOrder.splice(sourceIndex, 1);
                newOrder.splice(targetIndex, 0, ...draggedItem);
                return newOrder;
              });
              break;
            case "card":
              const targetType = target.data.type;
              const sourceCardId = source.data.cardId;
              const targetCardId = target.data.cardId;
              const sourceIndex = boards[sourceBoardId].cards.findIndex(
                (item) => item.cardId === sourceCardId
              );
              const targetIndex = boards[targetBoardId].cards.findIndex(
                (item) => item.cardId === targetCardId
              );
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
                  const copyTargetCards = [...boards[targetBoardId].cards];
                  const draggedCard = copySourceCards.splice(sourceIndex, 1);
                  if (targetType === "card") {
                    copyTargetCards.splice(targetIndex, 0, ...draggedCard);
                  } else if (targetType === "board") {
                    copyTargetCards.push(...draggedCard);
                  }
                  return {
                    ...boards,
                    [sourceBoardId]: {
                      ...boards[sourceBoardId],
                      cards: copySourceCards,
                    },
                    [targetBoardId]: {
                      ...boards[targetBoardId],
                      cards: copyTargetCards,
                    },
                  };
                });
              }
              break;
            default:
              return;
          }
        }
      },
    });
  }, [boards, boardOrder]);
  return (
    <BoardsList>
      {boardOrder.map((boardId) => (
        <Board key={boardId} boardId={boardId} {...boards[boardId]} />
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
