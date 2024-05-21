import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { AnotherList, BoardsStyle } from "../style/style";
import { useRecoilState } from "recoil";
import { TDefaultBoard, boardOrderState, boardsState } from "../atom";
import Board from "./Board";

function Boards() {
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) return;
    // 보드 이동
    if (type === "canvas") {
      setBoardOrder((currOrder) => {
        const newOrder = [...currOrder];
        const draggedItem = newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, ...draggedItem);
        return newOrder;
      });
      return;
    }
    // 같은 보드 내 카드 이동
    if (source.droppableId === destination?.droppableId) {
      setBoards((currentBoards) => {
        const copyCards = [
          ...currentBoards[source.droppableId as TDefaultBoard],
        ];
        const draggedCard = copyCards.splice(source.index, 1);
        copyCards.splice(destination.index, 0, ...draggedCard);
        return { ...currentBoards, [source.droppableId]: copyCards };
      });
    }
    // 다른 보드로 카드 이동
    else if (source.droppableId !== destination?.droppableId) {
      setBoards((currentBoards) => {
        const copySourceCards = [
          ...currentBoards[source.droppableId as TDefaultBoard],
        ];
        const copyDestinationCards = [
          ...currentBoards[destination?.droppableId as TDefaultBoard],
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
            {boardOrder.map((board, index) => (
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
