import { Link } from "gatsby"
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
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div style={{ display: "inline" }}>
        <span style={{ paddingRight: "10px" }}>
          <Link
            to="/en/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            EN
          </Link>
        </span>
        <span>
          <Link
            to="/de/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            DE
          </Link>
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
