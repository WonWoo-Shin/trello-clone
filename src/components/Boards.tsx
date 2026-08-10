import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { AddBtn } from "./Submit";
import { useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { AddBoard } from "./AddBoard";
import { Board } from "./Board";
import { useBoardStore } from "../store/useBoardStore";
import { CardId } from "../type";

export const Boards = () => {
  const boardOrder = useBoardStore((state) => state.boardOrder);
  const boards = useBoardStore((state) => state.boards);
  const setBoardStore = useBoardStore.setState;
  const moveBoard = useBoardStore((state) => state.moveBoard);
  const moveCardSameBoard = useBoardStore((state) => state.moveCardSameBoard);

  const [isAddOpen, setIsAddOpen] = useState(false);

  //element monitor
  useEffect(() => {
    return monitorForElements({
      onDragStart: () => {},
      onDrop: ({ source, location }) => {
        //drop 영역 바깥으로 나갈 시
        const hasDropTarget = location.current.dropTargets.length > 0;
        if (!hasDropTarget) return;

        const dropTarget = location.current.dropTargets[0];
        const initialDropTarget = location.initial.dropTargets[0];

        //시작 지점과 drop 지점이 다를 때(이동이 일어났을 때)
        if (dropTarget.element !== initialDropTarget.element) {
          const sourceBoardId = source.data.boardId;
          const targetBoardId = dropTarget.data.boardId;
          invariant(typeof sourceBoardId === "number");
          invariant(typeof targetBoardId === "number");

          const currentClosetEdge = extractClosestEdge(dropTarget.data);

          switch (source.data.type) {
            case "board":
              moveBoard(sourceBoardId, targetBoardId, currentClosetEdge);
              break;

            case "card":
              const sourceCardId = source.data.cardId;
              const sourceIndex = boards[sourceBoardId].cards.findIndex(
                (item) => item.cardId === sourceCardId,
              );

              const targetType = dropTarget.data.type as "card" | "board";
              const targetCardId = dropTarget.data.cardId as CardId;

              //같은 보드 내 이동
              if (sourceBoardId === targetBoardId) {
                moveCardSameBoard(
                  sourceBoardId,
                  sourceIndex,
                  targetBoardId,
                  currentClosetEdge,
                  targetType,
                  targetCardId,
                );
              }

              //다른 보드로 이동
              else if (sourceBoardId !== targetBoardId) {
                setBoardStore((state) => {
                  const oldBoards = state.boards;
                  const newSourceCards = [...oldBoards[sourceBoardId].cards];
                  const newTargetCards = [...oldBoards[targetBoardId].cards];
                  const draggedCard = newSourceCards.splice(sourceIndex, 1)[0];

                  if (targetType === "card") {
                    const targetCardId = dropTarget.data.cardId;
                    let targetIndex = oldBoards[targetBoardId].cards.findIndex(
                      (item) => item.cardId === targetCardId,
                    );

                    //다른 보드 내 카드 아래 배치할 경우 기존 카드 index아래에 배치
                    if (currentClosetEdge === "bottom") {
                      targetIndex += 1;
                    }

                    newTargetCards.splice(targetIndex, 0, draggedCard);
                  } else if (targetType === "board") {
                    newTargetCards.push(draggedCard);
                  }

                  return {
                    boards: {
                      ...oldBoards,
                      [sourceBoardId]: {
                        ...oldBoards[sourceBoardId],
                        cards: newSourceCards,
                      },
                      [targetBoardId]: {
                        ...oldBoards[targetBoardId],
                        cards: newTargetCards,
                      },
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
};
