import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { arc, line, curveCatmullRom } from "d3-shape";
import styled from "styled-components";
import intersection from "../../utils/intersection";

export const UnselectableText = styled.text`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

// Based on https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path/10477334#10477334
export const circlePath = (cx, cy, r) =>
  `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`

const linePath = line()
  .x(d => d.x)
  .y(d => d.y)

export const CirclePath = ({
  cx,
  cy,
  r,
  number,
  isSelected,
  fill,
  ...otherProps
}) => (
  <Group className="elemental-set">
    <path
      d={circlePath(cx, cy, r)}
      stroke="black"
      strokeWidth="2"
      fill={fill}
      {...otherProps}
    />
    <UnselectableText
      x={cx}
      y={cy}
      fill={isSelected ? "white" : "black"}
    >
      A
    </UnselectableText>
  </Group>
)

CirclePath.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  number: PropTypes.number,
  isSelected: PropTypes.bool,
  fill: PropTypes.string,
}

export const RevertedCirclePath = ({
  cx,
  cy,
  r,
  rectPoints,
  number,
  isSelected,
  fill,
  ...otherProps
}) => (
  <Group className="elemental-set elemental-set-negated">
    <path
      d={`${circlePath(cx, cy, r)} ${linePath(rectPoints)}`}
      stroke="black"
      strokeWidth="2"
      fillRule="evenodd"
      fill={fill}
      {...otherProps}
    />
  </Group>
)

RevertedCirclePath.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  rectPoints: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })),
  number: PropTypes.number,
  isSelected: PropTypes.bool,
  fill: PropTypes.string,
}

export const CircleIntersectionPath = ({ points, r, numbers, ...otherProps }) => {
  points = points.slice(0)
  const pointPairs = []
  for (const first of points) {
    for (const second of points) {
      if (first !== second) pointPairs.push([first, second])
    }
  }
  const intersects = pointPairs
    .map(([a , b]) => intersection(a.x, a.y, r, b.x, b.y, r))
    .map(intersect => ({
      x: intersect[0],
      y: intersect[2],
    }))

  return (
    <Group className="elemental-set">
      <path
        d={linePath(intersects)}
        stroke="black"
        strokeWidth="2"
        {...otherProps}
      />
    </Group>
  )
}

CircleIntersectionPath.propTypes = {
  r: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })),
  numbers: PropTypes.arrayOf(PropTypes.number),
}

export const CubicArea = ({ intersections }) => {
  const data = [
    ...intersections,
    intersections[0]
  ]

  const cubicArea = linePath
    .curve(curveCatmullRom.alpha(0.5))

  return (
    <path d={cubicArea(data)} />
  )
}

CubicArea.propTypes = {
  intersections: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }))
}
