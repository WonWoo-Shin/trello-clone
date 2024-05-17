import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardBlock, BoardContainer, BoardTitle, Cards } from "../style/style";
import { memo } from "react";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  boardId: string;
  cards: string[];
  index: number;
}

function Board({ boardId, cards, index }: IBoardProps) {
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <BoardBlock ref={provided.innerRef} {...provided.draggableProps}>
          <BoardContainer>
            <BoardTitle {...provided.dragHandleProps}>{boardId}</BoardTitle>
            <Droppable droppableId={boardId} direction="vertical">
              {(provided) => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {cards.map((card, index) => (
                    <DraggableCard key={card} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </Cards>
              )}
            </Droppable>
          </BoardContainer>
        </BoardBlock>
      )}
    </Draggable>
  );
}

export default memo(Board);
