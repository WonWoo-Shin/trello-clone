import { Card, CardDrop, CardDropPreview } from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import { ICard, boardsState } from "../atom";
import { useSetRecoilState } from "recoil";
import invariant from "tiny-invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

interface ICardProps extends ICard {
  boardId: number;
  removeCardPreview: () => void;
}

function DraggableCard({
  cardId,
  cardText,
  boardId,
  removeCardPreview,
}: ICardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [closetEdge, setClosetEdge] = useState<Edge | null>(null);
  const [cardHide, setCardHide] = useState(false);

  const dropRef = useRef<HTMLLIElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  //drop
  useEffect(() => {
    const cardDrop = dropRef.current;
    invariant(cardDrop);
    return dropTargetForElements({
      element: cardDrop,
      canDrop: ({ source }) => {
        return source.data.type === "card";
      },
      onDrag: ({ source, self }) => {
        const currentClosetEdge = extractClosestEdge(self.data);
        if (source.data.cardId !== cardId) {
          setClosetEdge(currentClosetEdge);
        }
      },
      onDragEnter: ({ self, location }) => {
        const currentClosetEdge = extractClosestEdge(self.data);
        setClosetEdge(currentClosetEdge);
        removeCardPreview();
      },
      onDragLeave: ({ source }) => {
        if (source.data.cardId === cardId) {
          setCardHide(true);
        }
        setClosetEdge(null);
      },
      onDrop: () => {
        setClosetEdge(null);
      },
      getData: ({ input, element }) => {
        const data = {
          cardId,
          boardId,
          type: "card",
        };
        return attachClosestEdge(data, {
          element,
          input,
          allowedEdges: ["top", "bottom"],
        });
      },
      getIsSticky: () => true,
    });
  }, []);

  //drag
  useEffect(() => {
    const card = dragRef.current;
    invariant(card);
    return draggable({
      element: card,
      onDragStart: () => setIsDragging(true),
      onDrop: () => {
        setIsDragging(false);
        setCardHide(false);
      },
      getInitialData: () => ({ cardId, boardId, type: "card" }),
    });
  }, []);

  return (
    <>
      {closetEdge === "bottom" && <CardDropPreview />}
      <CardDrop ref={dropRef} hidden={cardHide}>
        <Card ref={dragRef} style={isDragging ? { opacity: "0.4" } : {}}>
          {cardText}
        </Card>
      </CardDrop>
      {closetEdge === "top" && <CardDropPreview />}
    </>
  );
}

export default memo(DraggableCard);
