import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";

export default function QuestionEditor({ field, initial }: any) {
  const editorRef = useRef(null);
  const { mode } = useTheme();

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
        onInit={(evt, editor) => {
          // @ts-ignore
          editorRef.current = editor;
        }}
        initialValue={initial}
        onBlur={field?.onBlur}
        onEditorChange={(content) => {
          field?.onChange(content);
        }}
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
          ],
          toolbar:
            "undo redo | " +
            "codesample | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist",
          content_style: "body { font-family:Inter; font-size:16px }",
          skin: mode === "dark" ? "oxide-dark" : "oxide",
          content_css: mode === "dark" ? "dark" : "light",
        }}
      />
    </>
  );
}
