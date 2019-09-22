import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { getPoints } from "@vx/shape";
import { ElementalSet, RevertedCirclePath } from "./circle-path";

export const TwoSetsDiagram = ({
  containerSize,
  radius,
  color = "black",
  selected = [],
  onClick = () => {}
}) => {
  const svgSize = containerSize.width < containerSize.height
    ? containerSize.width
    : containerSize.height;
  const circles = getPoints({
    sides: 2,
    size: svgSize / 5,
    center: {
      x: svgSize / 2,
      y: svgSize / 2,
    },
    rotate: 0,
  });
  const elementalSets = [
    [1, (
      <ElementalSet
        rightCircle={{ cx: circles[1].x, cy: circles[1].y, r: radius }}
        leftCircle={{ cx: circles[1].x, cy: circles[1].y, r: radius }}
        color={selected.includes(1) ? color : "transparent"}
        stroke="black"
        strokeWidth="2"
        number={1}
        onClick={event => onClick({ number: 1, event })}
      />
    )],
    [2, (
      <RevertedCirclePath
        cx={containerSize.height / 2}
        cy={containerSize.width / 2}
        r={radius}
        rectPoints={[
          { x: 10, y: 10 },
          { x: 10 + containerSize.width - 20, y: 10 },
          { x: 10 + containerSize.width - 20, y: 10 + containerSize.height - 20},
          { x: 10, y: 10 + containerSize.width - 20},
          { x: 10, y: 10 },
        ]}
        fill={selected.includes(2) ? color : "transparent"}
        number={2}
        onClick={event => onClick({ number: 2, event })}
      />
    )]
  ]

  return (
    <Group className="venn-diagram-sets">
      {elementalSets.map(([_, path]) => path)}
    </Group>
  )
}

TwoSetsDiagram.propTypes = {
  containerSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
}

export default TwoSetsDiagram
