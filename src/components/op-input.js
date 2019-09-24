import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "simple-keyboard/build/css/index.css";

export const OpInput = ({
  className,
  layout,
  value,
  onChange,
  onKeyPress,
}) => {
  const [keyboard, setKeyboard] = useState(null);

  const onChangeInput = event => {
    const input = event.target.value + " ";
    console.log("new input:", input);
    onChange(input);
    keyboard.setInput(input);
  };

  const inputPattern = new RegExp(
    "[\\s" + layout.map(row => row.replace(/\s/g, "")).join("") + "]"
  );
  console.log(inputPattern);

  useEffect(() => {
    if (window) {
      import("simple-keyboard").then(KeyboardClass => {
        const Keyboard = KeyboardClass.default

        setKeyboard(new Keyboard({
          onChange,
          onKeyPress,
          layout: { "default": layout},
          inputPattern,
        }));
      });
    }
  }, [layout]);

  return (
    <div className={className}>
      {/*<label htmlFor="sets-op">Set operations: </label>*/}
      <input
        id="sets-op"
        type="text"
        value={value}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <div className="simple-keyboard" />
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
