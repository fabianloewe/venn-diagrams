import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Main from "../components/main";

const IndexDePage = ({ data }) => (
  <Main data={data} />
);

export default IndexDePage

IndexDePage.propTypes = {
  data: PropTypes.shape({
    allLangsYaml: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          disclaimer: PropTypes.string.isRequired,
          generatorItem: PropTypes.shape({
            button: PropTypes.string.isRequired,
            menu: PropTypes.shape({
              gen: PropTypes.string,
              reset: PropTypes.string,
            }).isRequired,
          }),
          settingsItem: PropTypes.shape({
            button: PropTypes.string.isRequired,
            menu: PropTypes.shape({
              color: PropTypes.string,
              numOfSets: PropTypes.string,
            }).isRequired,
          }),
          tryHardItem: PropTypes.shape({
            button: PropTypes.string.isRequired,
            menu: PropTypes.shape({
              input: PropTypes.string,
              eval: PropTypes.string,
              reset: PropTypes.string,
            }).isRequired,
          }),
        })
      ),
    })
  }),
};

export const query = graphql`
  query {
    allLangsYaml(filter: {lang: {eq: "de"}}) {
      nodes {
        disclaimer
        generatorItem {
          button
          menu {
            gen
            reset
          }
        }
        settingsItem {
          button
          menu {
            color
            numOfSets
          }
        }
        tryHardItem {
          button
          menu {
            input
            reset
            eval
          }
        }
      }
    }
  }
`;
