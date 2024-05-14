import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    headerColor: string;
    boardHeaderColor: string;
    boardCanvasColor: string;
    lineColor: string;
  }
}
