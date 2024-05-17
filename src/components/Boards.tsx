import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { AnotherList, BoardsStyle } from "../style/style";
import { useRecoilValue } from "recoil";
import { boardsState } from "../atom";
import Board from "./Board";

function Boards() {
  const boards = useRecoilValue(boardsState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="canvas" type="canvas" direction="horizontal">
        {(provided) => (
          <BoardsStyle ref={provided.innerRef} {...provided.droppableProps}>
            {Object.keys(boards).map((board, index) => (
              <Board
                key={board}
                boardId={board}
                cards={boards[board]}
                index={index}
              />
            ))}
            {provided.placeholder}
            <AnotherList />
          </BoardsStyle>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Boards;
