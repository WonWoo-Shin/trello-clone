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
`;

export const BoardsStyle = styled.ul`
  display: flex;
  height: 100%;
  padding: 12px 6px;
`;

export const BoardBlock = styled.li`
  width: 284px;
  padding: 0 6px;
`;

export const BoardContainer = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  background-color: #f1f2f4;
  border-radius: 12px;
  box-shadow: 0px 1px 1px #091e4240;
  font-size: 14px;
  color: #172b4d;
`;

export const BoardTitle = styled.h2`
  font-weight: 600;
  padding: 6px 8px;
  padding-left: 12px;
  margin-bottom: 8px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
`;

export const Cards = styled.ul`
  padding: 2px 0;
`;

export const Card = styled.li`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  height: 36px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  box-shadow: 0px 1px 1px #091e4240;
`;

export const AddCardBtn = styled.div`
  height: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.1s ease;
  svg {
    margin-right: 8px;
  }
  span {
    padding-bottom: 2px;
  }
  &:hover {
    background-color: #d0d5db;
    cursor: pointer;
  }
`;

export const FormInput = styled(Card)`
  width: 100%;
  border: none;
  resize: none;
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
  width: 83px;
  height: 100%;
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  background-color: #0c66e4;
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
  background-color: skyblue;
`;
