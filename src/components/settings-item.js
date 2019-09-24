import React from "react";

const SettingsItem = props => (
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
);

export default SettingsItem;
