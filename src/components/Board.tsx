import { AddCardBtn, BoardBlock, BoardContainer } from "../style/style";
import { memo, useState } from "react";
import DraggableCard from "./DraggableCard";
import { ICard, boardOrderState, boardsState } from "../atom";
import AddCard from "./AddCard";
import { useSetRecoilState } from "recoil";
import BoardTitleArea from "./BoardTitleArea";
import { AddBtn } from "./Submit";

interface IBoardProps {
  boardId: number;
  boardName: string;
  cards: ICard[];
  index: number;
}

function Board({ boardId, boardName, cards, index }: IBoardProps) {
  const setBoards = useSetRecoilState(boardsState);
  const setBoardOrder = useSetRecoilState(boardOrderState);
  const [isAddOpen, setIsAddOpen] = useState(false);
  return (
    <BoardBlock>
      <BoardContainer>
        <BoardTitleArea boardId={boardId} boardName={boardName} />
        <ul>
          {cards.map((card, index) => (
            <DraggableCard
              key={card.cardId}
              {...card}
              index={index}
              boardId={boardId}
            />
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
