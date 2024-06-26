import styled from "styled-components";

export const Surface = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.headerColor};
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
`;

export const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const BoardHeader = styled.div`
  height: 55px;
  background-color: ${(props) => props.theme.boardHeaderColor};
`;

export const BoardCanvas = styled.div`
  background-color: ${(props) => props.theme.boardCanvasColor};
  flex-grow: 1;
  font-size: 14px;
`;

export const BoardsList = styled.ul`
  display: flex;
  height: 100%;
  padding: 12px 6px;
`;

export const BoardBlock = styled.li`
  width: 284px;
  padding: 0 6px;
`;

export const BoardTraceBlock = styled.div`
  width: 284px;
  padding: 0 6px;
`;

export const BoardContainer = styled.div`
  width: 100%;
  min-height: 88px;
  padding: 8px;
  background-color: #f1f2f4;
  border-radius: 12px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  color: #172b4d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translate(0, 0);
`;

export const BoardTrace = styled.div`
  width: 100%;
  min-height: 88px;
  border-radius: 12px;
  background-color: #006aa7;
`;

export const BoardHandle = styled.div`
  padding: 8px;
  padding-bottom: 0;
  margin: -8px;
  margin-bottom: 4px;
  cursor: pointer;
`;

const BoardTitleDesign = styled.div`
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
`;

export const BoardTitle = styled(BoardTitleDesign)`
  font-weight: 600;
`;

export const BoardInput = styled(BoardTitleDesign)`
  width: 100%;
  border-radius: 8px;
  border: none;
  outline: 1px solid #8590a2;
  outline-offset: -1px;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  &:focus {
    outline: 2px solid #388bff;
    outline-offset: -2px;
  }
  &::placeholder {
    color: #516079;
    font-weight: 600;
  }
`;

export const CardDrop = styled.li`
  height: 44px;
  padding: 4px 0;
`;

const CardDesign = styled.div`
  height: 36px;
  line-height: 36px;
  background-color: #ffffff;
  border-radius: 8px;
  padding-left: 12px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
`;

interface CardProps {
  $isDragging: boolean;
  $isBoardOver: boolean;
}

export const Card = styled(CardDesign)<CardProps>`
  transform: translate(0, 0);
  opacity: ${(props) => (props.$isDragging ? 0.4 : 1)};
  &:hover {
    outline: ${(props) => (props.$isBoardOver ? "none" : "2px solid #4391ff")};
    outline-offset: -1px;
  }
`;

export const AddCardBtn = styled.div<{ $isBoardOver: boolean }>`
  width: 100%;
  height: 32px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-top: 4px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.1s ease;
  svg {
    margin-right: 8px;
  }
  &:hover {
    background-color: ${(props) => (props.$isBoardOver ? "none" : "#d0d5db")};
    cursor: pointer;
  }
`;

export const FormInput = styled(CardDesign)`
  width: 100%;
  margin: 4px 0 8px 0;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;

export const SubmitArea = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SubmitButton = styled.button`
  font-weight: 600;
  height: 100%;
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  background-color: #0c66e4;
  cursor: pointer;
`;

export const Xmark = styled.div`
  width: 32px;
  height: 100%;
  padding: 6px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: #d0d5db;
    cursor: pointer;
  }
`;

export const AnotherList = styled.div`
  flex-grow: 1;
  padding: 0 6px;
`;

export const AddBoardBtn = styled.div`
  width: 272px;
  height: 44px;
  border-radius: 12px;
  padding: 12px;
  color: #ffffff;
  font-weight: 600;
  background-color: #ffffff3d;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
  svg {
    margin-right: 8px;
  }
  &:hover {
    background-color: #1b85c5;
  }
`;

export const AddBoardForm = styled(BoardContainer)`
  width: 272px;
  height: 80px;
`;
