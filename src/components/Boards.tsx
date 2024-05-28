import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { AnotherList, BoardsStyle } from "../style/style";
import { useRecoilState } from "recoil";
import { boardOrderState, boardsState } from "../atom";
import Board from "./Board";
import AddBoard from "./AddBoard";

function Boards() {
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderState);
  const [boards, setBoards] = useRecoilState(boardsState);
  const dragItem = ({ source, destination, type }: DropResult) => {
    if (!destination) return;
    // 보드 이동
    if (type === "canvas") {
      setBoardOrder((oldOrder) => {
        const newOrder = [...oldOrder];
        const draggedItem = newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, ...draggedItem);
        return newOrder;
      });
      return;
    }
    // 같은 보드 내 카드 이동
    if (source.droppableId === destination?.droppableId) {
      setBoards((oldBoards) => {
        const copyCards = [...oldBoards[+source.droppableId].cards];
        const draggedCard = copyCards.splice(source.index, 1);
        copyCards.splice(destination.index, 0, ...draggedCard);
        const newBoard = {
          ...oldBoards[+source.droppableId],
          cards: copyCards,
        };
        return { ...oldBoards, [+source.droppableId]: newBoard };
      });
    }
    // 다른 보드로 카드 이동
    else if (source.droppableId !== destination?.droppableId) {
      setBoards((oldBoards) => {
        const copySourceCards = [...oldBoards[+source.droppableId].cards];
        const copyDestinationCards = [
          ...oldBoards[+destination?.droppableId].cards,
        ];
        const draggedCard = copySourceCards.splice(source.index, 1);
        copyDestinationCards.splice(destination.index, 0, ...draggedCard);
        const sourceBoard = {
          ...oldBoards[+source.droppableId],
          cards: copySourceCards,
        };
        const destinationBoard = {
          ...oldBoards[+destination.droppableId],
          cards: copyDestinationCards,
        };
        return {
          ...oldBoards,
          [+source.droppableId]: sourceBoard,
          [+destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={dragItem}>
      <Droppable droppableId="canvas" type="canvas" direction="horizontal">
        {(provided) => (
          <BoardsStyle ref={provided.innerRef} {...provided.droppableProps}>
            {boardOrder.map((boardId, index) => (
              <Board
                key={boardId}
                boardId={boardId}
                {...boards[boardId]}
                index={index}
              />
            ))}
            {provided.placeholder}
            <AnotherList>
              <AddBoard />
            </AnotherList>
          </BoardsStyle>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Boards;
