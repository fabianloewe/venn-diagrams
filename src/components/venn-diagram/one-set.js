import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { CirclePath, RevertedCirclePath } from "./circle-path"

const getElementalSet = (n, func) => [n, func(n)]

export const OneSetDiagram = ({
  containerSize,
  radius,
  color = "black",
  selected = [],
  onClick = () => {}
}) => {
  const elementalSets = [
    getElementalSet(1, number => (
      <CirclePath
        cx={containerSize.height / 2}
        cy={containerSize.width / 2}
        r={radius}
        fill={selected.includes(number) ? color : "transparent"}
        number={number}
        onClick={event => onClick({ number, event })}
        isSelected={selected.includes(number)}
      />
    )),
    getElementalSet(0, number => (
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
        fill={selected.includes(number) ? color : "transparent"}
        number={number}
        onClick={event => onClick({ number, event })}
        isSelected={selected.includes(number)}
      />
    ))
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
