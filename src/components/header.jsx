import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
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
          <a
            href="/en/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            EN
          </a>
        </span>
        <span>
          <a
            href="/de/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            DE
          </a>
        </span>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
