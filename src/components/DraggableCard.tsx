import { Draggable } from "react-beautiful-dnd";
import { Card } from "../style/style";
import { memo } from "react";
import { ICard } from "../atom";
import skipAnimation from "../functions/skipAnimation";

interface ICardProps extends ICard {
  index: number;
}

function DraggableCard({ cardId, cardText, index }: ICardProps) {
  return (
    <Draggable draggableId={cardId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={skipAnimation(provided.draggableProps.style, snapshot)}
        >
          {cardText}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
