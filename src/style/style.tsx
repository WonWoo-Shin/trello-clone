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
  padding: 12px;
  flex-grow: 1;
`;

export const BoardsStyle = styled.ul`
  display: flex;
  background-color: gray;
`;

export const Board = styled.li`
  width: 275px;
  min-height: 90px;
  background-color: #f1f2f4;
  margin-right: 12px;
`;

export const AnotherList = styled.div`
  flex-grow: 1;
  background-color: skyblue;
`;
