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
              style={{
                marginRight: "10px",
                background: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              EN
            </button>
          </span>
          <span>
            <button
              onClick={setLangDE}
              style={{
                background: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "5px 10px",
                cursor: "pointer",
              }}
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
