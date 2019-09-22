import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import OneSetDiagram from "./one-set"
import TwoSetsDiagram from "./two-sets"
import ThreeSetsDiagram from "./three-sets"
import FourSetsDiagram from "./four-sets"

const VennDiagram = ({ containerSize, setsCount }) => {
  const radius = (
    containerSize.width < containerSize.height
      ? containerSize.width
      : containerSize.height
  ) / 3.5;
  const [selectedElemSets, setSelectedElemSets] = useState([])

  return (
    <div className="venn-diagram-container">
      <svg {...containerSize}>
        {setsCount === 1 && (
          <OneSetDiagram
            containerSize={containerSize}
            radius={radius}
            selected={selectedElemSets}
            onClick={({ number }) => {
              if (selectedElemSets.includes(number)) {
                setSelectedElemSets(selectedElemSets.filter(e => e !== number))
              } else {
                setSelectedElemSets([...selectedElemSets, number])
              }
            }}
          />
        )}
        {setsCount === 2 && (
          <TwoSetsDiagram
            containerSize={containerSize}
            radius={radius}
            selected={selectedElemSets}
            onClick={({ number }) => {
              if (selectedElemSets.includes(number)) {
                setSelectedElemSets(selectedElemSets.filter(e => e !== number))
              } else {
                setSelectedElemSets([...selectedElemSets, number])
              }
            }}
          />
        )}
        {setsCount === 3 && (
          <ThreeSetsDiagram
            containerSize={containerSize}
            radius={radius}
            selected={selectedElemSets}
            onClick={({ number }) => {
              if (selectedElemSets.includes(number)) {
                setSelectedElemSets(selectedElemSets.filter(e => e !== number))
              } else {
                setSelectedElemSets([...selectedElemSets, number])
              }
            }}
          />
        )}
        {setsCount === 4 && (
          <FourSetsDiagram
            containerSize={containerSize}
            radius={radius}
            selected={selectedElemSets}
            onClick={({ number }) => {
              if (selectedElemSets.includes(number)) {
                setSelectedElemSets(selectedElemSets.filter(e => e !== number))
              } else {
                setSelectedElemSets([...selectedElemSets, number])
              }
            }}
          />
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
}

export default VennDiagram
