import { usePreview } from "react-dnd-preview";
import { AddCardBtn, BoardContainer, BoardTitle, Card } from "../style/style";
import DraggableCard from "./DraggableCard";
import { ICard } from "../atom";
import { AddBtn } from "./Submit";

interface IItem {
  boardId: number;
  boardName: string;
  cards: ICard[];
  index: number;
}

function BoardPreview() {
  const preview = usePreview();
  if (!preview.display) {
    return null;
  }
  const { style } = preview;
  const item = preview.item as IItem;
  return (
    <BoardContainer style={{ ...style, width: "272px", opacity: "0.4" }}>
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
  );
}

export default BoardPreview;
