import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardBlock, BoardContainer, BoardTitle, Cards } from "../style/style";
import { memo } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, TDefaultBoard } from "../atom";
import AddCard from "./AddCard";

interface IBoardProps {
  boardId: TDefaultBoard;
  cards: ICard[];
  index: number;
}

function Board({ boardId, cards, index }: IBoardProps) {
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <BoardBlock ref={provided.innerRef} {...provided.draggableProps}>
          <BoardContainer>
            <BoardTitle {...provided.dragHandleProps}>{boardId}</BoardTitle>
            <Droppable droppableId={boardId}>
              {(provided) => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {cards.map((card, index) => (
                    <DraggableCard key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </Cards>
              )}
            </Droppable>
            <AddCard boardId={boardId} />
          </BoardContainer>
        </BoardBlock>
      )}
    </Draggable>
  );
}

export default memo(Board);
