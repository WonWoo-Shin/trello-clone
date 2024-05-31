import { Card } from "../style/style";
import { memo } from "react";
import { ICard } from "../atom";
import skipAnimation from "../functions/skipAnimation";
import { useDrag } from "react-dnd";

interface ICardProps extends ICard {
  index: number;
}

function DraggableCard({ cardId, cardText, index }: ICardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <Card ref={drag}>{cardText}</Card>;
}

export default memo(DraggableCard);
