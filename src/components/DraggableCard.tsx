import { Card, CardDrop } from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import { ICard, boardsState } from "../atom";
import { useSetRecoilState } from "recoil";
import invariant from "tiny-invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface ICardProps extends ICard {
  boardId: number;
}

function DraggableCard({ cardId, cardText, boardId }: ICardProps) {
  const setBoards = useSetRecoilState(boardsState);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  //drop
  useEffect(() => {
    const cardDrop = dropRef.current;
    invariant(cardDrop);
    return dropTargetForElements({
      element: cardDrop,
      onDragEnter: () => setIsDraggingOver(true),
      onDragLeave: () => setIsDraggingOver(false),
      onDrop: () => setIsDraggingOver(false),
      getData: () => ({ cardId, boardId, type: "card" }),
      canDrop: ({ source }) => {
        return source.data.type === "card";
      },
    });
  }, [cardId, boardId]);
  //drag
  useEffect(() => {
    const card = dragRef.current;
    invariant(card);
    return draggable({
      element: card,
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
      getInitialData: () => ({ cardId, boardId, type: "card" }),
    });
  }, [cardId, boardId]);
  return (
    <CardDrop
      ref={dropRef}
      style={isDraggingOver ? { backgroundColor: "#E2E4E9" } : {}}
    >
      <Card ref={dragRef} style={isDragging ? { opacity: "0.4" } : {}}>
        {cardText}
      </Card>
    </CardDrop>
  );
}

export default memo(DraggableCard);
