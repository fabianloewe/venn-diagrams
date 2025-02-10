import React, { useState } from "react";
import PropTypes from "prop-types";
import { Group } from "@visx/group";
import { Line, Circle } from "@visx/shape";

const Raster = ({ width, height, distance = 25 }) => {
  const yAxes = [];
  for (let i = 0; i < width; i += distance) {
    yAxes.push([{ x: i, y: 0 }, { x: i, y: height }]);
  }

  const xAxes = [];
  for (let i = 0; i < height; i += distance) {
    xAxes.push([{ x: 0, y: i }, { x: width, y: i }]);
  }

  const points = [], [radii, setRadii] = useState([]);
  for (let i = 0; i < width; i += distance) {
    for (let j = 0; j < height; j += distance) {
      radii.push(2);
      points.push({ x: i, y: j });
    }
  }

  return (
    <Group className="venn-diagram-raster">
      {yAxes.map((a, i) =>
        <Line key={`y-axe-${i}`} from={a[0]} to={a[1]} fill="black" stroke="black" />
      )}
      {xAxes.map((a, i) =>
        <Line key={`x-axe-${i}`} from={a[0]} to={a[1]} fill="black" stroke="black" />
      )}
      {points.map((a, i) =>
        <Circle
          key={`point-${i}`}
          cx={a.x}
          cy={a.y}
          r={radii[i]}
          fill="black"
          onMouseOver={() => {
            console.log("Mouse over", i);
            radii.splice(i, 1, (radii[i] === 2) ? 5 : 2);
            setRadii([...radii]);
          }}
        />
      )}
    </Group>
  );
};

Raster.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  distance: PropTypes.number,
};

export default Raster;
