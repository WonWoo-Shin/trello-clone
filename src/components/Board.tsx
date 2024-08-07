import {
  AddCardBtn,
  BoardBlock,
  BoardContainer,
  BoardDropPreview,
  CardBuffer,
  CardDropPreview,
  CardList,
} from "../style/style";
import { memo, useEffect, useRef, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard } from "../atom";
import AddCard from "./AddCard";
import BoardTitleArea from "./BoardTitleArea";
import { AddBtn } from "./Submit";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import invariant from "tiny-invariant";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
}

function Board({ boardId, boardName, cards }: IBoardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [closetEdge, setClosetEdge] = useState<Edge | null>(null);
  const [boardHide, setBoardHide] = useState(false);
  const [isCardOver, setIsCardOver] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const cardListRef = useRef<HTMLUListElement>(null);
  const [draggingBoardHeight, setDraggingBoardHeight] = useState("212px");

  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const removeBottomCardPreview = () => {
    setIsCardOver(false);
  };

  //drop
  useEffect(() => {
    const boardBlock = dropRef.current;
    invariant(boardBlock);
    return dropTargetForElements({
      element: boardBlock,
      onDrag: ({ source, self }) => {
        if (source.data.boardId !== boardId && source.data.type === "board") {
          const currentClosetEdge = extractClosestEdge(self.data);
          setClosetEdge(currentClosetEdge);
        }
      },
      onDragEnter: ({ source, self }) => {
        if (source.data.type === "board") {
          const currentClosetEdge = extractClosestEdge(self.data);
          setClosetEdge(currentClosetEdge);
        } else if (source.data.type === "card") {
          setIsCardOver(true);
        }
        setDraggingBoardHeight(source.data.boardHeight as string);
      },
      onDragLeave: ({ source }) => {
        if (source.data.type === "board") {
          if (source.data.boardId === boardId) {
            setBoardHide(true);
          }
          setClosetEdge(null);
        } else if (source.data.type === "card") {
          setIsCardOver(false);
        }
      },
      onDrop: ({ source }) => {
        if (source.data.type === "board") {
          setClosetEdge(null);
        } else if (source.data.type === "card") {
          setIsCardOver(false);
        }
      },
      getData: ({ input, element }) => {
        const data = {
          boardId,
          type: "board",
        };
        return attachClosestEdge(data, {
          element,
          input,
          allowedEdges: ["left", "right"],
        });
      },
      getIsSticky: () => true,
    });
  }, []);

  //drag
  useEffect(() => {
    const board = dragRef.current;
    const boardHandle = dragHandleRef.current;
    invariant(board);
    invariant(boardHandle);
    return draggable({
      element: board,
      dragHandle: boardHandle,
      onDragStart: () => {
        setIsDragging(true);
      },
      onDrop: () => {
        setIsDragging(false);
        setBoardHide(false);
      },
      getInitialData: () => {
        const boardHeight = getComputedStyle(board).height;
        return { boardId, type: "board", boardHeight };
      },
    });
  }, []);

  return (
    <>
      {closetEdge === "left" && (
        <BoardDropPreview style={{ height: draggingBoardHeight }} />
      )}
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
          <CardList ref={cardListRef}>
            {cards.map((card) => (
              <DraggableCard
                key={card.cardId}
                {...card}
                boardId={boardId}
                removeBottomCardPreview={removeBottomCardPreview}
              />
            ))}
            {isCardOver && <CardDropPreview />}
          </CardList>
          {isAddOpen ? (
            <AddCard boardId={boardId} setIsAddOpen={setIsAddOpen} />
          ) : (
            <AddCardBtn onClick={() => setIsAddOpen(true)}>
              <AddBtn addWhat={"a card"} />
            </AddCardBtn>
          )}
        </BoardContainer>
      </BoardBlock>
      {closetEdge === "right" && (
        <BoardDropPreview style={{ height: draggingBoardHeight }} />
      )}
    </>
  );
}

export default memo(Board);
