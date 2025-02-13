import React, { createContext, useState, useEffect } from "react"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    JSON.parse(localStorage.getItem("lang")) || "en"
  )
  const [labels, setLabels] = useState(null)

  const loadLabels = (language) => {
    import(`../langs/${language}.yaml`).then((it) => setLabels(it.default))
  }

  const setLangEN = () => {
    setLang("en")
    loadLabels("en")
  }

  const setLangDE = () => {
    setLang("de")
    loadLabels("de")
  }

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang))
  }, [lang])

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage
    userLang.includes("de") ? setLangDE() : setLangEN()
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, labels, setLangEN, setLangDE }}>
      {labels !== null ? children : null}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => React.useContext(LanguageContext)
