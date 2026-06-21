import { Boards } from "./components/Boards";
import { Header } from "./components/Header";
import { BoardCanvas, BoardHeader, Main, Surface } from "./style/style";

function App() {
  return (
    <Surface>
      <Header />
      <Main>
        <BoardHeader />
        <BoardCanvas>
          <Boards />
        </BoardCanvas>
      </Main>
    </Surface>
  );
}

export default App;
