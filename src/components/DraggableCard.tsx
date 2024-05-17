import { Draggable } from "react-beautiful-dnd";
import { Card } from "../style/style";
import { memo } from "react";
import { ICard } from "../atom";

interface ICardProps {
  card: ICard;
  index: number;
}

function DraggableCard({ card, index }: ICardProps) {
  return (
    <Draggable draggableId={card.id + ""} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.text}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
