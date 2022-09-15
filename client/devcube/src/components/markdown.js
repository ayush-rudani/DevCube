import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownEditor = () => {
  const [markDown, setMarkDown] = useState("Welcome to Markdown");
  return (
    <>
      <div> This is Markdown Editor</div>
      <div>
        <textarea value={markDown} onChange={(e) => setMarkDown(e.target.value)}></textarea>

        <div>
          <ReactMarkdown>{markDown}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export default MarkdownEditor;