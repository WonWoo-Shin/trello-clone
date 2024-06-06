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
  box-shadow: 0px 1px 1px #091e4240;
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

export const BoardTitle = styled.h2`
  font-weight: 600;
  height: 32px;
  line-height: 22px;
  padding: 6px 8px;
  padding-left: 12px;
  margin-bottom: 4px;
  cursor: pointer;
`;

export const BoardInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: none;
  outline: 1px solid #8590a2;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  &:focus {
    outline: 2px solid #388bff;
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

export const Card = styled.div`
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0px 1px 1px #091e4240;
  display: flex;
  align-items: center;
  transform: translate(0, 0);
`;

export const AddCardBtn = styled.div`
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
    background-color: #d0d5db;
    cursor: pointer;
  }
`;

export const FormInput = styled(Card)`
  width: 100%;
  margin: 4px 0 8px 0;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: 36px;
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

export const AddBoardBtn = styled(AddCardBtn)`
  width: 272px;
  height: 44px;
  border-radius: 12px;
  padding: 12px;
  color: #ffffff;
  font-weight: 600;
  background-color: #ffffff3d;
  &:hover {
    background-color: #1b85c5;
  }
`;

export const AddBoardForm = styled(BoardContainer)`
  width: 272px;
  height: 80px;
`;
