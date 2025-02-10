import React from "react";
import PropTypes from "prop-types";
import { Group } from "@visx/group";
import { getPoints } from "@visx/shape";
import { UnselectableText, RevertedCirclePath } from "./circle-path";
import intersection from "../../utils/intersection";

const getElementalSet = (n, func) => [n, func(n)]

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
    size: svgSize / 6,
    center: {
      x: svgSize / 2,
      y: svgSize / 2,
    },
    rotate: 0,
  });

  const intersect = intersection(
    circles[0].x, circles[0].y, radius, circles[1].x, circles[1].y, radius
  );

  const elementalSets = [
    getElementalSet(1, number => (
      <g>
        <path
          d={
            `M${intersect[0]},${intersect[2]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect[1]},${intersect[3]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect[0]},${intersect[2]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          //fillRule="evenodd"
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          {...circles[0]}
          fill={selected.includes(number) ? "white" : color}
        >
         A
        </UnselectableText>
      </g>
    )),
    getElementalSet(2, number => (
      <g>
        <path
          d={
            `M${intersect[0]},${intersect[2]} ` +
            `A${radius},${radius} 0 1,0 ` +
            `${intersect[1]},${intersect[3]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect[0]},${intersect[2]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          //fillRule="evenodd"
          stroke="black"
          strokeWidth="2"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          {...circles[1]}
          fill={selected.includes(number) ? "white" : color}
        >
         B
        </UnselectableText>
      </g>
    )),
    getElementalSet(3, number => (
      <g>
        <path
          d={
            `M${intersect[0]},${intersect[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect[1]},${intersect[3]}` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect[0]},${intersect[2]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(0, number => (
      <g>
        <path
          d={
            `M${intersect[0]},${intersect[2]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect[1]},${intersect[3]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect[0]},${intersect[2]} Z ` +
            `M10,10 ` +
            `L${10 + containerSize.width - 20},10 ` +
            `L${10 + containerSize.width - 20},${10 + containerSize.height - 20} ` +
            `L10,${10 + containerSize.width - 20} ` +
            `L10,10 Z`

          }
          fill={selected.includes(number) ? color : "transparent"}
          fillRule="evenodd"
          stroke="black"
          strokeWidth="2"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
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
