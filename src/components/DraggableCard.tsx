import { Card } from "../style/style";
import { memo } from "react";
import { ICard } from "../atom";
import skipAnimation from "../functions/skipAnimation";

interface ICardProps extends ICard {
  index: number;
}

function DraggableCard({ cardId, cardText, index }: ICardProps) {
  return <Card>{cardText}</Card>;
}

export default memo(DraggableCard);
