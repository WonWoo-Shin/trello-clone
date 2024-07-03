import {
  AddCardBtn,
  BoardBlock,
  BoardContainer,
  BoardDropPreview,
  CardDropPreview,
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
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [boardHide, setBoardHide] = useState(false);
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
      onDragEnter: () => setShowPreview(true),
      onDragLeave: ({ source: { data } }) => {
        if (data.boardId === boardId) {
          setBoardHide(true);
        }
      },
      onDrop: () => {
        setShowPreview(false);
      },
      getData: () => ({ boardId, type: "board" }),
      getIsSticky: () => true,
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
      onDrop: () => {
        setIsDragging(false);
        setBoardHide(false);
      },
      getInitialData: () => ({ boardId, type: "board" }),
    });
  }, [boardId]);
  return (
    <>
      <BoardBlock ref={dropRef} hidden={boardHide}>
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
      {showPreview && <BoardDropPreview />}
    </>
  );
}

export default memo(Board);
