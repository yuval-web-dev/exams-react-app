import React from "react"
import CodeEditor from "@uiw/react-textarea-code-editor"


const CodeSnippet = ({ lang, val }) => (
  <CodeEditor
    style={{ fontSize: 13, backgroundColor: "whitesmoke", fontFamily: "Hack" }}
    data-color-mode="light"
    value={val}
    language={lang}
    readOnly />
)

export default CodeSnippet