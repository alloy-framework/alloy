import * as Flatted from "flatted";
import ReactDOM from "react-dom";
import { AnnotatedNodeViewer } from "./components/AnnotatedNodeViewer";

declare global {
  interface Window {
    __INITIAL_DATA__: any;
  }
}

const root = document.getElementById("root");
if (root) {
  ReactDOM.render(
    <AnnotatedNodeViewer node={Flatted.parse(window.__INITIAL_DATA__)} />,
    root,
  );
}
