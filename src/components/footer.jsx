import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Phantom = styled.div`
  display: block;
  padding: 20px;
  height: 60px;
  width: 100%;
`

const Container = styled.div`
  background-color: #f8f8f8;
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
`

const Footer = () => (
  <footer>
    <Phantom />
    <Container>
      © {new Date().getFullYear()}, Built
      {` `}
      by Fabian Loewe and Jan Vandenhouten @{` `}
      <a href="https://th-brandenburg.de">
        University of Applied Science Brandenburg
      </a>
    </Container>
  </footer>
)

export default Footer
