import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { dropTargetForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter";
import { containsFiles } from "@atlaskit/pragmatic-drag-and-drop/external/file";

import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";

import { ICard } from "../atom";

import DraggableCard from "./DraggableCard";
import AddCard from "./AddCard";
import BoardTitleArea from "./BoardTitleArea";
import { AddBtn } from "./Submit";

import {
  AddCardBtn,
  BoardBlock,
  BoardContainer,
  BoardDropPreview,
  CardDropPreview,
  CardList,
} from "../style/style";

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
  const [showCardDropPreview, setShowCardDropPreview] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [draggingBoardHeight, setDraggingBoardHeight] = useState("0");
  const [draggingCardHeight, setDraggingCardHeight] = useState("0");

  const boardBlockRef = useRef(null);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const removeBottomCardPreview = () => {
    setShowCardDropPreview(false);
  };

  //drop
  useEffect(() => {
    const boardBlock = boardBlockRef.current;
    invariant(boardBlock);
    return dropTargetForElements({
      element: boardBlock,
      onDrag: ({ source, self }) => {
        if (source.data.boardId !== boardId && source.data.type === "board") {
          const currentClosetEdge = extractClosestEdge(self.data);
          setClosetEdge(currentClosetEdge);
        } else if (source.data.type === "card") {
          setIsCardOver(true);
        }
      },
      onDragEnter: ({ source, self }) => {
        if (source.data.type === "board") {
          const currentClosetEdge = extractClosestEdge(self.data);
          setClosetEdge(currentClosetEdge);
          setDraggingBoardHeight(source.data.boardHeight as string);
        } else if (source.data.type === "card") {
          setShowCardDropPreview(true);
          setDraggingCardHeight(source.data.cardHeight as string);
        }
      },
      onDragLeave: ({ source }) => {
        if (source.data.type === "board") {
          if (source.data.boardId === boardId) {
            setBoardHide(true);
          }
          setClosetEdge(null);
        } else if (source.data.type === "card") {
          setIsCardOver(false);
          setShowCardDropPreview(false);
        }
      },
      onDrop: ({ source }) => {
        if (source.data.type === "board") {
          setClosetEdge(null);
        } else if (source.data.type === "card") {
          setIsCardOver(false);
          setShowCardDropPreview(false);
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
    const board = boardContainerRef.current;
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
      onGenerateDragPreview: ({ nativeSetDragImage, source, location }) => {
        setCustomNativeDragPreview({
          getOffset: preserveOffsetOnSource({
            element: source.element,
            input: location.current.input,
          }),
          render({ container }) {
            const boardStyle = getComputedStyle(board);
            const preview = board.cloneNode(true) as HTMLDivElement;
            preview.style.width = boardStyle.width;
            preview.style.height = boardStyle.height;
            preview.style.transform = "rotate(4deg)";
            preview.style.fontSize = "14px";
            container.appendChild(preview);
          },
          nativeSetDragImage,
        });
      },
    });
  }, []);

  //drop file
  useEffect(() => {
    const boardFile = boardContainerRef.current;
    invariant(boardFile);
    return dropTargetForExternal({
      element: boardFile,
      canDrop: containsFiles,
      onDragEnter: () => {
        console.log("file");
      },
      getData: () => ({
        boardId,
      }),
    });
  }, []);

  return (
    <>
      {closetEdge === "left" && (
        <BoardDropPreview style={{ height: draggingBoardHeight }} />
      )}
      <BoardBlock ref={boardBlockRef} hidden={boardHide}>
        <BoardContainer
          ref={boardContainerRef}
          $isDragging={isDragging}
          $isCardOver={isCardOver}
        >
          <BoardTitleArea
            boardId={boardId}
            boardName={boardName}
            boardHandle={dragHandleRef}
          />
          <CardList>
            {cards.map((card) => (
              <DraggableCard
                key={card.cardId}
                {...card}
                boardId={boardId}
                removeBottomCardPreview={removeBottomCardPreview}
              />
            ))}
            {showCardDropPreview && (
              <CardDropPreview style={{ height: draggingCardHeight }} />
            )}
            {isAddOpen && (
              <AddCard boardId={boardId} setIsAddOpen={setIsAddOpen} />
            )}
          </CardList>
          {!isAddOpen && (
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
