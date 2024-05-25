import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardBlock, BoardContainer, BoardTitle, Cards } from "../style/style";
import { memo, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardOrderState, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
  boardId: string;
  cards: ICard[];
  index: number;
}

function Board({ boardId, cards, index }: IBoardProps) {
  const [text, setText] = useState(boardId);
  const setBoards = useSetRecoilState(boardsState);
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const changeBoardName = () => {
    if (boardId === text) return;
    setBoardOrder((oldOrder) => {
      const targetIndex = oldOrder.indexOf(boardId);
      const newOrder = [...oldOrder];
      newOrder.splice(targetIndex, 1, text);
      return newOrder;
    });
    setBoards((oldBoards) => {
      const newBoards = { ...oldBoards };
      newBoards[text] = newBoards[boardId];
      delete newBoards[boardId];
      return newBoards;
    });
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <BoardBlock ref={provided.innerRef} {...provided.draggableProps}>
          <BoardContainer>
            <BoardTitle {...provided.dragHandleProps}>{boardId}</BoardTitle>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
              onBlur={changeBoardName}
            />
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
