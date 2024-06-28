import {
  AddCardBtn,
  BoardBlock,
  BoardContainer,
  BoardTrace,
} from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import BoardTitleArea from "./BoardTitleArea";
import { AddBtn } from "./Submit";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
}

function Board({ boardId, boardName, cards }: IBoardProps) {
  const setBoards = useSetRecoilState(boardsState);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  //drop
  useEffect(() => {
    const boardBlock = dropRef.current;
    invariant(boardBlock);
    return dropTargetForElements({
      element: boardBlock,
      onDragEnter: () => setIsDraggingOver(true),
      onDragLeave: () => setIsDraggingOver(false),
      onDrop: ({ location, self }) => {
        setIsDraggingOver(false);
        if (location.current.dropTargets[0].element === self.element) {
          return;
        }
      },
      getData: () => ({ boardId, type: "board" }),
    });
  }, [boardId]);
  //drag
  useEffect(() => {
    const board = dragRef.current;
    const boardHandle = dragHandleRef.current;
    invariant(board);
    invariant(boardHandle);
    return draggable({
      element: board,
      dragHandle: boardHandle,
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
      getInitialData: () => ({ boardId, type: "board" }),
    });
  }, [boardId]);
  return (
    <BoardBlock
      ref={dropRef}
      style={isDraggingOver ? { backgroundColor: "#006aa7" } : {}}
    >
      <BoardContainer
        ref={dragRef}
        style={isDragging ? { opacity: "0.4" } : {}}
      >
        <BoardTitleArea
          boardId={boardId}
          boardName={boardName}
          boardHandle={dragHandleRef}
        />
        <ul>
          {cards.map((card) => (
            <DraggableCard key={card.cardId} {...card} boardId={boardId} />
          ))}
        </ul>
        {isAddOpen ? (
          <AddCard boardId={boardId} setIsAddOpen={setIsAddOpen} />
        ) : (
          <AddCardBtn onClick={() => setIsAddOpen(true)}>
            <AddBtn addWhat={"a card"} />
          </AddCardBtn>
        )}
      </BoardContainer>
    </BoardBlock>
  );
}

export default memo(Board);
