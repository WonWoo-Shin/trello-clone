import {
  Card,
  CardCheckBox,
  CardDropPreview,
  CardEditArea,
  CardEditButton,
  CardImage,
  CardText,
  CardTextArea,
  CardWrapper,
  EditButtonArea,
  EditCardForm,
  EditCardInput,
  ImageAttachment,
  ImageText,
} from "../style/style";
import React, { useEffect, useRef, useState } from "react";
import { boardsState, ICard } from "../atom";
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
import { FastAverageColor } from "fast-average-color";
import { useSetRecoilState } from "recoil";

interface ICardProps extends ICard {
  boardId: number;
  removeBottomCardPreview: () => void;
}

export const DraggableCard = React.memo(
  ({
    cardId,
    cardText,
    cardCheck,
    boardId,
    removeBottomCardPreview,
    dataUrl,
  }: ICardProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [closetEdge, setClosetEdge] = useState<Edge | null>(null);
    const [cardHide, setCardHide] = useState(false);
    const [draggingCardHeight, setDraggingCardHeight] = useState("100%");

    const [imageHeight, setImageHeight] = useState(0);
    const [imageColor, setImageColor] = useState("");

    const [isHover, setIsHover] = useState(false);

    const dropRef = useRef<HTMLLIElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);

    const setBoards = useSetRecoilState(boardsState);

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

    //이미지 카드 배경색상 지정
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

    const [cardEditing, setCardEditing] = useState(false);

    const toggleEditCard = () => {
      setCardEditing((prev) => !prev);
    };

    const [text, setText] = useState(cardText);

    //카드 text 수정
    const editCard = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (text === "") {
        toggleEditCard();
        return;
      }
      setBoards((currBoards) => {
        const newCards = currBoards[boardId].cards.map((card) =>
          card.cardId === cardId ? { ...card, cardText: text } : card,
        );
        const newBoard = { ...currBoards[boardId], cards: newCards };
        return { ...currBoards, [boardId]: newBoard };
      });
      toggleEditCard();
    };

    //카드 삭제
    const deleteCard = () => {
      setBoards((currBoards) => {
        const newCards = currBoards[boardId].cards.filter(
          (card) => card.cardId !== cardId,
        );
        const newBoard = { ...currBoards[boardId], cards: newCards };
        return { ...currBoards, [boardId]: newBoard };
      });
    };

    //카드 체크박스 toggle
    const cardCheckChange = () => {
      setBoards((currBoards) => {
        const newCards = currBoards[boardId].cards.map((card) =>
          card.cardId === cardId ? { ...card, cardCheck: !cardCheck } : card,
        );
        const newBoard = { ...currBoards[boardId], cards: newCards };
        return { ...currBoards, [boardId]: newBoard };
      });
    };

    return (
      <>
        <CardWrapper ref={dropRef} hidden={cardHide}>
          {closetEdge === "top" && (
            <CardDropPreview style={{ height: draggingCardHeight }} />
          )}
          <Card
            ref={dragRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={isDragging ? { opacity: "0.4" } : {}}
          >
            <CardTextArea>
              {(isHover || cardCheck) && (
                <CardCheckBox
                  type="checkbox"
                  checked={cardCheck}
                  onChange={cardCheckChange}
                />
              )}
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
                  <CardEditButton onClick={deleteCard}>
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
            <EditCardForm onSubmit={editCard}>
              <EditCardInput
                as="input"
                placeholder="Enter a title for this card..."
                value={text}
                autoFocus
                onChange={(event) => setText(event.currentTarget.value)}
              />
            </EditCardForm>
          )}
        </CardWrapper>
      </>
    );
  },
);
