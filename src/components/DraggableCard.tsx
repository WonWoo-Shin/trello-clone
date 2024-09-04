import {
  Card,
  CardDropPreview,
  CardImage,
  CardText,
  CardWrapper,
} from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import { ICard, boardsState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import invariant from "tiny-invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";

import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

interface ICardProps extends ICard {
  boardId: number;
  removeBottomCardPreview: () => void;
}

function DraggableCard({
  cardId,
  cardText,
  boardId,
  removeBottomCardPreview,
  dataUrl,
}: ICardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [closetEdge, setClosetEdge] = useState<Edge | null>(null);
  const [cardHide, setCardHide] = useState(false);
  const [draggingCardHeight, setDraggingCardHeight] = useState("100%");

  const [imageHeight, setImageHeight] = useState({ height: 0, maxHeight: 0 });

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
      onDragEnter: ({ source, self }) => {
        const currentClosetEdge = extractClosestEdge(self.data);
        setClosetEdge(currentClosetEdge);
        removeBottomCardPreview();
        setDraggingCardHeight(source.data.cardHeight as string);
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
      getInitialData: () => {
        const cardHeight = getComputedStyle(card).height;
        return { cardId, boardId, type: "card", cardHeight };
      },
      onGenerateDragPreview: ({ nativeSetDragImage, source, location }) => {
        setCustomNativeDragPreview({
          getOffset: preserveOffsetOnSource({
            element: source.element,
            input: location.current.input,
          }),
          render({ container }) {
            const cardStyle = getComputedStyle(card);
            const preview = card.cloneNode(true) as HTMLLIElement;
            preview.style.width = cardStyle.width;
            preview.style.height = cardStyle.height;
            preview.style.transform = "rotate(4deg)";
            preview.style.fontSize = "14px";
            container.appendChild(preview);
          },
          nativeSetDragImage,
        });
      },
    });
  }, []);

  useEffect(() => {
    if (dataUrl) {
      const img = new Image();
      img.src = dataUrl;
      const caculatedHeight = img.height / (img.width / 256);
      setImageHeight({
        height: caculatedHeight,
        maxHeight: caculatedHeight,
      });
    }
  }, [dataUrl]);

  return (
    <>
      <CardWrapper ref={dropRef} hidden={cardHide}>
        {closetEdge === "top" && (
          <CardDropPreview style={{ height: draggingCardHeight }} />
        )}
        <Card ref={dragRef} style={isDragging ? { opacity: "0.4" } : {}}>
          {dataUrl && (
            <CardImage
              style={{
                backgroundImage: `url(${dataUrl})`,
                height: imageHeight.height,
              }}
            />
          )}
          <CardText>{cardText}</CardText>
        </Card>
        {closetEdge === "bottom" && (
          <CardDropPreview style={{ height: draggingCardHeight }} />
        )}
      </CardWrapper>
    </>
  );
}

export default memo(DraggableCard);
