import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { Circle, getPoints } from "@vx/shape";
import styled from "styled-components";

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ListWrapper = styled.div`
float: left;
`;

const ListItem = styled.div`
span {
  font-size: 1.2em;
  text-decoration: none;
  color: ${props => props.isSelected ? "white" : "#333"};
}

margin: 10px;
padding: 10px;
border: 1px solid #bbb;
background-color: ${props => props.isSelected ? "blue" : "#eee"};

-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`;

class VennDiagram extends React.Component {
  state = {
    selected: [],
  };

  /**
   * Selects one or more sets
   * @param {number|number[]} selected - The selected set(s)
   */
  select(selected) {
    this.setState(state => ({
      selected: state.selected.concat(
        Array.isArray(selected) ? selected : [selected]
      )
    }));
  }

  /**
   * Unselects one or more sets
   * @param {number|number[]} unselected - The unselected set(s)
   */
  unselect(unselected) {
    const unselectArray = Array.isArray(unselected) ? unselected : [unselected];
    this.setState(state => ({
      selected: state.selected.filter(s => !unselectArray.includes(s))
    }));
  }

  isSelected(index) {
    return this.state.selected.includes(index);
  }

  render() {
    const { numSets, svgSize } = this.props;
    const circles = getPoints({
      sides: numSets,
      size: svgSize / 5,
      center: {
        x: svgSize / 2,
        y: svgSize / 2,
      },
      rotate: 0,
    });
    const radius = svgSize / 3.5;
    const setsList = [];
    for (let i = 0; i < numSets; i++) {
      setsList.push(numSets <= 26 ? alpha[i] : `M${i}`);
    }

    return (
      <div>
        <ListWrapper className="sets-list">
          {setsList.map((setName, i) => (
            <ListItem
              key={`sets-list-item-${setName}`}
              className="sets-list-item"
              isSelected={this.isSelected(i)}
              onClick={() => this.isSelected(i)
                ? this.unselect(i)
                : this.select(i)
              }
            >
              <span>{setName}</span>
            </ListItem>
          ))}
        </ListWrapper>
        <svg width={svgSize} height={svgSize}>
          <Group className="venn-diagram-sets">
            {circles.map((c, i) => (
              <Circle
                key={`venn-diagram-set-${i}`}
                className="venn-diagram-set"
                cx={c.x}
                cy={c.y}
                r={radius}
                //fill="#f6c431"
                fill={this.isSelected(i) ? "black" : "transparent"}
                stroke="black"
                strokeWidth="3"
              />
            ))}
          </Group>
        </svg>
      </div>
    );
  }
}

VennDiagram.propTypes = {
  svgSize: PropTypes.number.isRequired,
  numSets: PropTypes.number.isRequired,
}

VennDiagram.defaultProps = {
  svgSize: 500,
  numSets: 2,
}

export default VennDiagram
