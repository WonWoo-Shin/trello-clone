import {
  Card,
  CardCheckBox,
  CardDropPreview,
  CardEditArea,
  CardEditButton,
  CardText,
  CardTextArea,
  CardWrapper,
  EditButtonArea,
  EditCardInput,
} from "../style/style";
import React, { useEffect, useRef, useState } from "react";
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
import { useBoardStore } from "../store/useBoardStore";
import { BoardId, ICard } from "../type";

interface IProps extends ICard {
  boardId: BoardId;
  removeBottomCardPreview: () => void;
}

export const DraggableCard = React.memo(
  ({
    cardId,
    cardText,
    cardCheck,
    boardId,
    removeBottomCardPreview,
  }: IProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [closetEdge, setClosetEdge] = useState<Edge | null>(null);
    const [cardHide, setCardHide] = useState(false);
    const [draggingCardHeight, setDraggingCardHeight] = useState("100%");

    const [isHover, setIsHover] = useState(false);

    const dropRef = useRef<HTMLLIElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);

    const editCardName = useBoardStore((state) => state.editCardName);
    const deleteCard = useBoardStore((state) => state.deleteCard);
    const cardCheckToggle = useBoardStore((state) => state.cardCheckToggle);

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

    const [cardEditing, setCardEditing] = useState(false);

    const toggleEditCard = () => {
      setCardEditing((prev) => !prev);
    };

    const [text, setText] = useState(cardText);

    //카드 text 수정
    const editCardNameSubmit = () => {
      toggleEditCard();
      if (text === "") {
        setText(cardText);
        return;
      }

      editCardName(boardId, cardId, text);
    };

    return (
      <>
        <CardWrapper ref={dropRef} hidden={cardHide}>
          {closetEdge === "top" && (
            <CardDropPreview style={{ height: draggingCardHeight }} />
          )}
          <Card
            ref={dragRef}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            style={isDragging ? { opacity: "0.4" } : {}}
          >
            <CardTextArea>
              {(isHover || cardCheck) && (
                <CardCheckBox
                  type="checkbox"
                  checked={cardCheck}
                  onChange={() => cardCheckToggle(boardId, cardId, cardCheck)}
                />
              )}
              <CardText>{cardText}</CardText>
            </CardTextArea>
            {isHover && (
              <CardEditArea>
                <EditButtonArea>
                  <CardEditButton onClick={toggleEditCard}>
                    <svg fill="none" viewBox="0 0 16 16" role="presentation">
                      <path
                        fill="currentcolor"
                        fillRule="evenodd"
                        d="M11.586.854a2 2 0 0 1 2.828 0l.732.732a2 2 0 0 1 0 2.828L10.01 9.551a2 2 0 0 1-.864.51l-3.189.91a.75.75 0 0 1-.927-.927l.91-3.189a2 2 0 0 1 .51-.864zm1.768 1.06a.5.5 0 0 0-.708 0l-.585.586L13.5 3.94l.586-.586a.5.5 0 0 0 0-.708zM12.439 5 11 3.56 7.51 7.052a.5.5 0 0 0-.128.216l-.54 1.891 1.89-.54a.5.5 0 0 0 .217-.127zM3 2.501a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V10H15v3.001a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h3v1.5z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </CardEditButton>
                  <CardEditButton onClick={() => deleteCard(boardId, cardId)}>
                    <svg fill="none" viewBox="0 0 16 16" role="presentation">
                      <path
                        fill="currentcolor"
                        fillRule="evenodd"
                        d="M1 1h14v5h-1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1zm2.5 5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V6zm10-1.5h-11v-2h11zm-3 4.5h-5V7.5h5z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </CardEditButton>
                </EditButtonArea>
              </CardEditArea>
            )}
          </Card>
          {closetEdge === "bottom" && (
            <CardDropPreview style={{ height: draggingCardHeight }} />
          )}
          {cardEditing && (
            <EditCardInput
              as="input"
              placeholder="Enter a title for this card..."
              value={text}
              autoFocus
              onChange={(event) => setText(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  editCardNameSubmit();
                }
              }}
              onBlur={editCardNameSubmit}
            />
          )}
        </CardWrapper>
      </>
    );
  },
);
