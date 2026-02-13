"use client";
import MDEditor from "@uiw/react-md-editor";

export default function ReadmeEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="w-full p-10 border-none !h-full ">
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        preview="edit"
        hideToolbar={true}
        style={{padding:'10px' , border:'0px', borderRadius:'10px' , height: '100%' }}
        height="100%"
        data-color-mode="dark"
      />
    </div>
  );
}
