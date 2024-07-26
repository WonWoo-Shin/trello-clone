import {
  AddCardBtn,
  BoardBlock,
  BoardContainer,
  BoardDropPreview,
} from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard } from "../atom";
import AddCard from "./AddCard";
import BoardTitleArea from "./BoardTitleArea";
import { AddBtn } from "./Submit";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import invariant from "tiny-invariant";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
}

function Board({ boardId, boardName, cards }: IBoardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [closetEdge, setClosetEdge] = useState<Edge | null>(null);
  const [boardHide, setBoardHide] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  //drop
  useEffect(() => {
    const boardBlock = dropRef.current;
    invariant(boardBlock);
    return dropTargetForElements({
      element: boardBlock,
      canDrop: ({ source }) => {
        return source.data.type === "board";
      },
      onDrag: ({ source, self }) => {
        const currentClosetEdge = extractClosestEdge(self.data);
        if (source.data.boardId !== boardId) {
          setClosetEdge(currentClosetEdge);
        }
      },
      onDragEnter: ({ source, self }) => {
        const currentClosetEdge = extractClosestEdge(self.data);
        setClosetEdge(currentClosetEdge);
      },
      onDragLeave: ({ source }) => {
        if (source.data.boardId === boardId) {
          setBoardHide(true);
        }
        setClosetEdge(null);
      },
      onDrop: () => setClosetEdge(null),
      getData: ({ input, element }) => {
        const data = {
          boardId,
          type: "board",
        };
        return attachClosestEdge(data, {
          element,
          input,
          allowedEdges: ["left", "right"],
        });
      },
      getIsSticky: () => true,
    });
  }, []);

  //drag
  useEffect(() => {
    const board = dragRef.current;
    const boardHandle = dragHandleRef.current;
    invariant(board);
    invariant(boardHandle);
    return draggable({
      element: board,
      dragHandle: boardHandle,
      onDragStart: () => setIsDragging(true),
      onDrop: () => {
        setIsDragging(false);
        setBoardHide(false);
      },
      getInitialData: () => ({ boardId, type: "board" }),
    });
  }, []);

  return (
    <>
      {closetEdge === "left" && <BoardDropPreview />}
      <BoardBlock ref={dropRef} hidden={boardHide}>
        <BoardContainer
          ref={dragRef}
          style={isDragging ? { opacity: "0.4" } : {}}
        >
          <BoardTitleArea
            boardId={boardId}
            boardName={boardName}
            boardHandle={dragHandleRef}
          />
          <ul>
            {cards.map((card) => (
              <DraggableCard key={card.cardId} {...card} boardId={boardId} />
            ))}
          </ul>
          {isAddOpen ? (
            <AddCard boardId={boardId} setIsAddOpen={setIsAddOpen} />
          ) : (
            <AddCardBtn onClick={() => setIsAddOpen(true)}>
              <AddBtn addWhat={"a card"} />
            </AddCardBtn>
          )}
        </BoardContainer>
      </BoardBlock>
      {closetEdge === "right" && <BoardDropPreview />}
    </>
  );
}

export default memo(Board);
