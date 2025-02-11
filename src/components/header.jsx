import PropTypes from "prop-types"
import React from "react"
import { useLanguage } from "./language-context"

const Header = ({ siteTitle }) => {
  const { setLangEN, setLangDE } = useLanguage()

  return (
    <header
      style={{
        background: `blue`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          display: `flex`,
          alignItems: `baseline`,
          justifyContent: `space-between`,
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <a
            href="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </a>
        </h1>
        <div style={{ display: "inline" }}>
          <span style={{ paddingRight: "10px" }}>
            <button
              onClick={setLangEN}
              className={"lang-button"}
            >
              EN
            </button>
          </span>
          <span>
            <button
              onClick={setLangDE}
              className={"lang-button"}
            >
              DE
            </button>
          </span>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
