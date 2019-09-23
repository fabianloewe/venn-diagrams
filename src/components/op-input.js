import React, { useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export const OpInput = ({
  className,
  layout,
  value,
  onChange,
  onKeyPress,
}) => {
  const keyboard = useRef();

  const onChangeInput = event => {
    const input = event.target.value + " ";
    console.log("new input:", input);
    onChange(input);
    keyboard.current.setInput(input);
  };

  const inputPattern = new RegExp(
    "[\\s" + layout.map(row => row.replace(/\s/g, "")).join("") + "]"
  );
  console.log(inputPattern);

  return (
    <div className={className}>
      <label htmlFor="sets-op">Set operations: </label>
      <input
        id="sets-op"
        value={value}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layout={{ "default": layout}}
        inputPattern={inputPattern}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

OpInput.propTypes = {
  className: PropTypes.string,
  layout: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
};

export default OpInput;
