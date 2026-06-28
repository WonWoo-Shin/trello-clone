import styled from "styled-components";

export const Surface = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 10px;
  background-color: ${(props) => props.theme.headerColor};
  border-bottom: 1px solid ${(props) => props.theme.lineColor};
`;

export const LinkButton = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 40px;
  padding: 0 12px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  font-family: BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  transition: border-color 0.2s;
  svg {
    width: 24px;
    height: 24px;
  }
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
  overflow-x: auto;
`;

export const BoardsList = styled.ul`
  display: flex;
  height: 100%;
  padding: 12px 6px;
`;

export const BoardBlock = styled.li`
  width: 284px;
  padding: 0 6px;
  flex-shrink: 0;
`;

export const BoardDesign = styled.div`
  width: 100%;
  padding: 8px;
  background-color: #f1f2f4;
  border-radius: 12px;
  box-shadow:
    0px 1px 1px #091e4240,
    0px 0px 1px #091e424f;
  color: #44546f;
`;

interface IBoardContainer {
  $isDragging: boolean;
  $isCardOver: boolean;
}

export const BoardContainer = styled(BoardDesign)<IBoardContainer>`
  transform: translate(0, 0);
  opacity: ${(props) => props.$isDragging && 0.4};
  outline: ${(props) => props.$isCardOver && "2px solid #388bff"};
`;

export const BoardDropPreview = styled.div`
  width: 272px;
  height: 88px;
  margin: 0 6px;
  border-radius: 12px;
  flex-shrink: 0;
  background-color: #006aa7;
`;

export const BoardHandle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  padding-bottom: 0;
  margin: -8px;
  margin-bottom: 0px;
`;

export const BoardTitleArea = styled.div`
  flex-grow: 1;
  height: 32px;
  line-height: 32px;
  color: #172b4d;
  font-weight: 600;
`;

export const BoardTitle = styled.h2`
  width: 100%;
  padding-left: 12px;
  cursor: pointer;
`;

export const BoardTextarea = styled.textarea`
  /*
  outline: 1px solid #8590a2;
  outline-offset: -1px;
  
  &::placeholder {
    color: #516079;
    font-weight: 600;
  } */
  width: 100%;
  height: 32px;
  padding: 0;
  padding-left: 12px;
  border: none;
  border-radius: 4px;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  resize: none;
  &:focus {
    outline: 2px solid #388bff;
    outline-offset: -2px;
  }
`;

export const CardCount = styled.div`
  margin: 0 6px;
`;

export const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:has(> *:not([hidden])) {
    margin-top: 8px;
    padding-bottom: 2px;
  }
`;

export const CardWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-self: 1;
  row-gap: 8px;
  position: relative;
  &[hidden] {
    display: none; //display : flex와 hidden property 중복 적용 불가
  }
`;

export const CardDropPreview = styled.div`
  height: 36px;
  background-color: #091e420f;
  border-radius: 8px;
`;

const CardDesign = styled.div`
  min-height: 36px;
  padding: 0 12px;
  line-height: 36px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow:
    0px 1px 1px #091e4240,
    0px 0px 1px #091e424f;
`;

export const Card = styled(CardDesign)`
  display: flex;
  justify-content: space-between;
  transform: translate(0, 0);
  &:hover {
    outline: 2px solid #4391ff;
    outline-offset: -1px;
  }
`;

export const CardTextArea = styled.div`
  display: flex;
`;

export const CardCheckBox = styled.input`
  margin-right: 6px;
`;

export const CardImage = styled.div`
  width: 100%;
  max-height: 260px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export const CardText = styled.span`
  display: inline-block;
  width: 150px;
  white-space: normal;
  word-break: break-word;
`;

export const CardEditArea = styled.div`
  display: flex;
  svg {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: rgb(80, 82, 88);
  }
`;

export const EditButtonArea = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

export const CardEditButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 0;
  background-color: transparent;
`;

export const FormInput = styled(CardDesign)`
  width: 100%;
  height: 36px;
  line-height: 36px;
  /* padding-left: 12px; */
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;

export const EditCardForm = styled.form``;

export const EditCardInput = styled(FormInput)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const ImageText = styled.div`
  height: 64px;
  padding: 8px 12px;
  > span {
    display: block;
    height: 20px;
    margin-bottom: 9px;
    line-height: 20px;
  }
`;

export const ImageAttachment = styled.div`
  margin-left: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
    display: inline-block;
  }
  span {
    display: inline;
    font-size: 12px;
  }
`;

export const AddCardBtn = styled.div`
  width: 100%;
  height: 32px;
  margin-top: 8px;
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
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const AddBoardForm = styled(BoardDesign)`
  width: 272px;
  height: 88px;
`;
