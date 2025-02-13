import React from "react";
import PropTypes from "prop-types";
import { Group } from "@visx/group";
import { getPoints, Line } from "@visx/shape";
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
            `Q300,275 340,310 ` +
            //`A${radius},${radius / 2} -40 0,1 350,300 ` +
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
         A
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
         B
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
         C
        </UnselectableText>
      </g>
    )),
    getElementalSet(4, number => (
      <g>
        <path
          d={
            `M100,250 ` +
            `A${radius},${radius / 2} 40 0,1 300,275 ` +
            //`A${radius},${radius / 2} 40 0,0 250,300 ` +
            `Q270,300 260,310 ` +
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
         D
        </UnselectableText>
      </g>
    )),
    getElementalSet(5, number => (
      <g>
        <path
          d={
            `M300,275 ` +
            `Q270,300 260,310 ` +
            `A${radius},${radius / 2} 40 0,1 300,350 ` +
            `A${radius},${radius / 2} -40 0,1 340,310 ` +
            `Q300,275 300,275Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(6, number => (
      <g>
        <path
          d={
            `M500,250 ` +
            `A${radius},${radius / 2} -40 0,1 400,425 ` +
            `A${radius},${radius / 2} 40 0,0 340,310 ` +
            `A${radius},${radius / 2} -40 0,1 500,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(7, number => (
      <g>
        <path
          d={
            `M350,475 ` +
            `A${radius},${radius / 2} 40 0,0 400,425 ` +
            //`A${radius},${radius / 2} 40 0,1 350,455 ` +
            `Q350,460 350,455 ` +
            `A${radius},${radius / 2} -40 0,1 350,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
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
      </g>
    )),
    getElementalSet(9, number => (
      <g>
        <path
          d={
            `M250,475 ` +
            `A${radius},${radius / 2} -40 0,1 200,425 ` +
            `Q250,460 250,455 ` +
            `A${radius},${radius / 2} 40 0,1 250,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(10, number => (
      <g>
        <path
          d={
            `M100,250 ` +
            `A${radius},${radius / 2} 40 0,0 200,425 ` +
            `A${radius},${radius / 2} -40 0,1 260,310 ` +
            `A${radius},${radius / 2} 40 0,0 100,250 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(11, number => (
      <g>
        <path
          d={
            `M350,455 ` +
            //`A${radius},${radius / 2} 40 0,0 400,425 ` +
            `Q350,460 400,425 ` +
            `A${radius},${radius / 2} 40 0,0 340,310 ` +
            `A${radius},${radius / 2} -40 0,0 300,350 ` +
            `A${radius},${radius / 2} 40 0,1 350,455 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(12, number => (
      <g>
        <path
          d={
            `M350,475 ` +
            `A${radius},${radius / 2} 40 0,0 350,455 ` +
            //`A${radius},${radius / 2} 40 0,1 300,475 ` +
            `Q325,470 300,475 ` +
            `A${radius},${radius / 2} 40 0,0 350,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(13, number => (
      <g>
        <path
          d={
            `M250,475 ` +
            //`A${radius},${radius / 2} -40 0,0 250,455 ` +
            `Q250,450 250,455 ` +
            //`A${radius},${radius / 2} -40 0,0 300,475 ` +
            `Q275,470 300,475 ` +
            `A${radius},${radius / 2} -40 0,1 250,475 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(14, number => (
      <g>
        <path
          d={
            `M250,455 ` +
            //`A${radius},${radius / 2} -40 0,1 200,425 ` +
            `Q250,460 200,425 ` +
            `A${radius},${radius / 2} -40 0,1 260,310 ` +
            `A${radius},${radius / 2} 40 0,1 300,350 ` +
            `A${radius},${radius / 2} -40 0,0 250,450 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
      </g>
    )),
    getElementalSet(15, number => (
      <g>
        <path
          d={
            `M300,350 ` +
            `A${radius},${radius / 2} -40 0,0 250,455 ` +
            //`A${radius},${radius / 2} -40 0,0 300,475 ` +
            `Q275,470 300,475 ` +
            //`A${radius},${radius / 2} 40 0,0 350,450 ` +
            `Q325,470 350,455 ` +
            `A${radius},${radius / 2} 40 0,0 300,350 Z`
          }
          fill={selected.includes(number) ? color : "transparent"}
          stroke="black"
          strokeWidth="2px"
          onClick={event => onClick({ number, event })}
        />
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
      </g>
    )),
  ]

  return (
    <Group className="venn-diagram-four-sets">
      <Group className="venn-diagram-sets">
        {elementalSets.map(([_, path]) => path)}
      </Group>
      {/*<Raster distance={10} {...containerSize} />*/}
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
