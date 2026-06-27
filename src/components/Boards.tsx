import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { useRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import { AddBtn } from "./Submit";
import { useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { AddBoard } from "./AddBoard";
import { Board } from "./Board";
import { useBoardStore } from "../store/useBoardStore";

export const Boards = () => {
  // const [boards, setBoards] = useRecoilState(boardsState);
  // const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);

  const boardOrder = useBoardStore((state) => state.boardOrder);
  const boards = useBoardStore((state) => state.boards);
  // const { boardOrder, boards } = useBoardStore();
  const setBoardStore = useBoardStore.setState;

  const [isAddOpen, setIsAddOpen] = useState(false);

  //element monitor
  useEffect(() => {
    return monitorForElements({
      onDragStart: () => {},
      onDrop: ({ source, location }) => {
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

          const currentClosetEdge = extractClosestEdge(target.data);

          switch (source.data.type) {
            case "board":
              setBoardStore((state) => {
                const oldOrder = state.boardOrder;

                const sourceIndex = oldOrder.findIndex(
                  (item) => item === sourceBoardId,
                );
                let targetIndex = oldOrder.findIndex(
                  (item) => item === targetBoardId,
                );

                // 마우스가 넘어가도 일정 구간 이상 넘어가지 않으면 반영하지 않음
                const isMovingLeft = sourceIndex > targetIndex;
                const isMovingRight = sourceIndex < targetIndex;

                if (isMovingRight && currentClosetEdge === "left") {
                  targetIndex -= 1;
                } else if (isMovingLeft && currentClosetEdge === "right") {
                  targetIndex += 1;
                }
                // 마우스가 넘어가도 일정 구간 이상 넘어가지 않으면 반영하지 않음

                const newOrder = [...oldOrder];
                const draggedItem = newOrder.splice(sourceIndex, 1);
                newOrder.splice(targetIndex, 0, ...draggedItem);

                return { boardOrder: newOrder };
              });
              break;

            case "card":
              const targetType = target.data.type;

              const sourceCardId = source.data.cardId;
              const targetCardId = target.data.cardId;

              const sourceIndex = boards[sourceBoardId].cards.findIndex(
                (item) => item.cardId === sourceCardId,
              );
              let targetIndex = boards[targetBoardId].cards.findIndex(
                (item) => item.cardId === targetCardId,
              );

              //같은 보드 내 이동
              if (sourceBoardId === targetBoardId) {
                setBoardStore((state) => {
                  const oldBoards = state.boards;

                  // 마우스가 넘어가도 일정 구간 이상 넘어가지 않으면 반영하지 않음
                  const isMovingDown = sourceIndex < targetIndex;
                  const isMovingUp = sourceIndex > targetIndex;

                  if (isMovingDown && currentClosetEdge === "top") {
                    targetIndex -= 1;
                  }
                  if (isMovingUp && currentClosetEdge === "bottom") {
                    targetIndex += 1;
                  }
                  // 마우스가 넘어가도 일정 구간 이상 넘어가지 않으면 반영하지 않음

                  const newCards = [...oldBoards[sourceBoardId].cards];
                  const draggedCard = newCards.splice(sourceIndex, 1)[0];

                  if (targetType === "card") {
                    newCards.splice(targetIndex, 0, draggedCard);
                  } else if (targetType === "board") {
                    newCards.push(draggedCard);
                  }

                  return {
                    boards: {
                      ...oldBoards,
                      [sourceBoardId]: {
                        ...oldBoards[sourceBoardId],
                        cards: newCards,
                      },
                    },
                  };
                });
              } else if (sourceBoardId !== targetBoardId) {
                setBoardStore((state) => {
                  const oldBoards = state.boards;

                  //다른 보드 내 카드 아래 배치할 경우 기존 카드 index아래에 배치
                  if (currentClosetEdge === "bottom") {
                    targetIndex += 1;
                  }

                  const newSourceCards = [...oldBoards[sourceBoardId].cards];
                  const newTargetCards = [...oldBoards[targetBoardId].cards];
                  const draggedCard = newSourceCards.splice(sourceIndex, 1)[0];

                  if (targetType === "card") {
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
