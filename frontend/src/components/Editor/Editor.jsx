import React from "react";
import "./editor.css";
import Layers from "./Layers";
import Workspace from "./Workspace";
import Options from "./Options";

const Editor = ({ preview }) => {
  return (
    <div className="editor w-full">
      <Layers preview={preview} />
      <Workspace preview={preview} />
      <Options preview={preview} />
    </div>
  );
};

export default Editor;
