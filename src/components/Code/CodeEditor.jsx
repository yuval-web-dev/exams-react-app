import React, { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'


const CodeEditor = ({ language }) => {
  const [code, setCode] = useState("")

  const handleCodeChange = (newCode) => {
    setCode(newCode)
  }

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        rows={10} // You can adjust the number of rows
        style={{ width: "100%", fontFamily: "monospace" }}
        spellCheck="false"
      />
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeEditor
