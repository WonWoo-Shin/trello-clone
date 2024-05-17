import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { AnotherList, BoardsStyle } from "../style/style";
import { useRecoilState } from "recoil";
import { boardsState } from "../atom";
import Board from "./Board";

function Boards() {
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setBoards((currentBoards) => {
        const copyCards = [...currentBoards[source.droppableId]];
        const draggedCard = copyCards.splice(source.index, 1);
        copyCards.splice(destination.index, 0, ...draggedCard);
        return { ...currentBoards, [source.droppableId]: copyCards };
      });
    } else if (source.droppableId !== destination?.droppableId) {
      setBoards((currentBoards) => {
        const copySourceCards = [...currentBoards[source.droppableId]];
        const copyDestinationCards = [
          ...currentBoards[destination?.droppableId],
        ];
        const draggedCard = copySourceCards.splice(source.index, 1);
        copyDestinationCards.splice(destination.index, 0, ...draggedCard);
        return {
          ...currentBoards,
          [source.droppableId]: copySourceCards,
          [destination.droppableId]: copyDestinationCards,
        };
      });
    }
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
