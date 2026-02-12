import React, { useContext } from "react";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";

const Button = () => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch({
      preview: preview === "edit" ? "preview" : "edit"
    });
  };
  if (preview === "edit") {
    return (
      <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 520 520" onClick={click}>
      <polygon
        fill="currentColor"
        points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
      />
      <polygon
        fill="currentColor"
        points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
      />
    </svg>
  );
};

const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <Button />
};

const Disable = () => {
  const { preview, dispatch } = useContext(EditorContext);
  return (
    <button disabled={preview === "preview"}>
      <svg viewBox="0 0 16 16" width="12px" height="12px">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}

const customButton = {
  name: "disable",
  keyCommand: "disable",
  value: "disable",
  icon: <Disable />
}

export default function ReadmeEditor({value, setValue}: {value: string, setValue: (value: string) => void}) {
  return (
    <div className=" w-full h-[1000px] overflow-scroll">
      <MDEditor
        value={value}
        preview="edit"
        minHeight={1500}
        style={{ height: '900px' }}
        extraCommands={[codePreview, customButton, commands.fullscreen]}
        onChange={(val) => setValue(val)}
      />
    </div>
  );
}
