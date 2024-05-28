import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  BoardBlock,
  BoardContainer,
  BoardInput,
  BoardTitle,
  Cards,
} from "../style/style";
import { memo, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import skipAnimation from "../functions/skipAnimation";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
  index: number;
}

function Board({ boardId, boardName, cards, index }: IBoardProps) {
  const [text, setText] = useState(boardName);
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow((curr) => !curr);
  const setBoards = useSetRecoilState(boardsState);
  const changeBoardName = () => {
    toggleShow();
    if (text === boardName) return;
    if (text === "") {
      setText(boardName);
      return;
    }
    setBoards((oldBoards) => {
      const newBoard = { ...oldBoards[boardId], boardName: text };
      return { ...oldBoards, [boardId]: newBoard };
    });
  };
  return (
    <Draggable draggableId={boardId + ""} index={index}>
      {(provided, snapshot) => (
        <BoardBlock
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={skipAnimation(provided.draggableProps.style, snapshot)}
        >
          <BoardContainer>
            <BoardTitle
              {...provided.dragHandleProps}
              onClick={toggleShow}
              $isShow={isShow}
            >
              {boardName}
            </BoardTitle>
            {isShow && (
              <BoardInput
                type="text"
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
                onBlur={changeBoardName}
                autoFocus
              />
            )}
            <Droppable droppableId={boardId + ""}>
              {(provided) => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {cards.map((card, index) => (
                    <DraggableCard key={card.cardId} {...card} index={index} />
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
