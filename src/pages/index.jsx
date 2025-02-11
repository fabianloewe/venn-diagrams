import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Main from "../components/main"
import { LanguageProvider, useLanguage } from "../components/language-context"

function IndexPage() {
  const { labels } = useLanguage()
  return <Main data={labels} />
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <IndexPage />
    </LanguageProvider>
  </StrictMode>,
)
