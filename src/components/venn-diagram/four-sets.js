import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { getPoints, Line } from "@vx/shape";
import { UnselectableText, RevertedCirclePath } from "./circle-path";
import intersection from "../../utils/intersection";
import Raster from "../raster";

const getElementalSet = (n, func) => [n, func(n)]

export const FourSetsDiagram = ({
  containerSize,
  radius,
  color = "black",
  selected = [],
  onClick = () => {}
}) => {
  const svgSize = containerSize.width < containerSize.height
    ? containerSize.width
    : containerSize.height;

  const elementalSets = [
    /*
    getElementalSet(1, number => (
      <g>
        <path
          d={
            `M${intersect13[0]},${intersect13[2]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect12[1]},${intersect12[3]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect23[0]},${intersect23[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect13[0]},${intersect13[2]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect23[0] + radius / 2}
          y={intersect23[2]}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(2, number => (
      <g>
        <path
          d={
            `M${intersect12[1]},${intersect12[3]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect23[1]},${intersect23[3]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect13[1]},${intersect13[3]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect12[1]},${intersect12[3]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect13[1] - radius / 2}
          y={intersect13[3] + radius / 2}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(3, number => (
      <g>
        <path
          d={
            `M${intersect23[1]},${intersect23[3]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect13[0]},${intersect13[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect12[0]},${intersect12[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect23[1]},${intersect23[3]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect12[0] - radius / 2}
          y={intersect12[2] - radius / 2}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(4, number => (
      <g>
        <path
          d={
            `M${intersect13[0]},${intersect13[2]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect23[0]},${intersect23[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect12[0]},${intersect12[2]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect13[0]},${intersect13[2]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect13[0] - radius / 4}
          y={intersect13[2] + radius / 4}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(5, number => (
      <g>
        <path
          d={
            `M${intersect12[1]},${intersect12[3]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect13[1]},${intersect13[3]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect23[0]},${intersect23[2]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect12[1]},${intersect12[3]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect12[1] - radius / 4}
          y={intersect12[3] - radius / 4}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(6, number => (
      <g>
        <path
          d={
            `M${intersect23[1]},${intersect23[3]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect12[0]},${intersect12[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect13[1]},${intersect13[3]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect23[1]},${intersect23[3]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect23[1] + radius / 4}
          y={intersect23[3]}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(7, number => (
      <g>
        <path
          d={
            `M${intersect23[0]},${intersect23[2]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect13[1]},${intersect13[3]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect12[0]},${intersect12[2]} ` +
            `A${radius},${radius} 0 0,1 ` +
            `${intersect23[0]},${intersect23[2]} Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={intersect23[0] - radius / 2}
          y={intersect23[2]}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(8, number => (
      <g>
        <path
          d={
            // Outer circles
            `M${intersect13[0]},${intersect13[2]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect12[1]},${intersect12[3]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect23[0]},${intersect23[2]} ` +
            `A${radius},${radius} 0 1,1 ` +
            `${intersect13[0]},${intersect13[2]} Z ` +
            // The "eye"; needed to mask a overlapping part
            `M${intersect23[0]},${intersect23[2]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect23[1]},${intersect23[3]} ` +
            `A${radius},${radius} 0 0,0 ` +
            `${intersect23[0]},${intersect23[2]} Z ` +
            // Rectangle
            `M10,10 ` +
            `L${10 + containerSize.width - 20},10 ` +
            `L${10 + containerSize.width - 20},${10 + containerSize.height - 20} ` +
            `L10,${10 + containerSize.width - 20} ` +
            `L10,10`
          }
          fill={selected.includes(number) ? color : "transparent"}
          fillRule="evenodd"
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={30}
          y={30}
          fill={selected.includes(number) ? "white" : color}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    */
    [20, (
      <g transform="rotate(40)">
        <ellipse cx={svgSize / 2 + 110} cy={svgSize / 2 - 190} rx={radius} ry={radius / 2} stroke="black" strokeWidth="2" fill="none" />
      </g>
    )],
    [21, (
      <g transform="rotate(40)">
        <ellipse cx={svgSize / 2 + 110} cy={svgSize / 2 - 140} rx={radius} ry={radius / 2} stroke="black" strokeWidth="2" fill="none" />
      </g>
    )],
    [22, (
      <g transform="rotate(-40)">
        <ellipse cx={svgSize / 2 - 260} cy={svgSize / 2 + 190} rx={radius} ry={radius / 2} stroke="black" strokeWidth="2" fill="none" />
      </g>
    )],
    [23, (
      <g transform="rotate(-40)">
        <ellipse cx={svgSize / 2 - 260} cy={svgSize / 2 + 240} rx={radius} ry={radius / 2} stroke="black" strokeWidth="2" fill="none" />
      </g>
    )]
  ]

  return (
    <Group className="venn-diagram-four-sets">
      <Group className="venn-diagram-sets">
        {elementalSets.map(([_, path]) => path)}
      </Group>
      <Raster {...containerSize} />
    </Group>
  )
}

FourSetsDiagram.propTypes = {
  containerSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
}

export default FourSetsDiagram
