import React from "react";
import { SliderPicker } from "react-color";

const SettingsItem = props => (
  <>
    <props.container>
      <label htmlFor="num-sets">Number of sets: </label>
      <input
        type="number"
        id="num-sets"
        min="1"
        max="4"
        value={props.value}
        onChange={props.onChange}
      />
    </props.container>
    <props.container>
      <label htmlFor="color-select">Color: </label>
      <SliderPicker
        id="color-select"
        color={props.color}
        onChange={props.onChangeColor}
      />
    </props.container>
  </>
);

export default SettingsItem;
