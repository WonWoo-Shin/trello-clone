import {
  AddCardBtn,
  BoardContainer,
  BoardTitle,
  Card,
  CardDrop,
} from "../style/style";
import { ICard } from "../atom";
import { AddBtn } from "./Submit";
import { XYCoord, useDragLayer } from "react-dnd";
import { CSSProperties, memo } from "react";

interface IItem {
  boardId: number;
  boardName: string;
  cards: ICard[];
  cardText: ICard["cardText"];
  index: number;
}

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  opacity: "0.6",
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px) rotate(4deg)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

function BoardPreview() {
  const { item, itemType, initialCursorOffset, currentOffset, isDragging } =
    useDragLayer((monitor) => ({
      item: monitor.getItem<IItem>(),
      itemType: monitor.getItemType(),
      initialCursorOffset: monitor.getInitialClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  if (!isDragging) {
    return;
  }
  switch (itemType) {
    case "board":
      return (
        <div style={layerStyles}>
          <BoardContainer
            style={{
              ...getItemStyles(initialCursorOffset, currentOffset),
              width: "272px",
            }}
          >
            <BoardTitle>{item.boardName}</BoardTitle>
            <ul>
              {item.cards.map((card, index) => (
                <CardDrop key={index}>
                  <Card>{card.cardText}</Card>
                </CardDrop>
              ))}
            </ul>
            <AddCardBtn>
              <AddBtn addWhat={"a card"} />
            </AddCardBtn>
          </BoardContainer>
        </div>
      );
    case "card":
      return (
        <div style={layerStyles}>
          <Card
            style={{
              ...getItemStyles(initialCursorOffset, currentOffset),
              width: "256px",
              height: "36px",
            }}
          >
            {item.cardText}
          </Card>
        </div>
      );
    default:
      return null;
  }
}

export default memo(BoardPreview);
