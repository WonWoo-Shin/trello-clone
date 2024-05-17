import { Draggable } from "react-beautiful-dnd";
import { Card } from "../style/style";
import { memo } from "react";

interface ICardProps {
  card: string;
  index: number;
}

function DraggableCard({ card, index }: ICardProps) {
  return (
    <Draggable draggableId={card} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
