import { AddBoardBtn, AnotherList, BoardsList } from "../style/style";
import { useRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { AddBtn } from "./Submit";
import { useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter";
import { getFiles } from "@atlaskit/pragmatic-drag-and-drop/external/file";
import { bind } from "bind-event-listener";

function Boards() {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);

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

          switch (source.data.type) {
            case "board":
              const currentClosetEdge = extractClosestEdge(target.data);
              setBoardOrder((order) => {
                const sourceIndex = order.findIndex(
                  (item) => item === sourceBoardId
                );
                let targetIndex = order.findIndex(
                  (item) => item === targetBoardId
                );

                const isMovingLeft = sourceIndex > targetIndex;
                const isMovingRight = sourceIndex < targetIndex;
                if (isMovingRight && currentClosetEdge === "left") {
                  targetIndex -= 1;
                } else if (isMovingLeft && currentClosetEdge === "right") {
                  targetIndex += 1;
                }

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
              let targetIndex = boards[targetBoardId].cards.findIndex(
                (item) => item.cardId === targetCardId
              );

              if (sourceBoardId === targetBoardId) {
                //same board
                setBoards((boards) => {
                  const currentClosetEdge = extractClosestEdge(target.data);
                  const isMovingUp = sourceIndex > targetIndex;
                  const isMovingDown = sourceIndex < targetIndex;
                  if (isMovingUp && currentClosetEdge === "bottom") {
                    targetIndex += 1;
                  }
                  if (isMovingDown && currentClosetEdge === "top") {
                    targetIndex -= 1;
                  }

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
                  const currentClosetEdge = extractClosestEdge(target.data);
                  if (currentClosetEdge === "bottom") {
                    targetIndex += 1;
                  }

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

  //file monitor
  useEffect(() => {
    return monitorForExternal({
      onDrop: ({ source, location }) => {
        if (!location.current.dropTargets.length) {
          //drop outside
          return;
        }
        const target = location.current.dropTargets[0];
        const file = getFiles({ source });
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        bind(reader, {
          type: "load",
          listener() {
            const result = reader.result;
            const upload = {
              type: "image",
              dataUrl: result,
              name: file[0].name,
              size: file[0].size,
            };
            console.log(upload);
            setBoards((boards) => {
              const targetBoardId = target.data.boardId;
              invariant(typeof targetBoardId === "number");
              const newCards = [...boards[targetBoardId].cards];
              return boards;
            });
          },
        });
      },
    });
  }, []);

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
