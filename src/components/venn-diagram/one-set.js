import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { CirclePath, RevertedCirclePath } from "./circle-path"

export const OneSetDiagram = ({
  containerSize,
  radius,
  color = "black",
  selected = [],
  onClick = () => {}
}) => {
  const elementalSets = [
    [1, (
      <CirclePath
        cx={containerSize.height / 2}
        cy={containerSize.width / 2}
        r={radius}
        fill={selected.includes(1) ? color : "transparent"}
        number={1}
        onClick={event => onClick({ number: 1, event })}
        isSelected={selected.includes(1)}
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
        isSelected={selected.includes(2)}
      />
    )]
  ]

  return (
    <Group className="venn-diagram-sets">
      {elementalSets.map(([_, path]) => path)}
    </Group>
  )
}

OneSetDiagram.propTypes = {
  containerSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
}

export default OneSetDiagram
