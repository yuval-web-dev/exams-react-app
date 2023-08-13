import React from "react"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'


const CodeSnippet = (lang, code) => {
  return (
    <SyntaxHighlighter language={lang} style={vscDarkPlus}>
      {code}
    </SyntaxHighlighter>
  )
}