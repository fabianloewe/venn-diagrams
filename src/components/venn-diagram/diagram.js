import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import OneSetDiagram from "./one-set"
import TwoSetsDiagram from "./two-sets"
import ThreeSetsDiagram from "./three-sets"
import FourSetsDiagram from "./four-sets"

const VennDiagram = ({
  containerSize,
  setsCount,
  selected = [],
  onSelected,
  color
}) => {
  const radius = (
    containerSize.width < containerSize.height
      ? containerSize.width
      : containerSize.height
  ) / 3.5;

  const diagramProps = {
    containerSize: containerSize,
    radius: radius,
    selected,
    color: color,
    onClick: ({ number }) => {
      let newElemSets;
      if (selected.includes(number)) {
        newElemSets = selected.filter(e => e !== number)
      } else {
        newElemSets = [...selected, number]
      }
      onSelected(newElemSets)
    },
  }

  return (
    <div className="venn-diagram-container">
      <svg {...containerSize}>
        {setsCount === 1 && (
          <OneSetDiagram {...diagramProps} />
        )}
        {setsCount === 2 && (
          <TwoSetsDiagram {...diagramProps} />
        )}
        {setsCount === 3 && (
          <ThreeSetsDiagram {...diagramProps} />
        )}
        {setsCount === 4 && (
          <FourSetsDiagram {...diagramProps} />
        )}
      </svg>
    </div>
  )
}

VennDiagram.propTypes = {
  containerSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  setsCount: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number),
  onSelected: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default VennDiagram
