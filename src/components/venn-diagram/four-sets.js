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
    getElementalSet(1, number => (
      <g>
        <path
          d={
            `M500,250 ` +
            `A${radius},${radius / 2} -40 0,0 300,275 ` +
            `A${radius},${radius / 2} -40 0,1 350,300 ` +
            `A${radius},${radius / 2} -40 0,1 500,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={400}
          y={240}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(2, number => (
      <g>
        <path
          d={
            `M500,250 ` +
            `A${radius},${radius / 2} -40 0,1 300,525 ` +
            `A${radius},${radius / 2} 40 0,0 350,475 ` +
            `A${radius},${radius / 2} 40 0,0 400,425 ` +
            `A${radius},${radius / 2} -40 0,0 500,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={520}
          y={300}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(3, number => (
      <g>
        <path
          d={
            `M100,250 ` +
            `A${radius},${radius / 2} 40 1,0 300,525 ` +
            `A${radius},${radius / 2} -40 0,1 250,475 ` +
            `A${radius},${radius / 2} -40 0,1 200,425 ` +
            `A${radius},${radius / 2} 40 0,1 100,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={70}
          y={300}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(4, number => (
      <g>
        <path
          d={
            `M100,250 ` +
            `A${radius},${radius / 2} 40 0,1 300,275 ` +
            `A${radius},${radius / 2} 40 0,0 250,300 ` +
            `A${radius},${radius / 2} 40 0,0 100,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={170}
          y={240}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(5, number => (
      <g>
        <path
          d={
            `M300,275 ` +
            `A${radius},${radius / 2} 40 0,0 250,300 ` +
            `A${radius},${radius / 2} 40 0,1 300,350 ` +
            `A${radius},${radius / 2} -40 0,1 350,300 ` +
            `A${radius},${radius / 2} -40 0,0 300,275 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={295}
          y={310}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(6, number => (
      <g>
        <path
          d={
            `M500,250 ` +
            `A${radius},${radius / 2} -40 0,1 400,425 ` +
            `A${radius},${radius / 2} 40 0,0 350,300 ` +
            `A${radius},${radius / 2} -40 0,1 500,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={420}
          y={330}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(7, number => (
      <g>
        <path
          d={
            `M350,475 ` +
            `A${radius},${radius / 2} 40 0,0 400,425 ` +
            `A${radius},${radius / 2} 40 0,1 350,450 ` +
            `A${radius},${radius / 2} -40 0,1 350,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={355}
          y={470}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(8, number => (
      <g>
        <path
          d={
            `M300,475 ` +
            `A${radius},${radius / 2} 40 0,1 250,475 ` +
            `A${radius},${radius / 2} -40 0,0 300,525 ` +
            `A${radius},${radius / 2} 40 0,0 350,475 ` +
            `A${radius},${radius / 2} 40 0,1 300,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={295}
          y={510}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(9, number => (
      <g>
        <path
          d={
            `M250,475 ` +
            `A${radius},${radius / 2} -40 0,1 200,425 ` +
            `A${radius},${radius / 2} -40 0,0 250,450 ` +
            `A${radius},${radius / 2} 40 0,1 250,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={220}
          y={465}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(10, number => (
      <g>
        <path
          d={
            `M100,250 ` +
            `A${radius},${radius / 2} 40 0,0 200,425 ` +
            `A${radius},${radius / 2} -40 0,1 250,300 ` +
            `A${radius},${radius / 2} 40 0,0 100,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={170}
          y={330}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(11, number => (
      <g>
        <path
          d={
            `M350,450 ` +
            `A${radius},${radius / 2} 40 0,0 400,425 ` +
            `A${radius},${radius / 2} 40 0,0 350,300 ` +
            `A${radius},${radius / 2} -40 0,0 300,350 ` +
            `A${radius},${radius / 2} 40 0,1 350,450 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={350}
          y={400}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(12, number => (
      <g>
        <path
          d={
            `M350,475 ` +
            `A${radius},${radius / 2} 40 0,0 350,450 ` +
            `A${radius},${radius / 2} 40 0,1 300,475 ` +
            `A${radius},${radius / 2} 40 0,0 350,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={330}
          y={475}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(13, number => (
      <g>
        <path
          d={
            `M250,475 ` +
            `A${radius},${radius / 2} -40 0,0 250,450 ` +
            `A${radius},${radius / 2} -40 0,0 300,475 ` +
            `A${radius},${radius / 2} -40 0,1 250,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={250}
          y={475}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(14, number => (
      <g>
        <path
          d={
            `M250,450 ` +
            `A${radius},${radius / 2} -40 0,1 200,425 ` +
            `A${radius},${radius / 2} -40 0,1 250,300 ` +
            `A${radius},${radius / 2} 40 0,1 300,350 ` +
            `A${radius},${radius / 2} -40 0,0 250,450 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={225}
          y={400}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(15, number => (
      <g>
        <path
          d={
            `M300,350 ` +
            `A${radius},${radius / 2} -40 0,0 250,450 ` +
            `A${radius},${radius / 2} -40 0,0 300,475 ` +
            `A${radius},${radius / 2} 40 0,0 350,450 ` +
            `A${radius},${radius / 2} 40 0,0 300,350 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
        <UnselectableText
          x={290}
          y={400}
          fill={selected.includes(number) ? "white" : color}
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
    getElementalSet(0, number => (
      <g>
        <path
          d={
            `M100,250 ` +
            `A${radius},${radius / 2} 40 0,1 300,275 ` +
            `A${radius},${radius / 2} -40 0,1 500,250 ` +
            `A${radius},${radius / 2} -40 1,1 300,525 ` +
            `A${radius},${radius / 2} 40 1,1 100,250 Z` +
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
          onClick={event => onClick({ number, event })}
        >
         {number}
        </UnselectableText>
      </g>
    )),
  ]

  return (
    <Group className="venn-diagram-four-sets">
      <Group className="venn-diagram-sets">
        {elementalSets.map(([_, path]) => path)}
      </Group>
      {/*<Raster {...containerSize} />*/}
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
