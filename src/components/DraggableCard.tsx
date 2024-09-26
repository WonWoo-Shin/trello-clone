import {
  Card,
  CardDropPreview,
  CardImage,
  CardText,
  CardWrapper,
  ImageAttachment,
  ImageText,
} from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import { ICard } from "../atom";
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
import Vibrant from "node-vibrant";
import { FastAverageColor } from "fast-average-color";

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

  const [imageHeight, setImageHeight] = useState(0);
  const [imageColor, setImageColor] = useState("");

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
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;
        const fac = new FastAverageColor();
        fac.getColorAsync(dataUrl).then((color) => setImageColor(color.rgba));
        if (imageWidth > 256) {
          const caculatedHeight = (imageHeight * 256) / imageWidth;
          setImageHeight(caculatedHeight);
        } else {
          setImageHeight(imageHeight);
        }
      };
    }
  }, [dataUrl]);

  return (
    <>
      <CardWrapper ref={dropRef} hidden={cardHide}>
        {closetEdge === "top" && (
          <CardDropPreview style={{ height: draggingCardHeight }} />
        )}
        <Card ref={dragRef} style={isDragging ? { opacity: "0.4" } : {}}>
          {dataUrl ? (
            <>
              <CardImage
                style={{
                  backgroundImage: `url(${dataUrl})`,
                  backgroundColor: imageColor,
                  height: imageHeight,
                }}
              />
              <ImageText>
                <span>{cardText}</span>
                <ImageAttachment>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.6426 17.9647C10.1123 19.46 7.62736 19.4606 6.10092 17.9691C4.57505 16.478 4.57769 14.0467 6.10253 12.5566L13.2505 5.57184C14.1476 4.6952 15.5861 4.69251 16.4832 5.56921C17.3763 6.44184 17.3778 7.85135 16.4869 8.72199L9.78361 15.2722C9.53288 15.5172 9.12807 15.5163 8.86954 15.2636C8.61073 15.0107 8.60963 14.6158 8.86954 14.3618L15.0989 8.27463C15.4812 7.90109 15.4812 7.29546 15.0989 6.92192C14.7167 6.54838 14.0969 6.54838 13.7146 6.92192L7.48523 13.0091C6.45911 14.0118 6.46356 15.618 7.48523 16.6163C8.50674 17.6145 10.1511 17.6186 11.1679 16.6249L17.8712 10.0747C19.5274 8.45632 19.5244 5.83555 17.8676 4.2165C16.2047 2.59156 13.5266 2.59657 11.8662 4.21913L4.71822 11.2039C2.42951 13.4404 2.42555 17.083 4.71661 19.3218C7.00774 21.5606 10.7323 21.5597 13.0269 19.3174L19.7133 12.7837C20.0956 12.4101 20.0956 11.8045 19.7133 11.431C19.331 11.0574 18.7113 11.0574 18.329 11.431L11.6426 17.9647Z" />
                  </svg>
                  <span>1</span>
                </ImageAttachment>
              </ImageText>
            </>
          ) : (
            <CardText>{cardText}</CardText>
          )}
        </Card>
        {closetEdge === "bottom" && (
          <CardDropPreview style={{ height: draggingCardHeight }} />
        )}
      </CardWrapper>
    </>
  );
}

export default memo(DraggableCard);
