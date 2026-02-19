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
    <div className="w-full pb-16  h-full ">
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        preview="edit"
        hideToolbar={true}
        style={{padding:'40px' , border:'0px', outline:'0px' , borderColor:'transparent', borderRadius:'10px' , backgroundColor:'transparent' , height: '100%' }}
        height="100%"
        data-color-mode="dark"
      />
    </div>
  );
}
