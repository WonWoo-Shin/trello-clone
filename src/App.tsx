import { BoardCanvas, BoardHeader, Header, Main, Surface } from "./style/style";

function App() {
  return (
    <Surface>
      <Header></Header>
      <Main>
        <BoardHeader></BoardHeader>
        <BoardCanvas></BoardCanvas>
      </Main>
    </Surface>
  );
}

export default App;
