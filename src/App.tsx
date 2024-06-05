import { DndProvider } from "react-dnd";
import Boards from "./components/Boards";
import { BoardCanvas, BoardHeader, Header, Main, Surface } from "./style/style";
import { HTML5Backend } from "react-dnd-html5-backend";
import { usePreview } from "react-dnd-preview";

function App() {
  return (
    <Surface>
      <Header></Header>
      <Main>
        <BoardHeader></BoardHeader>
        <BoardCanvas>
          <DndProvider backend={HTML5Backend}>
            <Boards />
          </DndProvider>
        </BoardCanvas>
      </Main>
    </Surface>
  );
}

export default App;
