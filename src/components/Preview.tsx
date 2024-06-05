import { AddCardBtn, BoardContainer, BoardTitle, Card } from "../style/style";
import { ICard } from "../atom";
import { AddBtn } from "./Submit";
import { XYCoord, useDragLayer } from "react-dnd";
import { CSSProperties, memo } from "react";

interface IItem {
  boardId: number;
  boardName: string;
  cards: ICard[];
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
              opacity: "0.6",
            }}
          >
            <BoardTitle>{item.boardName}</BoardTitle>
            <ul>
              {item.cards.map((card, index) => (
                <Card key={index}>{card.cardText}</Card>
              ))}
            </ul>
            <AddCardBtn>
              <AddBtn addWhat={"a card"} />
            </AddCardBtn>
          </BoardContainer>
        </div>
      );
    default:
      return null;
  }
}

export default memo(BoardPreview);
