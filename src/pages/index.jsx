import React, { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Main from "../components/main"
//import labelsDE from "../langs/de.yaml"

/**
 * Simply redirects the user to the translated page
 */
function IndexPage() {
  const [labels, setLabels] = React.useState(null)
  useEffect(() => {
    const lang = navigator.language || navigator.userLanguage
    if (lang.includes("de")) import("../langs/de.yaml").then(it => setLabels(it.default))
    else import("../langs/en.yaml").then(it => setLabels(it.default))
  }, [])
  console.log(labels)
  return labels !== null ? <Main data={labels} /> : null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndexPage />
  </StrictMode>,
)