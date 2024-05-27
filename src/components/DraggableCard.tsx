import { Draggable } from "react-beautiful-dnd";
import { Card } from "../style/style";
import { memo } from "react";
import { ICard } from "../atom";

interface ICardProps extends ICard {
  index: number;
}

function DraggableCard({ cardId, cardText, index }: ICardProps) {
  return (
    <Draggable draggableId={cardId + ""} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {cardText}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
