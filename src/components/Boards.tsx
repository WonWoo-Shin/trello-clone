import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AnotherList, Board, BoardsStyle } from "../style/style";

function Boards() {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="canvas" direction="horizontal">
        {(provided) => (
          <BoardsStyle ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId="0" index={0}>
              {(provided) => (
                <Board
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                ></Board>
              )}
            </Draggable>
            <Draggable draggableId="1" index={1}>
              {(provided) => (
                <Board
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                ></Board>
              )}
            </Draggable>
            <Draggable draggableId="2" index={2}>
              {(provided) => (
                <Board
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                ></Board>
              )}
            </Draggable>
            {provided.placeholder}
            <AnotherList />
          </BoardsStyle>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Boards;
