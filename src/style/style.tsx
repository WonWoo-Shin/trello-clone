import styled, { css } from "styled-components";

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

interface IBoardContainer {
  $isDragging: boolean;
  $isCardOver: boolean;
}

export const BoardContainer = styled.div<IBoardContainer>`
  width: 100%;
  padding: 8px;
  background-color: #f1f2f4;
  border-radius: 12px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  color: #172b4d;
  transform: translate(0, 0);
  opacity: ${(props) => props.$isDragging && 0.4};
  outline: ${(props) => props.$isCardOver && "2px solid #388bff"};
`;

export const BoardDropPreview = styled.div`
  width: 272px;
  height: 88px;
  margin: 0 6px;
  border-radius: 12px;
  background-color: #006aa7;
`;

export const BoardHandle = styled.div`
  padding: 8px;
  padding-bottom: 0;
  margin: -8px;
  margin-bottom: 0;
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

export const CardList = styled.ul`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:has(> *:not([hidden])) {
    margin-top: 8px;
    margin-bottom: 10px;
  }
`;

export const CardDropPreview = styled.div`
  height: 36px;
  background-color: #091e420f;
  border-radius: 8px;
`;

const CardDesign = styled.div`
  min-height: 36px;
  line-height: 36px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
`;

export const Card = styled(CardDesign)`
  transform: translate(0, 0);
  &:hover {
    outline: 2px solid #4391ff;
    outline-offset: -1px;
  }
`;

export const CardImage = styled.img`
  width: 256px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export const CardText = styled.span`
  padding-left: 12px;
`;

export const AddCardBtn = styled.div`
  width: 100%;
  height: 32px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.1s ease;
  svg {
    margin-right: 8px;
  }
  &:hover {
    background-color: #d0d5db;
    cursor: pointer;
  }
`;

export const FormInput = styled(CardDesign)`
  width: 100%;
  height: 36px;
  margin-top: -2px;
  padding-left: 12px;
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
  margin-top: 8px;
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
  height: 88px;
`;
